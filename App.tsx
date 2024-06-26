import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/pages/login/login';
import Home from './src/pages/home/home';
import usersIndex from './src/modules/users/usersIndex';
import AddUser from './src/modules/users/addUser/addUser';
import UserList from './src/modules/users/userList/userList';
import ProductsIndex from './src/modules/product/productsIndex';
import ProductList from './src/modules/product/productList/productList';
import ProductModal from './src/modules/product/productModal/productModal';
import SalesList from './src/modules/sales/salesList';
import CreateSale from './src/modules/sales/createSale/createSale';
import CreateSaleUser from './src/modules/sales/createSale/createSaleUser';
import TicketSale from './src/modules/sales/createSale/ticketSale';
import CheckSales from './src/modules/sales/checkSales/checkSales';

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
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductsIndex"
          component={ProductsIndex}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductModal"
          component={ProductModal}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SalesList"
          component={SalesList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateSale"
          component={CreateSale}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddUserSale"
          component={CreateSaleUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TicketSale"
          component={TicketSale}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckSales"
          component={CheckSales}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
