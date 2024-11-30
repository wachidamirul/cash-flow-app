import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	orderBy,
	query,
	where
} from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "./init";

const firestore = getFirestore(app);

export const transaction = async userId => {
	try {
		let q = query(collection(firestore, "transactions"), where("id_user", "==", userId), orderBy("date", "desc"));

		const querySnapshot = await getDocs(q);

		const data = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));

		return data;
	} catch (error) {
		throw new Error("Failed to fetch transactions");
	}
};

export const transactionById = async id => {
	const docRef = doc(firestore, "transactions", id);
	const docSnap = await getDoc(docRef);
	return docSnap.data();
};

export const deleteTransaction = async id => {
	const docRef = doc(firestore, "transactions", id);
	await deleteDoc(docRef);
};

export const registerUser = async data => {
	const q = query(collection(firestore, "users"), where("email", "==", data.email));

	const querySnapshot = await getDocs(q);
	const users = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	}));

	if (users.length > 0) {
		return {
			status: false,
			statusCode: 400,
			message: "Email already registered"
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

export const loginUser = async data => {
	const q = query(collection(firestore, "users"), where("email", "==", data.email));

	const querySnapshot = await getDocs(q);
	const users = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	}));

	if (users) {
		return users[0];
	} else {
		return null;
	}
};
