import React , { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase';
import { getTechnicians, getTechnicianServices } from '../services/technicians';
import { getServices } from "../services/services"
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { getBookings } from '../services/booking';
const { useNavigate } = require("react-router-dom")

const MakeAppointment = () => {
    const [technicians, setTechnicians] = useState();
    const [selectedTechnician, setSelectedTechnician] = useState();
    const [services, setServices] = useState();
    const [selectedService, setSelectedService] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState();

    const [prevBookings, setPrevBookings] = useState();

    const [name, setName] = useState(''); // Name for the order

    const [userid, setUserId] = useState();

    const [times, setTimes] = useState([]);
    const [dates, setDates] = useState([]);

    const navigation = useNavigate();

    useEffect(() => {
        if (!technicians)
            getTechnicians().then(data => setTechnicians(data));

        if (!services)
            getServices().then(data => {
                setServices(data);
            })
            .catch(e => alert("Something went wrong, please try again"));

        if (!prevBookings) {
            getBookings().then(data => {
                setPrevBookings(data);
            })
            .catch(() => alert("Something went wrong, please try again"))
        }
    });

    onAuthStateChanged(auth, (user) => {
        user != null ? setUserId(user.uid) : setUserId(null);
        if (user)
            document.getElementById('emailInput').value = user.email;
    })


    const changeTechnician = async (name) => {
        if (name != "") {
            let newTechnician = technicians.find(x => x.fullName === name)
            setSelectedTechnician(newTechnician);
            

            var newDates= [];
            newTechnician.timeAvailable.forEach(x => {
                let startDate = x.startTime.toDate();
                if (!newDates.find(x => x === startDate.toLocaleDateString()) && startDate > new Date())
                    newDates.push(startDate.toLocaleDateString());
            });

            setDates(newDates);
        } 
        else setSelectedDate(null);
    }

    const dateSelected = async(date) => {
        setSelectedDate(date);
        if (date != "") {
            let newTechnician = selectedTechnician;

            var newTimes = [];
            const prevBookingsForDate = prevBookings.filter(x => x.startDate.toDate().toLocaleDateString() === date && x.technician === selectedTechnician.fullName);

            newTechnician.timeAvailable.forEach(x => {
                if (x.startTime.toDate().toLocaleDateString() === date) {
                    let startTime = x.startTime.toDate();
                    let endTime = x.endTime.toDate();

                    while (startTime <= endTime) {
                        if (startTime.toLocaleDateString() === date &&
                            !prevBookingsForDate.find(x => x.startDate.toDate().toLocaleTimeString() === startTime.toLocaleTimeString())) {
                            newTimes.push(startTime.toLocaleTimeString());
                        }
                        startTime.setHours(startTime.getHours() + 1);
                    }
                }
            });

            

            setTimes(newTimes);
        }
    }

    const scheduleAppointment = async() => {
        let userName = document.getElementById('nameInput').value;
        let userEmail = document.getElementById('emailInput').value;

        if (userName === '' || userEmail === '') {
            alert("You must set a name and email for the order");
            return;
        }

        var timeScheduled = new Date(selectedDate + ' ' + selectedTime);
        timeScheduled.setHours(timeScheduled.getHours() - 1);
        let dataTime = {
            technician: selectedTechnician.fullName,
            startDate: timeScheduled
        }
        timeScheduled.setHours(timeScheduled.getHours() + 1);
        dataTime.endDate = timeScheduled;


        const docRef = await addDoc(collection(db, "Booking"), dataTime);


        const dataUser = {
            userid: userid,
            name: userName,
            bookingid: docRef.id,
            selectedService: selectedService,
            technician: selectedTechnician.fullName,
            email: userEmail,
            startTime: timeScheduled
        }

        await addDoc(collection(db, "BookingInfo"), dataUser);
        alert("booking successfully set! You will receive an email soon!")
        navigation('/')
    }
    
    return (
        <div class="container">
            <div class='row'>
                    <input id="nameInput" type="text" class="col-6 text-center form-control" placeholder="Name for the order" />
            </div>
            <div class='row'>
                    <input id="emailInput" type="text" class="col-6 text-center form-control" placeholder="Email" />
            </div>
            {services && 
                <select class="col-6 text-center custom-select" onChange={e => setSelectedService(e.target.value)}>
                    <option value="">Service Wanted</option>
                    <option value="none">I do not know</option>
                    {
                        services.map(service => <option value={service.name}>{service.name}</option>)
                    }
                </select>
            }
            {technicians &&
                <div class="row">
                    <select class="col-6 text-center custom-select" onChange={e => changeTechnician(e.target.value)}>
                        <option value={""}>Please select a technician</option>
                            {
                                technicians.map(dude => <option value={dude.fullName}>{dude.fullName}</option>)
                            }
                    </select>
                </div>
            }
            {selectedTechnician && prevBookings &&
                <div class="row">
                        <select class="col-6 custom-select"  onChange={e => dateSelected(e.target.value)}>
                            <option value="">Please select an appointment date</option>
                            {
                                dates.map(x => <option value={x}>{x}</option>)
                            }
                        </select>
                </div>
            }
            {selectedDate && prevBookings &&
                <div class='row'>
                    <select class ="col-6 custom-select" onChange={e => setSelectedTime(e.target.value)}>
                        <option value = {null}>Please select an appointment time</option>
                        {times.map(x => <option value={x}>{x}</option>)}
                    </select>
                </div>
            }

                

            {selectedService && selectedTechnician && selectedDate && selectedTime &&
                <div class="button-center">
                    <button style={{ background: 'brown', color: "whitesmoke"}} class="button1" onClick={scheduleAppointment}>Submit</button>
                </div>
            }
           
    </div>)
}


export default MakeAppointment;