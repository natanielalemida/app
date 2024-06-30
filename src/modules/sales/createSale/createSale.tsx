import React, {useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {openUrl} from '../../../api/apiInstance';
import {getAuth} from '../../../storage/authStorage';
import {Alert} from 'react-native';

export default function CreateSale({navigation}) {
  const [products, setProducts] = useState([]);
  const [selectedsProducst, setSelectedsProducts] = useState([]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddUser = () => {
    if (!selectedsProducst.length) {
      Alert.alert('Eitaa', 'Por favor, adicione um produto a sua sacola');
      return;
    }
    navigation.navigate('AddUserSale', {selectedsProducst});
  };

  const fetchData = async () => {
    try {
      const result = await getAuth();
      const user = JSON.parse(result as string);
      const {status, data} = await openUrl({
        method: 'get',
        endpoint: `products/${user.organizationId}`,
      });

      if (!status) throw new Error('cannot get organization');

      setProducts(data);
    } catch {
      console.log('erro');
    }
  };

  const totalValue = useMemo(() => {
    let valor = 0;

    selectedsProducst.forEach(element => {
      valor = valor + element.productPrice;
    });

    return valor;
  });

  const handleAddProducts = product => {
    setSelectedsProducts(prevent => [...prevent, product]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.initialContainer}>
        <View>
          <Icon
            onPress={handleGoBack}
            name="arrow-left"
            size={25}
            color={'#fff'}
          />
        </View>
        <Text style={styles.initialText}>Selecione Produto</Text>
        <View>
          <Icon
            onPress={handleAddUser}
            name="check-circle"
            size={25}
            color={'#fff'}
          />
        </View>
      </View>

      <ScrollView>
        {products.map(currentUser => {
          return (
            <TouchableOpacity
              style={styles.label}
              key={currentUser.productId}
              onPress={() => handleAddProducts(currentUser)}>
              <Text style={styles.textLabel}>{currentUser.productName}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity>
                  <Icon name="edit" size={30} color={'blue'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#084D6E',
          flexDirection: 'row',
          width: '100%',
          height: 70,
          paddingHorizontal: 10,
        }}>
        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Text style={styles.initialText}>Valor total</Text>
          <Text style={styles.initialText}>
            R$ {totalValue.toFixed(2)} / {selectedsProducst.length}
          </Text>
        </View>
        <TouchableOpacity style={{backgroundColor: 'red'}}>
          <Text style={styles.initialText}>Ver itens</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  initialText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 22,
  },
  label: {
    width: '95%',
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 11,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textLabel: {
    fontSize: 20,
    fontWeight: '900',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
});
