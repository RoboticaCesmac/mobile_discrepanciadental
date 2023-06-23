import {
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
    View,
    TextInput,
    ActivityIndicator,
    Dimensions,
  } from "react-native";

import styles from "./styles";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigations";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
  
  export default  function TelaHome(){
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [onStartup, setOnStartup] = useState<boolean>(true);
    const isFocused = useIsFocused();
    const isOnStartup = false;
  
    useEffect(() => {
      getAllPatients();
    }, [isFocused]);
  
    //COMPONENTES PARA EXIBIR MENSAGEM DE ERRO E INDICADOR DE LOADING
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={50} color="#000" />
        </View>
      );
    }

    const filterPatients = async (valor:string) => {
        valor = valor.toLocaleLowerCase();
        let pacientes:any = await AsyncStorage.getItem('pacientes');
        pacientes = JSON.parse(pacientes || "{}");

        let dadosPacientes:any = [];
        if(valor !== ""){
          for (const item in pacientes) {
            console.log(pacientes[item].firstName.toLowerCase().includes(valor))
            if(pacientes[item].firstName.toLowerCase().includes(valor)){
              dadosPacientes.push(pacientes[item]);
            }
          }
          setData(dadosPacientes);
        }else{
          let dadosPacientes = [];
          for (const item in pacientes) {
            dadosPacientes.push(pacientes[item])
          }
          setData(dadosPacientes);
        }
      };
  
  
  
    const getAllPatients = async() => {
      try {
          if (onStartup) {
            setIsLoading(true);
            setOnStartup(false);
          }
          let pacientes:any = await AsyncStorage.getItem('pacientes');
          pacientes = JSON.parse(pacientes || "{}");
          let dadosPacientes = [];
          for (const item in pacientes) {
            dadosPacientes.push(pacientes[item])
          }
          setData(dadosPacientes);
          setIsLoading(false);


        //   const patientsCollectionRef = collection(database, "patients");
        //   onSnapshot(patientsCollectionRef,
        //   (snapshot: QuerySnapshot<DocumentData>) => {
        //   let patients: any[] = [];
        //   snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        //     const patient = {
        //       id: doc.id,
        //       firstName: doc.data().firstName,
        //       cpf: doc.data().cpf,
        //     };
        //     alert(JSON.stringify(patient))
        //     patients.push(patient);
        //     setData(patients);
        //   });
          
        //   setIsLoading(false);
        // })
      }catch (error: any) {
      }
    };
  
  
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          // borderWidth: 5,
          // borderStyle: "solid",
          // borderColor: "#f900dd",
        }}
      >
        <Text style={styles.header}>Pacientes</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginBottom: 30
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={(valor) => {
              setSearch(valor);
              filterPatients(valor);
            }}
            autoCapitalize="none"
            value={search}
            placeholder="Pesquise aqui..."
          />
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={{
              marginLeft: 10,
            }}
         
          />
        </View>
        <View
          style={{
            // borderWidth: 5,
            // borderStyle: "solid",
            // borderColor: "#ABCDEF",
            height: Dimensions.get("window").height - 230,
          }}
        >
          <FlatList
            data={data}
            renderItem={({item})=>(
                <TouchableOpacity style={styles.wrapperIconTextBtnLoadResults} onPress={()=>navigation.navigate("visualizarpaciente", {id: item.id})}>
                    <Ionicons
                        style={{
                        alignSelf: "center",
                        // borderWidth: 1,
                        // borderStyle: "solid",
                        // borderColor: "#ff5555",
                        }}
                        name="person"
                        size={24}
                        color="black"
                    />
                    <View style={styles.wrapperText}>
                        <Text style={styles.textName}>{item.firstName + ' ' + item.cpf}</Text>
                    </View>
                
                    <AntDesign name="right" size={24} color="black" />
            
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatList}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 20,

            // borderWidth: 5,
            // borderStyle: "solid",
            // borderColor: "#abcdff",
            width: Dimensions.get("screen").width / 4,
          }}
        >
          <AntDesign
            style={{
              flexDirection: "row",
              // borderWidth: 5,
              // borderStyle: "solid",
              // borderColor: "#ABCDEF",
            }}
            onPress={() => {
              navigation.navigate("cadastrarpaciente");
            }}
            name="pluscircle"
            size={50}
            color="#357180"
          />
        </View>
  
        {/* <Button title="Log out" onPress={logout} />
        <Button title="Go Back" onPress={() => navigation.navigate('Authentication')} /> */}
      </ScrollView>
    );
  };
  
  