import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import FormField from '@components/FormField';
import { AuthValidation } from './Validation';

import { styles } from "./styles";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigations/StackContainer';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: AuthScreenNavigationProp;
};
interface FormValues {
  email: string;
  password: string;
}

const AuthenticationScreen = ({navigation}: Props) => {
    const handleAuth = (values: FormValues) => {
        Alert.alert('Logged successfully', JSON.stringify(values))
        console.log(JSON.stringify(values));
        navigation.navigate('Home');
    };
    
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Seja bem vindo</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleAuth}
            validationSchema={AuthValidation}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                <FormField
                  label="Email"
                  value={values.email}
                  placeholder='Digite seu e-mail'
                  onChangeText={handleChange('email')}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <FormField
                  label="Senha"
                  value={values.password}
                  placeholder='Digite uma senha'
                  onChangeText={handleChange('password')}
                  onBlur={() => handleBlur('password')}
                  error={touched.password && errors.password ? errors.password : undefined}
                  secureTextEntry
                />
                <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                  <Text style={styles.submitButtonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={{position: 'absolute', bottom: 30}}>
            <Text>Novo Usuário?
              <Text 
                onPress={() => {
                  navigation.navigate('Home');
                }}> Cadastre-se
              </Text>
            </Text>
          </View>
      </View>
    );
};

export { AuthenticationScreen };