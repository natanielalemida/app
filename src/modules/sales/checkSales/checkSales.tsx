import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import {openUrl} from '../../../api/apiInstance';
import {getAuth} from '../../../storage/authStorage';
import {useRoute} from '@react-navigation/native';

export default function CheckSales({navigation}) {
  const [sales, setSales] = useState([]);
  const route = useRoute();
  const params = route.params || {};

  const {} = params;

  const goBack = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    try {
      const result = await getAuth();
      const user = JSON.parse(result as string);
      const {status, data} = await openUrl({
        method: 'get',
        endpoint: `sales/${user.organizationId}`,
      });

      if (!status) throw new Error('cannot get organization');

      setSales(data);
    } catch {
      console.log('erro');
    }
  };

  const handleCupomTickt = async (amount: number, products, saleId: number) => {
    const result = await getAuth();
    const user = JSON.parse(result as string);
    navigation.navigate('TicketSale', {
      saleId,
      organizationId: user.organizationId,
      saleTypeId: 1,
      soldBy: {userId: user.idEmployee, name: user.employeeName},
      user: undefined,
      amount: amount,
      products: products,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.initialContainer}>
        <View style={styles.iconContainer}>
          <Icon onPress={goBack} name="arrow-left" size={25} color={'#fff'} />
        </View>
        <Text style={styles.initialText}> Consultar Vendas </Text>
      </View>
      <View style={styles.formContainer}>
        {sales.map(venda => {
          console.log(venda);
          return (
            <TouchableOpacity
              style={styles.label}
              onPress={() =>
                handleCupomTickt(venda.amount, venda.products, venda.saleId)
              }>
              <View>
                <Text>Id</Text>
                <Text style={styles.saleTypeText}>{venda.saleId}</Text>
              </View>
              <View>
                <Text>Valor total</Text>
                <Text style={styles.saleTypeText}>{venda.amount}</Text>
              </View>
              <View>
                <Text>Forma PGT</Text>
                <Text style={styles.saleTypeText}>{venda.saleTypeName}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  initialText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 22,
  },
  saleTypeText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
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
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addUserContainer: {
    padding: 10,
  },
  addUserText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {width: '100%', height: '100%'},
  secondFormContainer: {height: '80%', justifyContent: 'space-between'},
  buttonContainer: {
    backgroundColor: '#28a745',
    width: '60%',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  iconSucess: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 270,
    marginLeft: 150,
  },
});
