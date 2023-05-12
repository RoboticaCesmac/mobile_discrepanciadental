import { database } from "@config/firebase";
import {
  DocumentData,
  collection,
  endAt,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";

export const filterPatients = async (s: string): Promise<any[]> => {
    const filteredPatients: any[] = [];

    //colletion ref
    const colRef = collection(database, "patients");

    //query
    const q = query(colRef,orderBy('name'), startAt(s), endAt(s+'\uf8ff') );

    //running the query
     //**real time collection data**
     onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
        filteredPatients.push({ ...doc.data(), id: doc.id });
      });
    });

    return filteredPatients;
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



