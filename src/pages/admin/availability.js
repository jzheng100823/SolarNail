import { getAuth, onAuthStateChanged } from "firebase/auth";
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../../firebase";
import { getTechnicians } from '../../services/technicians';
import { getBookings } from '../../services/booking';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "./availability.css"

import "react-datepicker/dist/react-datepicker.css";
import { isAdmin } from "../../templates/navbar";
import isAdminUser from "../../services/admin";

//this page is for admins to set technician schedules
const Availability = () => {
    const navigation = useNavigate();

    const [technicians, setTechnicians] = useState();
    const [selectedTechnician, setSelectedTechnician] = useState(null);
    const [bookings, setBookings] = useState();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newDate, setNewDate] = useState(new Date());
    const [newStartTime, setNewStartTime] = useState('08:00');
    const [newEndTime, setNewEndTime] = useState('17:00');
    const [availability, setAvailability] = useState([])
    const [isAdmin, setIsAdmin] = useState(null);

    const name = useRef();

    //will set technicians and bookings if none exist
    useEffect(() => {
        //checks if user is admin
        // if (!isAdmin)
        //     isAdminUser().then(x => {
        //         console.log("x is: ", x);
        //         if (!x) {
        //             alert("You do not have permission to access this page");
        //             navigation('/');
        //         }
        //     });

        if (!technicians)
            getTechnicians().then( data =>{
                setTechnicians(data);
            })
            .catch(e => console.log("technician error: ", e));

        if (!bookings)
          getBookings().then( data =>{
              setBookings(data);
          })
          .catch(e => console.log("booking error: ", e));

    });

    const refreshTechniciansAndBookings = () => {
      getTechnicians().then( data =>{
          setTechnicians(data);
          const techDude = data.find(x => x.fullName === selectedTechnician.fullName);
          setSelectedTechnician(techDude);
      })
      .catch(e => console.log("technician error: ", e));
    }

    const technicianRef = (id) => doc(db, 'Technician', id);

    //adds availability to technician collection
    const addAvailability = async () => {
        var startTimeDate = new Date(newDate);
        startTimeDate.setHours(newStartTime.split(':')[0]);
        startTimeDate.setMinutes(newEndTime.split(':')[1]);
        startTimeDate.setSeconds(0);

        var endTimeDate = new Date(newDate);
        endTimeDate.setHours(newEndTime.split(':')[0]);
        endTimeDate.setMinutes(newEndTime.split(':')[1]);
        endTimeDate.setSeconds(0);

        await updateDoc(technicianRef(selectedTechnician.id), {
            timeAvailable: arrayUnion(
            {
                'startTime': startTimeDate, 
                'endTime': endTimeDate
            })
        });

      refreshTechniciansAndBookings();
    }
    const deleteTimeAvailable = async (time) => {
      await updateDoc(technicianRef(selectedTechnician.id), {
        timeAvailable: arrayRemove({
            'startTime': time.startTime, 
            'endTime': time.endTime
        })
      });

      refreshTechniciansAndBookings();
    }
    
    //front end for setting availabilities 
    return (
      <div>
        {technicians &&
          <select class="custom-select" onChange={e => {setSelectedTechnician(technicians.find(x => x.fullName === e.target.value));}}>
            <option value={null}>Please select a technician</option>
            {
              technicians.map(dude => <option className="text-size" value={dude.fullName}>{dude.fullName}</option>)
            }
          </select>
        }
        {selectedTechnician &&
          <div className="booking-container">
            
            {
              selectedTechnician.timeAvailable.map(time => 
                <div>
                  <p >Date: {time.startTime.toDate().toLocaleDateString()}</p>
                  <p >Time Start: {time.startTime.toDate().toLocaleTimeString()}</p>
                  <p >Time End: {time.endTime.toDate().toLocaleTimeString()}</p>
                  <button className="button-color" onClick={e => deleteTimeAvailable(time)}>Delete Time Available</button>
                  <br />
                  <br />
                  <br />
                </div>
              )
            }
            <div>
            <button className="button-color"onClick={event => {addAvailability();}}>Add New Availability</button>
            <ReactDatePicker selected={newDate} onChange={setNewDate} />
            <TimePicker className="background" onChange={setNewStartTime} value={newStartTime} maxDetail="hour"/>
            <TimePicker className="background" onChange={setNewEndTime} value={newEndTime} maxDetail="hour"/>
            <br/>
            <br/>
            <br/>
          </div>
          </div>
        }

        {(!technicians || !bookings) &&
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        }
      </div>
    );
}


export default Availability;