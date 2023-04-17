import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthenticationScreen} from "../screens/home/AuthenticationScreen";


const Stack = createStackNavigator();


export default function MainNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Authentication' component={AuthenticationScreen} 
                    options={{
                        title: "Authentication",
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );

}



