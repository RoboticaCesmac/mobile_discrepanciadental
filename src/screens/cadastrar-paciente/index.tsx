import { useState } from "react";
import {View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid} from "react-native";
import FormField from "../../components/FormField";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usarMascara } from "../../utils/mascara";
import IPaciente from "../../models/paciente";
import { Ionicons } from "@expo/vector-icons";

export default function TelaCadastrarPaciente() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [nome, setNome] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");

  /**
   * cadastra um novo paciente
   */
  const registerNewUser = async () => {
    try {
      setLoading(true);
      if (nome === "") {
        throw new Error("Digite um nome!");
      } else if (dataNascimento === "") {
        throw new Error("Digite a data de nascimento!");
      } else if (dataNascimento.length < 10) {
        throw new Error("Digite uma data de nascimento válida!");
      }

      let pacientes: any = await AsyncStorage.getItem("pacientes");
      pacientes = JSON.parse(pacientes || "{}");

      // O id é o unix time atual em milissegundos
      let id = Date.now();

      (pacientes[id] = {
        nome: nome,
        dataNascimento: dataNascimento,
        id: id,
        resultados: {},
      }),
        await AsyncStorage.setItem("pacientes", JSON.stringify(pacientes));

      navigation.navigate("home");
    } catch (e:any) {
      ToastAndroid.showWithGravityAndOffset(
        "Erro! " + e.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {loading == true && <ActivityIndicator size={100} color="#000000" />}
      {loading == false && (
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
          
            <Text style={styles.textoHeader}>CADASTRAR UM PACIENTE</Text>
          </View>

          <View style={styles.formContainer}>
            <FormField
              label="Nome"
              value={nome}
              placeholder="Digite o nome"
              onChangeText={(valor) => setNome(valor)}
              onBlur={() => {}}
            
              autoCapitalize="none"
            />
            <FormField
              label="Data de nascimento"
              value={dataNascimento}
              placeholder="00/00/0000"
              maxLength={10}
              onChangeText={(valor) => {
                valor = usarMascara("DATA", valor);
                setDataNascimento(valor);
              }}
              onBlur={() => {}}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => registerNewUser()}
            >
              <Text style={styles.submitButtonText}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>

        </>
      )}
    </View>
  );
}
