import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaLogin from "../src/screens/login";
import TelaHome from "../src/screens/home";
import TelaCadastrarPaciente from "../src/screens/cadastrar-paciente";
import { TelaVisualizarPaciente } from "../src/screens/visualizar-paciente";
import TelaCadastrarResultado from "../src/screens/cadastrar-resultado";
import TelaCadastro from "../src/screens/cadastro";

const Stack = createStackNavigator();

export type RootStackParamList = {
  login: undefined,
  cadastro: undefined,
  home: undefined,
  visualizarpaciente: {id: any},
  cadastrarpaciente: undefined,
  cadastrarresultado: {id:any},
};

export const NavegacaoPrincipal = () => (
  <NavigationContainer >
    <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        component={TelaLogin}
      />
      <Stack.Screen
        name="home"
        component={TelaHome}
      />
      <Stack.Screen
        name="cadastrarpaciente"
        component={TelaCadastrarPaciente}
      />
      <Stack.Screen
        name="visualizarpaciente"
        component={TelaVisualizarPaciente}
      />
      <Stack.Screen
        name="cadastrarresultado"
        component={TelaCadastrarResultado}
      />
     
    </Stack.Navigator>
  </NavigationContainer>
);