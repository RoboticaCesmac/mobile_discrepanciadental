
import {
    View,
    StatusBar,
    Text,
  } from "react-native";
  import { styles } from "./styles";
  import { Ionicons } from "@expo/vector-icons";
  import { FlatList, RectButton, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
  import { useEffect, useState } from "react";
  import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
  import { database } from "@config/firebase";
import FormField from "@components/FormField";
  
  
  const TelaCadastrarResultado = ({ route, navigation }:any) => {
    const { id } = route.params;

    const [distanciaMolarDCaninoD, setDistanciaMolarDCaninoD] = useState<any>(0)
    const [larguraCanino, setLarguraCanino] = useState<any>(0)
    const [distalIncisivoLateralDMedialIncisivoD, setDistalIncisivoLateralDMedialIncisivoD] = useState<any>(0)
    const [distalIncisivoLateralEMedialIncisivoE, setDistalIncisivoLateralEMedialIncisivoE] = useState<any>(0)
    const [distal1MolarDostalCanino, setDistal1MolarDostalCanino] = useState<any>(0)
    const [espacoPresente, setEspacoPresente] = useState<any>(0)

    const [incisivoLateralDireito, setIncisivoLateralDireito] = useState<any>(0)
    const [incisivoCentralDireito, setIncisivoCentralDireito] = useState<any>(0)
    const [incisivoCentralEsquerdo, setIncisivoCentralEsquerdo] = useState<any>(0)
    const [incisivoLateralEsquerdo, setIncisivoLateralEsquerdo] = useState<any>(0)
    const [somaIncisivos, setSomaIncisivos] = useState<any>(0);
    const [espacoRequerido, setEspacoRequerido] = useState<any>(0)

    const moyers = [
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
    
    },[]);

    const salvarResultado = async () =>{
        const docRef = doc(database, "patients", id);
        const docSnap = await getDoc(docRef);
        const dados = docSnap.data();
        const idResultado = Date.now();
        const dia = new Date().getDate().toString().length == 1 ? "0" + new Date().getDate().toString().toString() : new Date().getDate().toString().toString();
        const mes = (new Date().getMonth()+1).toString().length == 1 ? "0" + (new Date().getMonth()+1).toString().toString() : (new Date().getMonth()+1).toString().toString();
        const ano = new Date().getFullYear().toString();

        if(dados){
            dados.resultados[idResultado] = {id: idResultado, data: dia+"/"+mes+"/"+ano, discrepancia: espacoPresente - espacoRequerido, espacoPresente: espacoPresente, espacoRequerido: espacoRequerido}
        }
        await setDoc(doc(database, "patients", id), dados);
        navigation.goBack();
    }

    return (
      <View style={styles.content}>
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
         
          <Text style={styles.textoHeader}>CALCULADORA</Text>
        </View>
          <ScrollView contentContainerStyle={styles.container}>
                
                <Text style={styles.titulo}>ESPAÇO PRESENTE</Text>

                <View style={styles.containerEspacoPresente}>
                    <View style={styles.espacoPresente}>
                        <Text style={styles.subtitulo}>1º molar direito - canino direito</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            value={distanciaMolarDCaninoD}
                            placeholder="0mm"
                            onChangeText={(valor)=>{
                                if(valor !== ""){
                                    setDistanciaMolarDCaninoD(parseFloat(valor));
                                    setEspacoPresente(parseFloat(valor) + larguraCanino + distalIncisivoLateralDMedialIncisivoD + distalIncisivoLateralEMedialIncisivoE + distal1MolarDostalCanino)
                                }
                            }}
                            onBlur={() => {}}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.subtitulo}>Largura do canino</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            value={larguraCanino}
                            placeholder="0mm"
                            onChangeText={(valor)=>{
                                if(valor !== ""){
                                    setLarguraCanino(parseFloat(valor));
                                    setEspacoPresente(distanciaMolarDCaninoD + parseFloat(valor) + distalIncisivoLateralDMedialIncisivoD + distalIncisivoLateralEMedialIncisivoE + distal1MolarDostalCanino)
                                }
                            }}
                            onBlur={() => {}}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.subtitulo}>Dist. incisivo lat. direito - med. incisivo cent. direito</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            value={distalIncisivoLateralDMedialIncisivoD}
                            placeholder="0mm"
                            onChangeText={(valor)=>{
                                if(valor !== ""){
                                    setDistalIncisivoLateralDMedialIncisivoD(parseFloat(valor));
                                    setEspacoPresente(distanciaMolarDCaninoD + larguraCanino + parseFloat(valor) + distalIncisivoLateralEMedialIncisivoE + distal1MolarDostalCanino)
                                }
                            }}
                            onBlur={() => {}}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.subtitulo}>Dist. incisivo lat. - medial incisivo cent. esquerdo</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            value={distalIncisivoLateralEMedialIncisivoE}
                            placeholder="0mm"
                            onChangeText={(valor)=>{
                                if(valor !== ""){
                                    setDistalIncisivoLateralEMedialIncisivoE(parseFloat(valor));
                                    setEspacoPresente(distanciaMolarDCaninoD + larguraCanino + distalIncisivoLateralDMedialIncisivoD + parseFloat(valor) + distal1MolarDostalCanino)
                                }
                            }}
                            onBlur={() => {}}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.subtitulo}>Dist. do 1º molar - dist. do canino </Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            value={distal1MolarDostalCanino}
                            placeholder="0mm"
                            onChangeText={(valor)=>{
                                if(valor !== ""){
                                    setDistal1MolarDostalCanino(parseFloat(valor));
                                    setEspacoPresente(distanciaMolarDCaninoD + larguraCanino + distalIncisivoLateralDMedialIncisivoD + distalIncisivoLateralEMedialIncisivoE + parseFloat(valor))
                                }
                            }}
                            onBlur={() => {}}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
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
                            keyboardType="number-pad"
                            style={styles.input}
                            value={incisivoLateralDireito}
                            placeholder="0mm"
                            onChangeText={(valor)=>{
                                if(valor !== ""){
                                    setIncisivoLateralDireito(parseFloat(valor));
                                    setSomaIncisivos(parseFloat(valor) + incisivoCentralDireito + incisivoCentralEsquerdo + incisivoLateralEsquerdo);
                                    for(let i in moyers){
                                        if((parseFloat(valor) + incisivoCentralDireito + incisivoCentralEsquerdo + incisivoLateralEsquerdo)==moyers[i].resultado){
                                            setEspacoRequerido((parseFloat(valor) + incisivoCentralDireito + incisivoCentralEsquerdo + incisivoLateralEsquerdo) + (2 * moyers[i].valor))
                                        }
                                    }
                                }
                            }}
                            onBlur={() => {}}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.subtitulo}>Incisivo central direito</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            value={incisivoCentralDireito}
                            placeholder="0mm"
                            onChangeText={(valor)=>{
                                if(valor !== ""){
                                    setIncisivoCentralDireito(parseFloat(valor));
                                    setSomaIncisivos(incisivoLateralDireito + parseFloat(valor) + incisivoCentralEsquerdo + incisivoLateralEsquerdo)
                                    for(let i in moyers){
                                        if((incisivoLateralDireito + parseFloat(valor) + incisivoCentralEsquerdo + incisivoLateralEsquerdo)==moyers[i].resultado){
                                            setEspacoRequerido((incisivoLateralDireito + parseFloat(valor) + incisivoCentralEsquerdo + incisivoLateralEsquerdo) + (2 * moyers[i].valor))
                                        }
                                    }
                                }
                            }}
                            onBlur={() => {}}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.subtitulo}>Incisivo central esquerdo</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            value={incisivoCentralEsquerdo}
                            placeholder="0mm"
                            onChangeText={(valor)=>{
                                if(valor !== ""){
                                    setIncisivoCentralEsquerdo(parseFloat(valor));
                                    setSomaIncisivos(incisivoLateralDireito + incisivoCentralDireito + parseFloat(valor) + incisivoLateralEsquerdo)
                                    for(let i in moyers){
                                        if((incisivoLateralDireito + incisivoCentralDireito + parseFloat(valor) + incisivoLateralEsquerdo)==moyers[i].resultado){
                                            setEspacoRequerido((incisivoLateralDireito + incisivoCentralDireito + parseFloat(valor) + incisivoLateralEsquerdo) + (2 * moyers[i].valor))
                                        }
                                    }
                                }
                            }}
                            onBlur={() => {}}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Text style={styles.subtitulo}>Incisivo lateral esquerdo</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            value={incisivoLateralEsquerdo}
                            placeholder="0mm"
                            onChangeText={(valor)=>{
                                if(valor !== ""){
                                    setIncisivoLateralEsquerdo(parseFloat(valor));
                                    setSomaIncisivos(incisivoLateralDireito + incisivoCentralDireito + incisivoCentralEsquerdo + parseFloat(valor))
                                    for(let i in moyers){
                                        if((incisivoLateralDireito + incisivoCentralDireito + incisivoCentralEsquerdo + parseFloat(valor))==moyers[i].resultado){
                                            setEspacoRequerido((incisivoLateralDireito + incisivoCentralDireito + incisivoCentralEsquerdo + parseFloat(valor)) + (2 * moyers[i].valor))
                                        }
                                    }
                                }
                            }}
                            onBlur={() => {}}
                            autoCapitalize="none"
                            autoCorrect={false}
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
      </View>
    );
  };
  
  export { TelaCadastrarResultado };
  