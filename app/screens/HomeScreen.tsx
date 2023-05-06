import {
  Alert,
  SafeAreaView,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
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
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }: any) => {

  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
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
        setData(patients);
        setIsLoading(false);
        console.log(patients);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(true);
        console.log("Home, getUsers: " + e);
      });
  }, []);


  //COMPONENTES PARA EXIBIR MENSAGEM DE ERRO E INDICADOR DE LOADING
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data...Check your network connection!
        </Text>
      </View>
    );
  }

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

  	  //funcao de teste, no momento, mas quando implementada
  //terá a responsabilidade de filtrar pacientes pelo nome
  //Obs: ignore esse nome.
  const routeUser = ({ item }: any) => {
    console.log("RouteUser");
  };

  //Cada item é um objeto USER.
  //Deixei o nome 'item' porque é o termo usado pela FlatList
  //Esta funcao/componente é chamada pelo component FlatList lá embaixo
  const renderItem = ({ item }: any) => {
    return <Item item={item} onPress={() => routeUser(item)} />;
  };

  //esta funcao/componente é referenciada em 'renderItem'
  const Item = ({ item, onPress }: any) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={onPress}
      >
        <View
          style={styles.wrapper_icon_text}
        >
          <Ionicons style={{alignSelf:"center"}} name="person" size={24} color="black" />
          <View style={{ marginLeft: 30 }}>
            <Text style={styles.textName}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}
    >
      <Text style={styles.header}>Pacientes</Text>
      <TextInput
        style={styles.input}
        onChangeText={(s) => {
          setSearch(s);
        }}
        autoCapitalize="none"
        value={search}
        placeholder="Pesquise aqui..."
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
      />
      {/* <Button title="Log out" onPress={logout} />
      <Button title="Go Back" onPress={() => navigation.navigate('Authentication')} /> */}
    </SafeAreaView>
  );
};

export { HomeScreen };