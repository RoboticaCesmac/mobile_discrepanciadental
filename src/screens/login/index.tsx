import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigations';



export default function TelaLogin() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


  const logar = async () => {
        navigation.navigate("home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <Image source={require("../../../assets/logo.png")}></Image>
      <Text style={styles.title}>Discrepância Dental</Text>
      
        <View style={styles.formContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => logar()}
          >
            <Text style={styles.submitButtonText}>Iniciar</Text>
          </TouchableOpacity>
        </View>

    </ScrollView>
  );
};

export { TelaLogin };
