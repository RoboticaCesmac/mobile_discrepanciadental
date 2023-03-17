import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Tela1Screen from '../screens/screen1';
import Tela2Screen from '../screens/screen2';
import LoginScreen from "../screens/login";


const Stack = createStackNavigator();


export default function MainNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Signin" component={LoginScreen} />
                <Stack.Screen name="screen2" component={Tela2Screen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

}



