import { Text, FlatList, TouchableOpacity, View, TextInput, ActivityIndicator, Dimensions } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigations";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import IPaciente from "../../models/paciente";
  
  export default  function TelaHome(){
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [data, setData] = useState<IPaciente[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [onStartup, setOnStartup] = useState<boolean>(true);
    const isFocused = useIsFocused();
  
    useEffect(() => {
      // AsyncStorage.removeItem('pacientes')
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

    /**
     * pesquisa um paciente 
     * @param valor 
     */
    const filterPatients = async (valor:string) => {
        valor = valor.toLocaleLowerCase();
        let pacientes:any = await AsyncStorage.getItem('pacientes');
        pacientes = JSON.parse(pacientes || "{}");

        let dadosPacientes:any = [];
        if(valor !== ""){
          for (const item in pacientes) { 
            if(pacientes[item].nome.toLowerCase().includes(valor)){
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
  
  
    /**
     * Lista os pacientes
     */
    const getAllPatients = async() => {
      try {
          if (onStartup) {
            setIsLoading(true);
            setOnStartup(false);
          }
          let pacientes:any = await AsyncStorage.getItem('pacientes');
          pacientes = JSON.parse(pacientes || "{}");
          let dadosPacientes:IPaciente[] = [];
          for (const item in pacientes) {
            dadosPacientes.push(pacientes[item] as IPaciente)
          }
          setData(dadosPacientes);
          setIsLoading(false);
      }catch (error: any) {
      }
    };
  
  
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
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
            height: Dimensions.get("window").height - 230,
            width: "100%"
          }}
        >
          <FlatList
            data={data}
            style={{minWidth: "100%"}}
            renderItem={({item})=>(
                <TouchableOpacity style={styles.botaoPaciente} onPress={()=>navigation.navigate("visualizarpaciente", {id: item.id})}>
                    <Ionicons
                        style={{
                        alignSelf: "center",
                        }}
                        name="person"
                        size={24}
                        color="black"
                    />
                    <View style={styles.wrapperText}>
                      <Text style={styles.textName}>{item.nome}</Text>
                      <Text style={styles.textName}>{item.dataNascimento}</Text>
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
            width: Dimensions.get("screen").width / 4,
          }}
        >
          <AntDesign
            style={{
              flexDirection: "row",
            }}
            onPress={() => {
              navigation.navigate("cadastrarpaciente");
            }}
            name="pluscircle"
            size={50}
            color="#357180"
          />
        </View>
      </View>
    );
  };
  
  