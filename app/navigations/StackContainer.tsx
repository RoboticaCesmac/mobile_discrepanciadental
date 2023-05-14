import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterPatientScreen } from '@screens/RegisterPatient/RegisterPatientScreen';
import { RegisterScreen } from '@screens/RegisterScreen';
import { LoadingScreen, AuthenticationScreen, HomeScreen } from "@screens/index";

const Stack = createStackNavigator<RootStackParamList>();
export type RootStackParamList = {
    Authentication: undefined;
    Register: undefined;
    Loading: undefined;
    Home:  undefined;
    RegisterPatient:  undefined;
};

export default function MainNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name='Loading' 
                    component={LoadingScreen} 
                    options={{
                        title: "Loading",
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name='Register' 
                    component={RegisterScreen} 
                    options={{
                        title: "Register",
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name='Authentication' 
                    component={AuthenticationScreen} 
                    options={{
                        title: "Authentication",
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name='Home' 
                    component={HomeScreen} 
                    options={{
                        title: "Home",
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='RegisterPatient'
                    component={RegisterPatientScreen}
                    options={{
                        title: "Cadastrar Paciente",
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );

}



