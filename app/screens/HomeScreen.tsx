import {
  Alert,
  SafeAreaView,
  Text,
  Button,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth, database } from "@config/firebase";
import styles from './styles';
import { useEffect, useState } from "react";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import React from "react";

const HomeScreen = ({ navigation }: any) => {


  useEffect(() => {
    getDocs<DocumentData>(collection(database, "patients"))
      .then((docs: QuerySnapshot<DocumentData>) => {
        let patients: any[] = [];
        docs.forEach((doc: DocumentData) => {
          //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
          //console.log(`${doc.id} => ${doc.data().name}`);
          const patient = {
            id: doc.id,
            name: doc.data().name,
            cpf: doc.data().cpf,
          };
          patients.push(patient);
        });
        console.log(patients);
      })
      .catch((e) => {
        console.log("Home, getUsers: " + e);
      });
  }, []);


  var name = auth.currentUser?.email;
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      Alert.alert("Ocorreu um erro", JSON.stringify(e));
    } finally {
      navigation.navigate("Authentication");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}
    >
      <Text style={styles.header}>{name}</Text>

      <Button title="Log out" onPress={logout} />
      <Button title="Go Back" onPress={() => navigation.navigate('Authentication')} />
    </SafeAreaView>
  );
};

export { HomeScreen };