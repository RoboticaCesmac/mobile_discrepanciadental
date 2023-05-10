import { database } from "@config/firebase";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";


export const filterPatients = async (s: string): Promise<any[]> => {
    //console.log("HomeScreen, filterPatient " + " => " + s);
    const filteredPatients: any[] = [];

    //colletion ref
    const colRef = collection(database, "patients");

    //query
    const q = query(colRef, where("name", ">=", s));

    //real time collection data
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
        filteredPatients.push({ ...doc.data(), id: doc.id });
      });
    });

    return new Promise<any[]>((resolve, reject) => {
        //no error handling here, since onSnapshot() doesn't reject
        //just resolve with the filteredPatients array

        resolve(filteredPatients);
    });
  };


export const getPatients = async (): Promise<any[]>  => {
    try {
      const docs = await getDocs<DocumentData>(collection(database, "patients"));
      let patients: any[] = [];
      docs.forEach((doc: DocumentData) => {
        const patient = {
          id: doc.id,
          name: doc.data().name,
          cpf: doc.data().cpf,
        };
        patients.push(patient);
      });
      return patients;
    } catch (error: any) {
      console.log("Home, getUsers: " + error);
      return error;
    }
};



