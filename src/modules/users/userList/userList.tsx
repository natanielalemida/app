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

export default function UserList({navigation}) {
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
        endpoint: `customers/${user.organizationId}`,
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

  const deleteUser = async (userId: number) => {
    const {status} = await openUrl({
      method: 'delete',
      endpoint: `customers/${userId}`,
    });

    if (!status) {
      Alert.alert('Vish', 'Usuario nao deletado');
      return;
    }

    setRenderAnimation(true);
    setTimeout(() => setRenderAnimation(false), 1900);
    await fetchData();
  };

  const handleDelete = async (userId: number, userName: string) => {
    if (!userId) return;

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
          onPress: () => deleteUser(userId),
        },
      ],
    );
  };

  const handleOpenUserModal = (
    userId: number,
    userName: string,
    userCpf: string,
  ) => {
    navigation.navigate('AddUser', {
      userId,
      userName,
      userCpf,
    });
  };

  return (
    <View>
      <View style={styles.initialContainer}>
        <View style={styles.iconContainer}>
          <Icon onPress={goBack} name="arrow-left" size={25} color={'#fff'} />
        </View>
        <Text style={styles.initialText}>Consultar Usuario</Text>
      </View>
      {renderAnimation && renderIconSucess()}
      <ScrollView>
        {user.map(currentUser => {
          return (
            <TouchableOpacity style={styles.label}>
              <Text style={styles.textLabel}>{currentUser.customers_name}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleOpenUserModal(
                      currentUser.id_customers,
                      currentUser.customers_name,
                      currentUser.cpf,
                    )
                  }>
                  <Icon name="edit" size={30} color={'blue'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleDelete(
                      currentUser.id_customers,
                      currentUser.customers_name,
                    )
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
