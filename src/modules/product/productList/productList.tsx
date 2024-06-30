import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {openUrl} from '../../../api/apiInstance';
import {getAuth} from '../../../storage/authStorage';
import LottieView from 'lottie-react-native';

export default function ProductList({navigation}) {
  const [user, setUser] = useState<string[]>([]);
  const [renderAnimation, setRenderAnimation] = useState<Boolean>(false);
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
        endpoint: `products/${user.organizationId}`,
      });

      if (!status) throw new Error('cannot get organization');

      setUser(data);
    } catch {
      console.log('erro');
    }
  };

  const renderIconSucess = () => {
    return (
      <LottieView
        source={require('../../../assets/sucess.json')}
        autoPlay={true}
        style={styles.iconSucess}
      />
    );
  };

  const deleteUser = async (productId: number) => {
    const {status} = await openUrl({
      method: 'delete',
      endpoint: `product/${productId}`,
    });

    if (!status) {
      Alert.alert('Vish', 'Usuario nao deletado');
      return;
    }

    setRenderAnimation(true);
    setTimeout(() => setRenderAnimation(false), 1900);
    await fetchData();
  };

  const handleDelete = async (productId: number, userName: string) => {
    if (!productId) return;

    Alert.alert(
      'Deletar Usuario',
      `Tem certeza que deseja delete o usuario ${userName}`,
      [
        {
          text: 'cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => deleteUser(productId),
        },
      ],
    );
  };

  const handleOpenUserModal = (
    productId: number,
    productName: string,
    productCode: string,
    productPrice: number,
    productQuantity: number,
  ) => {
    navigation.navigate('ProductModal', {
      productId,
      productName,
      productCode,
      productPrice,
      productQuantity,
    });
  };

  return (
    <View>
      <View style={styles.initialContainer}>
        <View style={styles.iconContainer}>
          <Icon onPress={goBack} name="arrow-left" size={25} color={'#fff'} />
        </View>
        <Text style={styles.initialText}>Consultar Produtos</Text>
      </View>
      {renderAnimation && renderIconSucess()}
      <ScrollView>
        {user.map(currentUser => {
          return (
            <TouchableOpacity style={styles.label} key={currentUser.productId}>
              <Text style={styles.textLabel}>{currentUser.productName}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleOpenUserModal(
                      currentUser.productId,
                      currentUser.productName,
                      currentUser.productCode,
                      currentUser.productPrice,
                      currentUser.productQuantity
                    )
                  }>
                  <Icon name="edit" size={30} color={'blue'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleDelete(currentUser.productId, currentUser.productName)
                  }>
                  <Icon name="trash" size={30} color={'red'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
