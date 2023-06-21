
import {
  View,
  StatusBar,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, RectButton, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { database } from "@config/firebase";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";


const TelaVisualizarPaciente = ({ route, navigation }:any) => {
    const { id } = route.params;
    const [loading, setLoading]= useState<boolean>(false);
    const [nome, setNome] = useState<string>("")
    const [cpf, setCpf] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [resultados, setResultados] = useState<any>([])
    const isFocused = useIsFocused();

    useEffect(()=>{
        buscarDadosUsuario();
    },[isFocused]);

    const excluirPaciente = async()=>{
      setLoading(true);
      try{
        await Alert.alert("Alerta", "Deseja realmente excluir este paciente?" , [
          {text: 'Não'},
          {
            text: 'Sim',
            onPress: async () => {
              await deleteDoc(doc(database, "patients", id));
              navigation.navigate("Home");
            },
          },
        ]);
      }catch(e){
        alert(e)
      }finally{
        setLoading(false);
      }
      
    }
    

    const buscarDadosUsuario = async () => {
      
      try{
        setLoading(true);
        const docRef = doc(database, "patients", id);
        const docSnap = await getDoc(docRef);
        const dados = docSnap.data();
        setNome(dados?.firstName);
        setCpf(dados?.cpf);
        setEmail(dados?.email);
        let resultadosLidos:any = [];

        for (const item in dados?.resultados) {
          const resultado = dados?.resultados[item];
          resultadosLidos.push(resultado);
        }
        setResultados(resultadosLidos);
      }catch(e){
        alert(e)
      }finally{
        setLoading(false);
      }
    }
    
  return (
    <View style={styles.content}>
      {loading == true &&
        <ActivityIndicator size={100} color="#000000" />
      }
      {loading == false &&
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons
                onPress={()=>navigation.goBack()}
                name="chevron-back"
                size={40}
                color="#fff"
            />
          </TouchableOpacity>
        
          <Text style={styles.textoHeader}>VISUALIZAR PACIENTE</Text>

          <TouchableOpacity>
            <Ionicons
                onPress={()=>{excluirPaciente()}}
                name="trash"
                size={30}
                color="#fff"
            />
          </TouchableOpacity>
        </View>
          <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.cardDados}>
                <Text><Text style={{fontWeight: "bold"}} >Nome:</Text> {nome}</Text>
                <Text><Text style={{fontWeight: "bold"}} >CPF:</Text> {cpf}</Text>
                <Text ><Text style={{fontWeight: "bold"}} >E-mail:</Text> {email}</Text>
              </View>
              

                <Text style={styles.tituloResultados} >RESULTADOS</Text>
                <FlatList
                  contentContainerStyle={styles.listaResultados}
                  data={resultados}
                  keyExtractor={(item) => item.id}
                  renderItem={({item})=>
                    (
                      <TouchableOpacity onPress={()=>{
                        Alert.alert(item.data, "No resultado selecionado, o paciente "+nome+" teve um espaço presente de "+item.espacoPresente+"mm, um espaço requerido de "+item.espacoRequerido+"mm. A discrepância foi de "+item.discrepancia+"mm." , [
                          {text: 'OK'},
                        ]);
                    
                      }} style={styles.botaoResultado}>
                        <Text><Text style={{fontWeight: "bold"}} >Data:</Text> {item.data}</Text>
                        <Text>{item.discrepancia}mm</Text>
                      </TouchableOpacity>
                    )
                  }
                />
      
              
              <RectButton onPress={()=>navigation.navigate("cadastrar-resultado", {id: id})} style={styles.botaoNovoResultado}>
                  <Text style={styles.textoBotaoNovoResultado}>CADASTRAR NOVO RESULTADO</Text>
              </RectButton>
          </ScrollView>
        </>
        }
    </View>
  );
};

export { TelaVisualizarPaciente };
