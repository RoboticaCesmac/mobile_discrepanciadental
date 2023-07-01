
import { View, Text, Alert, ActivityIndicator, ToastAndroid } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, RectButton, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IPaciente from "../../models/paciente";
  
  
const TelaVisualizarPaciente = ({ route, navigation }:any) => {
    const { id } = route.params;
    const [loading, setLoading]= useState<boolean>(false);
    const [nome, setNome] = useState<string>("")
    const [dataNascimento, setDataNascimento] = useState<string>("")
    const [resultados, setResultados] = useState<any>([])
    const [dadosPaciente, setDadosPaciente] = useState<IPaciente>();
    const isFocused = useIsFocused();

    useEffect(()=>{
      // AsyncStorage.removeItem('pacientes');
        buscarDadosUsuario();
    },[isFocused]);

    /**
    * remove um paciente dos pacientes cadastrados
    */
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

    /**
     * Remove um resultado dos dados
     * @param id 
     */
    const excluirResultado = async(idResultado:any) => {
      setLoading(true);
      let resultadosAposExcluir = resultados;
      try{
        await Alert.alert("Alerta", "Deseja realmente excluir o resultado?" , [
          {text: 'Não'},
          {
            text: 'Sim',
            onPress: async () => {
              delete dadosPaciente?.resultados[idResultado];
              let pacientes:any = await AsyncStorage.getItem('pacientes');
              pacientes = JSON.parse(pacientes || "{}");
              for (const item in pacientes) { 
                if(pacientes[item].id == id){
                  pacientes[item] = dadosPaciente;
                }
              }
              await AsyncStorage.setItem('pacientes', JSON.stringify(pacientes));

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
    
    /**
     * busca os dados do paciente
     */
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

        setDadosPaciente(dados as IPaciente);
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
          <View style={styles.container}>
              <View style={styles.cardDados}>
                <Text><Text style={{fontWeight: "bold"}} >Nome:</Text> {dadosPaciente?.nome}</Text>
                <Text><Text style={{fontWeight: "bold"}} >Data de nascimento:</Text> {dadosPaciente?.dataNascimento}</Text>
              </View>
              

              <Text style={styles.tituloResultados} >RESULTADOS</Text>
              <FlatList
                contentContainerStyle={styles.listaResultados}
                data={resultados}
                keyExtractor={(item) => item.id}
                renderItem={({item, index})=>
                  (
                    <View  style={styles.botaoResultado}>
                      
                      <View style={{flex: 1}}>
                        <Text><Text style={{fontWeight: "bold"}} >Posição:</Text> {item.posicao}</Text>
                        <Text><Text style={{fontWeight: "bold"}} >Data do resultado:</Text> {item.data}</Text>
                        <Text><Text style={{fontWeight: "bold"}} >Espaço presente:</Text> {item.espacoPresente}mm</Text>
                        <Text><Text style={{fontWeight: "bold"}} >Espaço requerido:</Text> {item.espacoRequerido}mm</Text>
                        <Text><Text style={{fontWeight: "bold"}} >Discrepância:</Text> {item.discrepancia}mm</Text>
                      </View>
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
          </View>
        </>
        }
    </View>
  );
};

export { TelaVisualizarPaciente };
