import { getAuth, onAuthStateChanged } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../../firebase";
import isAdminUser from "../../services/admin"
import getWalkIns from "../../services/walkIn";

//this page is for admins to check in walk-ins
const AdminPage = () => {
    const navigation = useNavigate();
    const [walkIns, setWalkins] = useState(null);
    var isAdmin = null;

    //checks if user is admin, and sets walkins if none exist
    useEffect(() => {
        if (isAdmin == null)
            isAdminUser().then(x => {
                if (x != "loading")
                    isAdmin = x;
            });

        if (!walkIns)
            getWalkIns().then(walkInDocs => {
                setWalkins(walkInDocs);
            });
    });

    //check admin function 
    const checkAdmin = async () => {
        if (isAdmin == null)
            isAdminUser().then(x => {
                if (x != "loading")
                    isAdmin = x;
            });
    }

    //adding walkins to firestore
    const serviceWalkIn = async (walkInId) => {
        await setDoc(doc(db, "WalkIn", walkInId), 
            { serviced: true}, 
            {merge: true});

        alert("Customer has been serviced!");

        getWalkIns().then(walkInDocs => {
            setWalkins(walkInDocs);
        });
    }

    //front end check ins for walkins
    return (
        <div>
            <h1>Walk-Ins</h1>
            {walkIns && walkIns.map(walkIn => 
                <div style={{ background: "white" }}>
                    <p>Name: {walkIn.name}</p>
                    <p>Requested Service: {walkIn.serviceWanted}</p>
                    <p>Requested Technician: {walkIn.technicianWanted}</p>
                    <p>Time Walked In: {walkIn.timeIn.toDate().toString()}</p>
                    {walkIn.email && <p>Email: {walkIn.email}</p>}
                    <button style={{ background: "brown", color: "whitesmoke"}} value={walkIn.id} onClick={() => serviceWalkIn(walkIn.id)}>Send Email, Technician is ready</button>
                    <hr /> 
                    <br />
                </div>
                )
            }
        </div>
    )
    
}

export default AdminPage;