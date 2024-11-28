import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "./init";

const firestore = getFirestore(app);

export const retriveData = async (collectionName) => {
  const snapshot = await getDocs(collection(firestore, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const retriveDataById = async (collectionName, id) => {
  const docRef = doc(firestore, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const registerUser = async (data) => {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Email already registered",
    };
  } else {
    data.name = data.name.toLowerCase();
    data.email = data.email.toLowerCase();
    data.password = await bcrypt.hash(data.password, 10);
    try {
      await addDoc(collection(firestore, "users"), data);
      return { status: true, statusCode: 200, message: "Register Success" };
    } catch (error) {
      return { status: false, statusCode: 400, message: "Register Failed" };
    }
  }
};
