import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen, AuthenticationScreen, HomeScreen } from "@screens/index";

const Stack = createStackNavigator<RootStackParamList>();
export type RootStackParamList = {
    Authentication: undefined;
    Register: undefined;
    Loading: undefined;
    Home:  undefined;
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
            </Stack.Navigator>
        </NavigationContainer>
    );

}



