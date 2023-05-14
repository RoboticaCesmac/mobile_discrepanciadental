import { query, collection, where, getDocs, DocumentData } from 'firebase/firestore';
import { database } from '@config/firebase';

const emailExists = async (email: string): Promise<boolean> => {
    let emailExits = false;
    const patientsCollectionRef = collection(database, "patients");
    const q = query(patientsCollectionRef, where("email", "==", email));
    const docs = await getDocs<DocumentData>(q);
    docs.forEach( (doc: DocumentData) => {
      if(doc.data().email == email){
        emailExits = true;
      }
    });
    return emailExits;
}

export { emailExists }