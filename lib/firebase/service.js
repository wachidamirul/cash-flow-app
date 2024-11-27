import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export const retriveDats = async collectionName => {
	const snapshot = await getDocs(collection(firestore, collectionName));
	return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const retriveDataById = async (collectionName, id) => {
	const docRef = doc(firestore, collectionName, id);
	const docSnap = await getDoc(docRef);
	return docSnap.data();
};
