import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import "./walk-ins.css"
import { db } from '../firebase';
import { getServices } from "../services/services";
import { getTechnicians, getTechnicianServices, Test } from '../services/technicians';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const WalkIn =  () => {
    // State Values
    const [technicians, setTechnicians] = useState();
    const [services, setServices] = useState();
    const [userEmail, setUserEmail] = useState();

    // Ref Values
    const [selectedTechnician, setSelectedTechnician] = useState();
    const [selectedService, setSelectedService] = useState();
    const name = useRef();
    var email = useRef();

    useEffect(() => {
        if (!technicians)
            getTechnicians().then( data =>{
                setTechnicians(data);
            })
            .catch(e => console.log("technician error: ", e));
        if (!services)
            getServices().then(data => {
                setServices(data);
            })
            .catch(e => console.log("service error: ", e));
    });

    const auth = getAuth();

    onAuthStateChanged(auth, user => {
        if (user) {
            document.getElementById('email').value = user.email;
        }
    })

    const selectedTechnicianChange = (data) => {
        if (data.target.value != "") {
            var foundTechnician = technicians.find(x => x.fullName == data.target.value);


            getTechnicianServices(foundTechnician.servicesProvided).then(x => console.log("donezo"));
        }
        return;
    }

    const checkIn = async () => {
        const data = {
            name: name.current.value,
            timeIn: new Date(),
            serviced: false,
            serviceWanted: selectedService,
            technicianWanted: selectedTechnician,
            timeOut: new Date(),
            email: email.current.value
        }
        const docRef = await addDoc(collection(db, "WalkIn"), data).then(() => 
            alert("You have been placed in line, a technician will be with you shortly")
        )
        .catch(e => console.log("check in exception: ", e));
    }


    return (
    <div>
        <form >
            { technicians && services && 
            <div>
                <input type="text" class="form-control text-center" ref={name} placeholder="Name" />
                <input type="email" id="email" class="form-control text-center" ref={email} placeholder="Email" />
                <select type="text" class="custom-select text-center" onChange={e => setSelectedTechnician(e.target.value)}>
                    <option class="text-center" type="text"value="">Preferred Technician</option>
                    <option class="text-center" color="red" value="none">Any Is Fine</option>
                    { 
                        technicians.map(person => <option value={person.fullName}>{person.fullName}</option>) 
                    }
                </select>

            
                <select  class="custom-select text-center" onChange={e => setSelectedService(e.target.value)}>
                    <option value="">Service Wanted</option>
                    <option value="none">I do not know</option>
                    {
                        services.map(service => <option value={service.name}>{service.name}</option>)
                    }
                </select>

                <button type="button" class="btn btn-primary" onClick={checkIn}>Check In</button>
            </div>
            }  
            { !technicians && !services &&
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            }
        </form>
    </div>);
}


export default WalkIn;