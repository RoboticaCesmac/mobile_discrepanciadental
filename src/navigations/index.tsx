import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/login";


const Stack = createStackNavigator();


export default function MainNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Entrar' component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

}



