import { addDoc, collection, DocumentReference, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { db } from "../firebase";


const getTechnicians = async () => {
    var technicianArray = [];
    const data = await getDocs(collection(db, 'Technician'));
    data.forEach(data => {
        var pushData = data.data();
        pushData.id = data.id;
        technicianArray.push(pushData);
    })
    return technicianArray;
}

const getTechnicianServices = technician => {
    var serviceArray = [];
    technician.servicesProvided.forEach(async x => {
        const data = await getDoc(x);
        serviceArray.push(data.data());
    })

    return serviceArray;
}

export { getTechnicianServices, getTechnicians };