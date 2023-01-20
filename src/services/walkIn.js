import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const getWalkIns = async () => {
    var walkIns = [];
    const q = query(collection(db, "WalkIn"), 
                        where("serviced", "==", false));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        var data = doc.data();
        data.id = doc.id;
        walkIns.push(data);
    });

    return walkIns;
}

export default getWalkIns;