import { addDoc, collection, DocumentReference, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { db } from "../firebase";


const getBookings = async () => {
    var bookingArray = [];
    const data = await getDocs(collection(db, 'Booking'), where("startTime", ">=", new Date()));
    data.forEach(data => {
        var pushData = data.data();
        pushData.id = data.id;
        bookingArray.push(pushData);
    })
    return bookingArray;
}

const getBookingInfo = async () => {
    var infoArray = []; 
    const data = await getDocs(collection(db, 'BookingInfo'));
    data.forEach(data => {
        infoArray.push(data.data());
    })
    return infoArray;
}

const getBookingInfoTechnician = async (techName) => {
    var infoArray = [];
    const data = await getDocs(query(collection(db, "BookingInfo"), where("technician", "==", techName)));
    data.forEach(data => {
        infoArray.push(data.data());
    })
    return infoArray;
}

export { getBookings, getBookingInfo, getBookingInfoTechnician };