import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Home({navigation}) {
  const handleOpenUser = () => {
    navigation.navigate('UserIndex');
  };

  const handleOpenProducts = () => {
    navigation.navigate('ProductsIndex');
  };

  const handleOpenSales = () => {
    navigation.navigate('SalesList');
  };

  return (
    <View style={style.container}>
      <View style={style.initialContainer}>
        <Text style={style.initialText}>Tela inicial</Text>
      </View>
      <View style={style.saleContainer}>
        <Text style={style.salesTitle}>Vendas</Text>
        <View style={style.salesFilterContainer}>
          <TouchableOpacity style={style.salesFilterTextSelected}>
            <Text style={[style.textGeralConfig, style.textColorSelected]}>
              Hoje
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.salesFilterText}>
            <Text style={style.textGeralConfig}>7D</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.salesFilterText}>
            <Text style={style.textGeralConfig}>1M</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.salesFilterText}>
            <Text style={style.textGeralConfig}>6M</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.salesFilterText}>
            <Text style={style.textGeralConfig}>1A</Text>
          </TouchableOpacity>
        </View>
        <Text style={style.textSale}>R$ 120,00</Text>
        <Text style={style.salesMadeText}> 6 vendas realizadas</Text>
      </View>
      <View style={style.modulesInitialContainer}>
        <TouchableOpacity
          style={style.moduleContainer}
          onPress={handleOpenSales}>
          <Icon name="shopping-cart" size={50} color={'#000'} />
          <Text style={style.moduleText}>Caixa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.moduleContainer}
          onPress={handleOpenProducts}>
          <Icon name="archive" size={50} color={'#000'} />
          <Text style={style.moduleText}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.moduleContainer}
          onPress={handleOpenUser}>
          <Icon name="users" size={50} color={'#000'} />
          <Text style={style.moduleText}>Clientes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#D3D3D3', alignItems: 'center'},
  initialContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    backgroundColor: '#084D6E',
  },
  initialText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 22,
    paddingTop: 35,
  },
  saleContainer: {
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 20,
    padding: 15,
  },
  salesTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  salesFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  salesFilterTextSelected: {
    alignItems: 'center',
    backgroundColor: '#084D6E',
    paddingHorizontal: 20,
    height: 35,
    borderRadius: 5,
    paddingTop: 4,
  },
  salesFilterText: {
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingTop: 4,
  },
  textGeralConfig: {
    fontSize: 18,
    textAlign: 'center',
  },
  textColorSelected: {
    color: '#FFF',
  },
  textSale: {
    fontFamily: 'Roboto',
    fontSize: 45,
    color: 'black',
    fontWeight: 'bold',
  },
  salesMadeText: {
    fontSize: 18,
  },
  modulesInitialContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 21,
  },
  moduleContainer: {
    width: 180,
    height: 180,
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  moduleText: {
    fontSize: 20,
    fontWeight: 'black',
    textAlign: 'center',
  },
});
