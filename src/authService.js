import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

// --- STEP 3: Signup + Login ---

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

// --- STEP 4: Data save (after login) ---

export const saveData = async (name = "Abhishek") => {
  const user = auth.currentUser;

  if (user) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  } else {
    alert("Login first");
    return null;
  }
};
