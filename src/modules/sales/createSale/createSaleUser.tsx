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
import {useRoute} from '@react-navigation/native';

export default function CreateSaleUser({navigation}) {
  const route = useRoute();
  const params = route.params || {};

  const {selectedsProducst} = params;

  const [user, setUser] = useState<string[]>([]);
  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAuth();
      const user = JSON.parse(result as string);
      const {status, data} = await openUrl({
        method: 'get',
        endpoint: `customers/${user.organizationId}`,
      });

      if (!status) throw new Error('cannot get organization');

      setUser(data);
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

  const handleCupomTickt = async (userId?: number, userName?: string) => {
    const result = await getAuth();
    const user = JSON.parse(result as string);
    navigation.navigate('TicketSale', {
      organizationId: user.organizationId,
      saleTypeId: 1,
      soldBy: {userId: user.idEmployee, name: user.employeeName},
      user: {userId, userName},
      amount: totalValue,
      createdAt: new Date(),
      products: selectedsProducst,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#D3D3D3'}}>
      <View style={styles.initialContainer}>
        <View>
          <Icon onPress={goBack} name="arrow-left" size={25} color={'#fff'} />
        </View>
        <Text style={styles.initialText}>Selecione Cliente</Text>
        <View>
          <Icon
            onPress={() => handleCupomTickt()}
            name="check-circle"
            size={25}
            color={'#fff'}
          />
        </View>
      </View>
      <ScrollView>
        {user.map(currentUser => {
          return (
            <TouchableOpacity
              style={styles.label}
              onPress={() => handleCupomTickt(currentUser.id_customers, currentUser.customers_name)}>
              <Text style={styles.textLabel}>{currentUser.customers_name}</Text>
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
    justifyContent: 'space-between',
    backgroundColor: '#084D6E',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  initialText: {
    color: '#FFF',
    fontSize: 22,
  },
  iconContainer: {
    width: '30%',
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
  iconSucess: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 270,
    marginLeft: 150,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
});
