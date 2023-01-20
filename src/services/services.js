import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from "../firebase";

const getServices = async () => {
    var serviceArray = [];
    const data = await getDocs(collection(db, 'services'));
    data.forEach(data => {
        serviceArray.push(data.data());
    });
    return serviceArray;
}

export { getServices }