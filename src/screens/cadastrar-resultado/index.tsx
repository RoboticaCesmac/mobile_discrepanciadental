import {View, Text, Alert, Modal, Pressable, Image, ActivityIndicator, ToastAndroid,} from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { RectButton, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { primaria, secundaria, terciaria } from "../../themes/cores";
import { StatusBar } from "expo-status-bar";
  
  
  export default function TelaCadastrarResultado({route}:any){
    const [modalVisivel, setModalVisivel] = useState(false);
    const [loading, setLoading]= useState<boolean>(false);
    const [imagemModal, setImagemModal] = useState("");
    const { id } = route.params;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // Dados dos dentes para o espaço presente
    const [distanciaMolarDCaninoD, setDistanciaMolarDCaninoD] = useState<any>("")
    const [distalIncisivoLateralDMedialIncisivoD, setDistalIncisivoLateralDMedialIncisivoD] = useState<any>("")
    const [distalIncisivoLateralEMedialIncisivoE, setDistalIncisivoLateralEMedialIncisivoE] = useState<any>("")
    const [distal1MolarDostalCanino, setDistal1MolarDostalCanino] = useState<any>("")
    const [espacoPresente, setEspacoPresente] = useState<any>(0)

    // Dados dos dentes para o espaço requerido
    const [incisivoLateralDireito, setIncisivoLateralDireito] = useState<any>("")
    const [incisivoCentralDireito, setIncisivoCentralDireito] = useState<any>("")
    const [incisivoCentralEsquerdo, setIncisivoCentralEsquerdo] = useState<any>("")
    const [incisivoLateralEsquerdo, setIncisivoLateralEsquerdo] = useState<any>("")
    const [somaIncisivos, setSomaIncisivos] = useState<any>(0);
    const [espacoRequerido, setEspacoRequerido] = useState<any>(0);
    const [posicao, setPosicao] = useState("superior")

    const moyersA = [
        {resultado: 19.5, valor: 20.6},
        {resultado: 20.0, valor: 20.9},
        {resultado: 20.5, valor: 21.2},
        {resultado: 21.0, valor: 21.5},
        {resultado: 21.5, valor: 21.8},
        {resultado: 22.0, valor: 22.0},
        {resultado: 22.5, valor: 22.3},
        {resultado: 23.0, valor: 22.6},
        {resultado: 23.5, valor: 22.9},
        {resultado: 24.0, valor: 23.1},
        {resultado: 24.5, valor: 23.4},
        {resultado: 25.0, valor: 23.7},
        {resultado: 25.5, valor: 24.0},
        {resultado: 26.0, valor: 24.2},
        {resultado: 26.5, valor: 24.5},
        {resultado: 27.0, valor: 24.8},
        {resultado: 27.5, valor: 25.0},
        {resultado: 28.0, valor: 25.3},
        {resultado: 28.5, valor: 25.6},
        {resultado: 29.0, valor: 25.9}
    ]

    const moyersB = [
        {resultado: 19.5, valor: 20.1},
        {resultado: 20.0, valor: 20.4},
        {resultado: 20.5, valor: 20.7},
        {resultado: 21.0, valor: 21.0},
        {resultado: 21.5, valor: 21.3},
        {resultado: 22.0, valor: 21.6},
        {resultado: 22.5, valor: 21.9},
        {resultado: 23.0, valor: 22.2},
        {resultado: 23.5, valor: 22.5},
        {resultado: 24.0, valor: 22.8},
        {resultado: 24.5, valor: 23.1},
        {resultado: 25.0, valor: 23.4},
        {resultado: 25.5, valor: 23.7},
        {resultado: 26.0, valor: 24.0},
        {resultado: 26.5, valor: 24.3},
        {resultado: 27.0, valor: 24.6},
        {resultado: 27.5, valor: 24.8},
        {resultado: 28.0, valor: 25.1},
        {resultado: 28.5, valor: 25.4},
        {resultado: 29.0, valor: 25.7}
    ]


    useEffect(()=>{
        mostrarLembrete();
    },[]);

    /**
     * mostra um lembrete na primeira vez que entra na tela, após isso seta uma variável no async storage como true e impede o acionamento do lembrete
     */
    const mostrarLembrete = async()=>{
        let lembrete:any = await AsyncStorage.getItem("lembrete");
        if(lembrete !== "true"){
            
            Alert.alert("Dica", 'Para melhores resultados será necessário utilizar valores decimais como "22.5" ou "22.0".' , [
                {
                    text: 'Não exibir novamente',
                    onPress: async() => await AsyncStorage.setItem("lembrete", "true"),
                    style: 'cancel',
                },
              ]);
        }
    }

    /**
     * Calcula o espaço presente sempre que o valor dos campos dele mudar, é o somatório de todos os campos do espaço presente
     * Quando o campo muda, o valor do campo é passado como parâmetro porque não é possível usar o valor do state logo após setar ele.
     * @param campo 
     * @param valor 
     */
    const atualizarEP = (campo:string, valor:string) => {
        // cria variáveis auxiliares para evitar valores NaN quando vem uma string vazia e substitui , por .
        let distanciaMolarDCaninoDAUX = distanciaMolarDCaninoD === "" ? "0" : distanciaMolarDCaninoD.replace(",", ".");
        let distalIncisivoLateralDMedialIncisivoDAUX = distalIncisivoLateralDMedialIncisivoD === "" ? "0" : distalIncisivoLateralDMedialIncisivoD.replace(",", ".");;
        let distalIncisivoLateralEMedialIncisivoEAUX = distalIncisivoLateralEMedialIncisivoE === "" ? "0" : distalIncisivoLateralEMedialIncisivoE.replace(",", ".");;
        let distal1MolarDostalCaninoAUX = distal1MolarDostalCanino === "" ? "0" : distal1MolarDostalCanino.replace(",", ".");;
        valor = valor === "" ? "0" : valor.replace(",", ".");

        // faz a soma dos valores atualizando a variável do Espaço presente em tempo real
        if(campo === "distanciaMolarDCaninoD"){
            setEspacoPresente(parseFloat(valor) + parseFloat(distalIncisivoLateralDMedialIncisivoDAUX) + parseFloat(distalIncisivoLateralEMedialIncisivoEAUX) + parseFloat(distal1MolarDostalCaninoAUX));
        }else if(campo === "larguraCanino"){
            setEspacoPresente(parseFloat(distanciaMolarDCaninoDAUX) + parseFloat(valor) + parseFloat(distalIncisivoLateralDMedialIncisivoDAUX) + parseFloat(distalIncisivoLateralEMedialIncisivoEAUX) + parseFloat(distal1MolarDostalCaninoAUX));
        }else if(campo === "distalIncisivoLateralDMedialIncisivoD"){
            setEspacoPresente(parseFloat(distanciaMolarDCaninoDAUX) + parseFloat(valor) + parseFloat(distalIncisivoLateralEMedialIncisivoEAUX) + parseFloat(distal1MolarDostalCaninoAUX));
        }else if(campo === "distalIncisivoLateralEMedialIncisivoE"){
            setEspacoPresente(parseFloat(distanciaMolarDCaninoDAUX) +parseFloat(distalIncisivoLateralDMedialIncisivoDAUX) + parseFloat(valor) + parseFloat(distal1MolarDostalCaninoAUX));
        }else if(campo === "distal1MolarDostalCanino"){
            setEspacoPresente(parseFloat(distanciaMolarDCaninoDAUX) + parseFloat(distalIncisivoLateralDMedialIncisivoDAUX) + parseFloat(distalIncisivoLateralEMedialIncisivoEAUX) + parseFloat(valor));
        }
    }

    /**
     * Calcula o espaço requerido sempre que o valor dos campos dele mudar, é o somatório de todos os campos do espaço presente
     * Quando o campo muda, o valor do campo é passado como parâmetro porque não é possível usar o valor do state logo após setar ele.
     * @param campo 
     * @param valor 
     */
    const atualizarER = (campo:string, valor:string)=>{
        // se passar nulo como valor, substitui por 0, se passar "," ao invés de "." também substitui
        let incisivoLateralDireitoAUX = incisivoLateralDireito === "" ? "0" : incisivoLateralDireito.replace(",", ".");;
        let incisivoCentralDireitoAUX = incisivoCentralDireito === "" ? "0" : incisivoCentralDireito.replace(",", ".");;
        let incisivoCentralEsquerdoAUX = incisivoCentralEsquerdo === "" ? "0" : incisivoCentralEsquerdo.replace(",", ".");;
        let incisivoLateralEsquerdoAUX = incisivoLateralEsquerdo === "" ? "0" : incisivoLateralEsquerdo.replace(",", ".");;
        valor = valor === "" ? "0" : valor.replace(",", ".");

        let soma;
        if(campo === "incisivoLateralDireito"){
            soma = parseFloat(valor) + parseFloat(incisivoCentralDireitoAUX) + parseFloat(incisivoCentralEsquerdoAUX) + parseFloat(incisivoLateralEsquerdoAUX);
        }
        if(campo === "incisivoCentralDireito"){
            soma = parseFloat(incisivoLateralDireitoAUX) + parseFloat(valor) + parseFloat(incisivoCentralEsquerdoAUX) + parseFloat(incisivoLateralEsquerdoAUX);
        }
        if(campo === "incisivoCentralEsquerdo"){
            soma = parseFloat(incisivoLateralDireitoAUX) + parseFloat(incisivoCentralDireitoAUX) + parseFloat(valor) + parseFloat(incisivoLateralEsquerdoAUX);
        }
        if(campo === "incisivoLateralEsquerdo"){
            soma = parseFloat(incisivoLateralDireitoAUX) + parseFloat(incisivoCentralDireitoAUX) + parseFloat(incisivoCentralEsquerdoAUX) + parseFloat(valor);
        }if(campo === "picker"){
            soma = parseFloat(incisivoLateralDireitoAUX) + parseFloat(incisivoCentralDireitoAUX) + parseFloat(incisivoCentralEsquerdoAUX) + parseFloat(incisivoLateralEsquerdoAUX);
        }
        setSomaIncisivos(soma);

        let moyers;
        if (posicao === "superior"){
            moyers = moyersA;
        }else{
            moyers = moyersB;
        }

        let moyersEncontrado:boolean = false;
        for(let i in moyers){
            if(soma==moyers[i].resultado){
                moyersEncontrado = true;
                setEspacoRequerido(soma + (2 * moyers[i].valor))
            }
        }
        if(moyersEncontrado == false){
            ToastAndroid.show('Valor não encontrado na tabela de Moyers!', ToastAndroid.SHORT);
            setEspacoRequerido(0)
        }
    }
    /**
     * salva o resultado nos dados do paciente
     */
    const salvarResultado = async () =>{
        try{
            if(espacoPresente.toString() === "0"){
                throw new Error("Não foi possível salvar. O espaço presente é inválido.")
            }else if(espacoRequerido.toString() === "0"){
                throw new Error("Não foi possível salvar. O espaço requerido é inválido.")
            }else if((espacoPresente - espacoRequerido).toString() === "0"){
                throw new Error("Não foi possível salvar. A discrepância é inválida.")
            }
            setLoading(true);

            let pacientes:any = await AsyncStorage.getItem('pacientes');
            pacientes = JSON.parse(pacientes || "{}");
            let dados;
            for (const item in pacientes) {
                if(pacientes[item].id == id){
                    dados = pacientes[item];
                }
            }
            
            // Formata a data
            const idResultado = Date.now();
            const dia = new Date().getDate().toString().length == 1 ? "0" + new Date().getDate().toString().toString() : new Date().getDate().toString().toString();
            const mes = (new Date().getMonth()+1).toString().length == 1 ? "0" + (new Date().getMonth()+1).toString().toString() : (new Date().getMonth()+1).toString().toString();
            const ano = new Date().getFullYear().toString();

            if(dados){
                dados.resultados[idResultado] = {id: idResultado, posicao: posicao, data: dia+"/"+mes+"/"+ano, discrepancia: (espacoPresente - espacoRequerido).toFixed(2), espacoPresente: espacoPresente, espacoRequerido: espacoRequerido}
            }

            for (const item in pacientes) { 
                if(pacientes[item].id == id){
                    pacientes[item] = dados;
                }
            }

            await AsyncStorage.setItem('pacientes', JSON.stringify(pacientes));

            navigation.goBack();
        }catch(e:any){
            Alert.alert("Erro", e.message, [
                {text: 'OK'},
              ]);
        }finally{
            //evita que a tela pisque ao setar false antes de redirecionar
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            setLoading(false);
        }
        
    }

    return (
      
      <View style={styles.content}>
        {loading == true &&
          <ActivityIndicator size={100} color="#000000" />
        }
         {loading !== true &&
         <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => setModalVisivel(!modalVisivel)}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {imagemModal === "1molar-caninoD" &&
                        <Image source={require("../../../assets/1molar-caninoD.png")} style={{width:300, resizeMode: "contain"}}/>
                    }
                    {imagemModal === "1molar-caninoE" &&
                        <Image source={require("../../../assets/1molar-caninoE.png")} style={{width:300, resizeMode: "contain"}}/>
                    }
                    {imagemModal === "incisivolat-incisivocentD" &&
                        <Image source={require("../../../assets/incisivolat-incisivocentD.png")} style={{width:300, resizeMode: "contain"}}/>
                    }
                    {imagemModal === "incisivolat-incisivocentE" &&
                        <Image source={require("../../../assets/incisivolat-incisivocentE.png")} style={{width:300, resizeMode: "contain"}}/>
                    }
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisivel(false)}>
                    <Text style={styles.textStyle}>Fechar</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            <View style={styles.header}>
            <TouchableOpacity>
                <Ionicons
                    onPress={()=>navigation.goBack()}
                    name="chevron-back"
                    size={40}
                    color="#fff"
                />
            </TouchableOpacity>
            
            <Text style={styles.textoHeader}>CALCULADORA</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.tituloPicker}>POSIÇÃO: </Text>
                        <Picker style={{width: 145}}
                            selectedValue={posicao}
                            onValueChange={(itemValue, itemIndex) =>{
                                setPosicao(itemValue);
                                atualizarER("picker", "picker");
                                }
                            }
                            >
                            <Picker.Item style={{fontSize: 15}} label="Superior" value="superior" />
                            <Picker.Item style={{fontSize: 15}} label="Inferior" value="inferior" />
                        </Picker>
                    </View>
        
                    
                    <Text style={styles.titulo}>ESPAÇO PRESENTE</Text>

                    <View style={styles.containerEspacoPresente}>
                        <View style={styles.espacoPresente}>
                            
                            <Text style={styles.subtitulo}>1º molar direito - canino direito</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    style={styles.input}
                                    value={distanciaMolarDCaninoD}
                                    placeholder="0mm"
                                    onChangeText={(valor)=>{
                                        setDistanciaMolarDCaninoD(valor);
                                        atualizarEP("distanciaMolarDCaninoD", valor);
                                    }}
                                />
                                <TouchableOpacity>
                                    <Ionicons
                                        onPress={()=>{setModalVisivel(true); setImagemModal("1molar-caninoD")}}
                                        name="help-circle-outline"
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.subtitulo}>Dist. incisivo lat. direito - med. incisivo cent. direito</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    style={styles.input}
                                    value={distalIncisivoLateralDMedialIncisivoD}
                                    placeholder="0mm"
                                    onChangeText={(valor)=>{
                                            setDistalIncisivoLateralDMedialIncisivoD(valor);
                                            atualizarEP("distalIncisivoLateralDMedialIncisivoD", valor);
                                    }}
                                />
                                <TouchableOpacity>
                                    <Ionicons
                                        onPress={()=>{setModalVisivel(true); setImagemModal("incisivolat-incisivocentD")}}
                                        name="help-circle-outline"
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.subtitulo}>Dist. incisivo lat. - medial incisivo cent. esquerdo</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    style={styles.input}
                                    value={distalIncisivoLateralEMedialIncisivoE}
                                    placeholder="0mm"
                                    onChangeText={(valor)=>{
                                            setDistalIncisivoLateralEMedialIncisivoE(valor);
                                            atualizarEP("distalIncisivoLateralEMedialIncisivoE", valor);
                                    }}
                                />
                                <TouchableOpacity>
                                    <Ionicons
                                        onPress={()=>{setModalVisivel(true); setImagemModal("incisivolat-incisivocentE")}}
                                        name="help-circle-outline"
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.subtitulo}>Dist. do 1º molar - dist. do canino </Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    style={styles.input}
                                    value={distal1MolarDostalCanino}
                                    placeholder="0mm"
                                    onChangeText={(valor)=>{
                                            setDistal1MolarDostalCanino(valor);
                                            atualizarEP("distal1MolarDostalCanino", valor);
                                    }}
                                />
                                <TouchableOpacity>
                                    <Ionicons
                                        onPress={()=>{setModalVisivel(true); setImagemModal("1molar-caninoE")}}
                                        name="help-circle-outline"
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.containeResultado}>
                            <Text>Resultado</Text>
                            <Text style={styles.resultado}>{espacoPresente}<Text style={{fontSize: 15}}>mm</Text></Text>
                        </View>
                    </View>




                    <Text style={styles.titulo}>ESPAÇO REQUERIDO</Text>
                    <View style={styles.containerEspacoRequerido}>
                        <View style={styles.espacoPresente}>
                            <Text style={styles.subtitulo}>Incisivo lateral direito</Text>
                            <TextInput
                                keyboardType="decimal-pad"
                                style={styles.input}
                                value={incisivoLateralDireito}
                                placeholder="0mm"
                                onChangeText={(valor)=>{
                                        setIncisivoLateralDireito(valor);
                                        atualizarER("incisivoLateralDireito", valor);
                                }}
                            />
                            <Text style={styles.subtitulo}>Incisivo central direito</Text>
                            <TextInput
                                keyboardType="decimal-pad"
                                style={styles.input}
                                value={incisivoCentralDireito}
                                placeholder="0mm"
                                onChangeText={(valor)=>{
                                        setIncisivoCentralDireito(valor);
                                        atualizarER("incisivoCentralDireito", valor);
                                }}
                            />
                            <Text style={styles.subtitulo}>Incisivo central esquerdo</Text>
                            <TextInput
                                keyboardType="decimal-pad"
                                style={styles.input}
                                value={incisivoCentralEsquerdo}
                                placeholder="0mm"
                                onChangeText={(valor)=>{
                                        setIncisivoCentralEsquerdo(valor);
                                        atualizarER("incisivoCentralEsquerdo", valor);
                                }}
                            
                            />
                            <Text style={styles.subtitulo}>Incisivo lateral esquerdo</Text>
                            <TextInput
                                keyboardType="decimal-pad"
                                style={styles.input}
                                value={incisivoLateralEsquerdo}
                                placeholder="0mm"
                                onChangeText={(valor)=>{
                                        setIncisivoLateralEsquerdo(valor);
                                        atualizarER("incisivoLateralEsquerdo", valor);
                                }}
                            />
                        </View>
                        <View style={styles.containeResultado}>
                            <Text>Resultado</Text>
                            <Text style={styles.resultado}>{espacoRequerido}<Text style={{fontSize: 15}}>mm</Text></Text>
                        </View>
                    </View>
                    
                    <Text style={[styles.titulo,{marginBottom: 80}]}>DISCREPÂNCIA: {(espacoPresente - espacoRequerido).toFixed(2)}mm</Text>

                <RectButton onPress={()=>salvarResultado()} style={styles.botaoNovoResultado}>
                        
                    <Text style={styles.textoBotaoNovoResultado}>SALVAR RESULTADO</Text>
                </RectButton>
            </ScrollView>
          </>
          }
      </View>
    );
  };
  
  export { TelaCadastrarResultado };
  