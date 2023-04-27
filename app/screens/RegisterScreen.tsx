import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import FormField from '../components/FormField';
import { RegisterValidation } from './Validation';

import { styles } from "./styles";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'app/navigations/StackContainer';

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: AuthScreenNavigationProp;
};
interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = ({navigation}: Props) => {
    const handleRegistration = (values: FormValues) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(() => navigation.navigate('Home'))
      .catch(err => {
        switch(err.code){
          default:
            Alert.alert('Ocorreu um erro', err.code)
        }
      });
      
    };
    
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Registre-se</Text>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={handleRegistration}
            validationSchema={RegisterValidation}
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
                <FormField
                  label="Confirme a senha"
                  value={values.confirmPassword}
                  placeholder='Repita a senha'
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => handleBlur('confirmPassword')}
                  error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                  secureTextEntry
                />
                <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                  <Text style={styles.submitButtonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
      </View>
    );
};

export { RegisterScreen };