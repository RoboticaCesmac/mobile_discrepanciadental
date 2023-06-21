import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "app/navigations/StackContainer";
import { View } from "react-native";
import { useState } from "react";

import { auth } from '@config/firebase';

import { HomeScreen } from "./HomeScreen";
import { AuthenticationScreen } from "./AuthenticationScreen";

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: AuthScreenNavigationProp;
};

const LoadingScreen = ({navigation}: Props) => {
    const [loggedIn, setLoggedIn] = useState(false);

    auth.onAuthStateChanged((user) =>{
        if(user){
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    const getScreen = () => {
        if (loggedIn) return <HomeScreen navigation={navigation} />;
        return <AuthenticationScreen navigation={navigation} />;
      };
    
    return <View style={{ flex: 1 }}>{getScreen()}</View>;
    
}

export { LoadingScreen };