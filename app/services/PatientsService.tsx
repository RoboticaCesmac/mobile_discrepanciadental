import { database } from "@config/firebase";
import {
  DocumentData,
  collection,
  endAt,
  getDocs,
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
    const querySnapshot = await getDocs(q);

    //manipulating the query result
    querySnapshot.forEach( (doc) => {
      filteredPatients.push({ ...doc.data(), id: doc.id });
    })
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



