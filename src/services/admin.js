import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const isAdminUser = async () => {
    const auth = await getAuth();

    if (auth && auth.currentUser && auth.currentUser.uid) {
        return await (await getDoc(doc(db, "Admin", auth.currentUser.uid))).exists();
    }
    else if (auth && !auth.currentUser) return false;

    return "loading";
}

export default isAdminUser;
