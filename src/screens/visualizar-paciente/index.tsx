
import {
    View,
    StatusBar,
    Text,
    Alert,
    ActivityIndicator,
    ToastAndroid,
  } from "react-native";
  import { styles } from "./styles";
  import { Ionicons } from "@expo/vector-icons";
  import { FlatList, RectButton, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
  import { useEffect, useState } from "react";
  import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
  
  
  const TelaVisualizarPaciente = ({ route, navigation }:any) => {
      const { id } = route.params;
      const [loading, setLoading]= useState<boolean>(false);
      const [nome, setNome] = useState<string>("")
      const [cpf, setCpf] = useState<string>("")
      const [email, setEmail] = useState<string>("")
      const [resultados, setResultados] = useState<any>([])
      const [dadosPaciente, setDadosPaciente] = useState<any>();
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
                let pacientes:any = await AsyncStorage.getItem('pacientes');
                pacientes = JSON.parse(pacientes || "{}");
                delete pacientes[id];
                await AsyncStorage.setItem('pacientes', JSON.stringify(pacientes));
                navigation.navigate("home");
              },
            },
          ]);
        }catch(e){
          ToastAndroid.showWithGravityAndOffset(
            'Erro! ' + e,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }finally{
          setLoading(false);
        }
        
      }
  
      const excluirResultado = async(id:any) => {
        setLoading(true);
        let resultadosAposExcluir = resultados;
        try{
          await Alert.alert("Alerta", "Deseja realmente excluir o resultado?" , [
            {text: 'Não'},
            {
              text: 'Sim',
              onPress: async () => {
                let dados = dadosPaciente;
                delete dadosPaciente.resultados[id];
                let pacientes:any = await AsyncStorage.getItem('pacientes');
                pacientes = JSON.parse(pacientes || "{}");

                pacientes[id] = dados
                await AsyncStorage.setItem('pacientes', JSON.stringify(pacientes));
                // await setDoc(doc(database, "patients", dados.id), dados);
                buscarDadosUsuario();
              },
            },
          ]);
        }catch(e){
          ToastAndroid.showWithGravityAndOffset(
            'Erro! ' + e,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }finally{
          setLoading(false);
        }
      }
      
  
      const buscarDadosUsuario = async () => {
        
        
        try{
          setLoading(true);
          let pacientes:any = await AsyncStorage.getItem('pacientes');
          pacientes = JSON.parse(pacientes || "{}");
          let dados;
          for (const item in pacientes) {
            if(pacientes[item].id == id){
              dados = pacientes[item];
            }
          }

          setNome(dados?.firstName);
          setCpf(dados?.cpf);
          setEmail(dados?.email);
          setDadosPaciente(dados);
          let resultadosLidos:any = [];
  
          for (const item in dados?.resultados) {
            const resultado = dados?.resultados[item];
            resultadosLidos.push(resultado);
          }
          setResultados(resultadosLidos);
        }catch(e){
          ToastAndroid.showWithGravityAndOffset(
            'Erro!' + e,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
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
          <StatusBar  />
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
                    renderItem={({item, index})=>
                      (
                        <View  style={styles.botaoResultado}>
                          <Text><Text style={{fontWeight: "bold"}} >Data:</Text> {item.data}</Text>
                          <Text>{item.discrepancia}mm</Text>
                          <TouchableOpacity>
                            <Ionicons
                              onPress={()=>{
                                Alert.alert(item.data, "No resultado selecionado, o paciente "+nome+" teve um espaço presente de "+item.espacoPresente+"mm, um espaço requerido de "+item.espacoRequerido+"mm. A discrepância foi de "+item.discrepancia+"mm." , [
                                  {text: 'OK'},
                                ]);
                            
                              }}
                              name="eye"
                              size={20}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Ionicons
                            
                              onPress={()=>excluirResultado(item.id)}
                              name="trash"
                              size={20}
                            />
                          </TouchableOpacity>
                        </View>
                      )
                    }
                  />
        
                
                <RectButton onPress={()=>navigation.navigate("cadastrarresultado", {id: id})} style={styles.botaoNovoResultado}>
                    <Text style={styles.textoBotaoNovoResultado}>CADASTRAR NOVO RESULTADO</Text>
                </RectButton>
            </ScrollView>
          </>
          }
      </View>
    );
  };
  
  export { TelaVisualizarPaciente };
  