import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBookings, getBookingInfo, getBookingInfoTechnician } from '../../services/booking'
import { getTechnicians } from "../../services/technicians";
import Scheduler, { Editing, Resource} from 'devextreme-react/scheduler';
import "react-datepicker/dist/react-datepicker.css";

//this page is for admins to set technician schedules
const SchedulePage = () => {

  const [bookings, setBookings] = useState();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [technicians, setTechnicians] = useState();
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [bookingInfo, setBookingInfo] = useState();
  const [selectedBookingInfo, setSelectedBookingInfo] = useState(null);
  const [schedule, setSchedule] = useState();

  //sets technicans
  useEffect(() => {
    if (!technicians)
      getTechnicians().then( data =>{
        setTechnicians(data);
      })
      .catch(e => console.log("technician error: ", e));

    //sets bookings
    if (!bookings)
      getBookings().then( data =>{
        setBookings(data);
      })
      .catch(e => console.log("booking error: ", e));

    //sets bookinginfo
    if(!bookingInfo)
      getBookingInfo().then( data =>{
        setBookingInfo(data);
      })
      .catch(e => console.log("booking info error: ", e));

    if (technicians)
      getSchedule();

  });

  //adds one hour to date
  const addHour = (date) => {
    date.setHours(date.getHours() + 1);
    return date;
  }

  //returns the datasource for the scheduler with text, description, and start and enddates 
  const getSchedule = async() => {
    //returns array of all objects with the name of selected technician
    getBookingInfo().then(infoArray =>{
      var sched = [];
        //transforms array of objects from getBookingInfoTechnician into readable data source
        for (let i=0; i<infoArray.length; i++ ){

          var bemp = {};
          bemp.text = infoArray[i].technician + ' - ' + infoArray[i].name;
          bemp.description = infoArray[i].selectedService;
          bemp.startDate = infoArray[i].startTime.toDate();
          bemp.endDate = addHour(infoArray[i].startTime.toDate());
          bemp.fullName = infoArray[i].technician;
          sched.push(bemp);
        }
        setSchedule(sched);
    })
  }

  return (
      <div>
          {/* checks if technicans exist */}
          {/* checks if selectedTechnican and schedule exist */}
          {technicians && schedule &&
              <div>
                  <Scheduler
                  dataSource={schedule}
                  startDayHour={8}
                  endDayHour={19}
                  >
                    <Resource
                      dataSource={technicians}
                      fieldExpr="fullName"
                      label="Technician"
                      displayExpr="fullName"
                    />
                  </Scheduler>
              </div>
          }
      </div>
  );
}



export default SchedulePage;