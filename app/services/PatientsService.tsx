import { database } from "@config/firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
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
    const q = query(colRef,orderBy('firstName','asc'), startAt(s), endAt(s+'\uf8ff') );

    //running the query
     //**real time collection data**
     onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        filteredPatients.push({ ...doc.data(), id: doc.id });
      });
    });

    return filteredPatients;
  };

