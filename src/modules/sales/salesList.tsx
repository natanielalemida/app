import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function SalesList({navigation}) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCreateSale = () => {
    navigation.navigate('CreateSale');
  };

  const handleCheckSales = () => {
    navigation.navigate('CheckSales')
  }

  return (
    <View style={styles.container}>
      <View style={styles.initialContainer}>
        <View style={styles.iconContainer}>
          <Icon
            onPress={handleGoBack}
            name="arrow-left"
            size={25}
            color={'#fff'}
          />
        </View>

        <Text style={styles.initialText}>Vendas</Text>
      </View>
      <TouchableOpacity style={styles.label} onPress={handleCreateSale}>
        <Text style={styles.textLabel}>Cadastrar venda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.label} onPress={handleCheckSales}>
        <Text style={styles.textLabel}>Consultar vendas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#D3D3D3', alignItems: 'flex-start'},
  initialContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    backgroundColor: '#084D6E',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  initialText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 22,
  },
  iconContainer: {
    width: '40%',
  },
  label: {
    width: '95%',
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    margin: 11,
    paddingLeft: 10,
    borderRadius: 5,
  },
  textLabel: {
    fontSize: 20,
    fontWeight: '900'
  }
});
