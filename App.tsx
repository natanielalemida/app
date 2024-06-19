import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/pages/login/login';
import Home from './src/pages/home/home';
import usersIndex from './src/modules/users/usersIndex';
import AddUser from './src/modules/users/addUser/addUser';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserIndex"
          component={usersIndex}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
