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
  Dimensions,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@config/firebase";
import styles from "./styles";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { filterPatients, getPatients } from "../services/PatientsService";

const HomeScreen = ({ navigation }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [onStartup, setOnStartup] = useState<boolean>(true);

  const isOnStartup = false;

  useEffect(() => {
    getAllPatients();
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
  //terá a responsabilidade de carregar a tela de listagem
  //de pacientes
  //Obs: ignore esse nome.
  const routeUser = ({ item }: any) => {
    console.log("RouteUser");
  };

  const getAllPatients = () => {
    //verificando se este método está sendo chamado no startup do componente e
    //caso esteja sendo chamado será exibido o loading, caso contrario nao será
    //exibido o loading
    if (onStartup) {
      setIsLoading(true);
      setOnStartup(false);
    }
    getPatients()
      .then((patients: any) => {
        setData(patients);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setError(true);
      });
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
      <View style={styles.wrapperIconTextBtnLoadResults}>
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
          <Text style={styles.textName}>{item.name}</Text>
        </View>
        <TouchableOpacity style={styles.btnLoadResults} onPress={onPress}>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
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
        }}
      >
        <TextInput
          style={styles.input}
          onChangeText={(s) => {
            //se o input estiver em branco me traga a lista de pacientes
            if (s == "") {
              getAllPatients();
            }
            setSearch(s);
          }}
          autoCapitalize="none"
          value={search}
          placeholder="Pesquise aqui..."
        />
        <AntDesign
          onPress={async () =>
            await filterPatients(search).then((patients) => {
              setData(patients);
            })
          }
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
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatList}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          marginTop: 5,
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
          name="pluscircle"
          size={50}
          color="green"
        />
      </View>

      {/* <Button title="Log out" onPress={logout} />
      <Button title="Go Back" onPress={() => navigation.navigate('Authentication')} /> */}
    </SafeAreaView>
  );
};

export { HomeScreen };
