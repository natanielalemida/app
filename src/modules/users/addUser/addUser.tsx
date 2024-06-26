import React, {useState} from 'react';
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

export default function AddUser({navigation}) {
  const route = useRoute();
  const params = route.params || {};

  const {userId, userName, userCpf} = params;

  const [renderAnimation, setRenderAnimation] = useState<Boolean>(false);
  const [name, setName] = useState<string | undefined>(userName);
  const [cpf, setCpf] = useState<string | undefined>(userCpf);

  const handleGoBack = () => {
    navigation.pop(1);
  };

  const goBack = () => {
    const userPop = userId ? 2 : 1;
    setName('');
    setRenderAnimation(false), navigation.pop(userPop);
  };

  const verify = async () => {
    if (name || cpf) {
      const user = await getAuth();
      const result = JSON.parse(user as string);
      const {status} = await openUrl({
        endpoint: userId ? 'customers' : 'customers',
        method: userId ? 'put' : 'post',
        data: {
          customersId: userId,
          organizationId: result.organizationId,
          custurmesName: name,
          cpf,
        },
      });

      if (!status) return;

      setRenderAnimation(true);
      setTimeout(() => goBack(), 1900);
      return;
    }
    Alert.alert('Erro', 'Por favor, digite um nome de usuario');
  };

  const handleRenderAnimation = () => {
    verify();
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
        <Text style={styles.initialText}>
          {userId ? 'Editar Usuario' : 'Cadastrar Usuario'}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.secondFormContainer}>
          <View style={styles.addUserContainer}>
            <Text style={styles.addUserText}>Nome Completo</Text>
            <TextInput
              placeholder="Digite aqui"
              value={name}
              onChangeText={setName}
              style={styles.label}
            />
            <Text style={styles.addUserText}>CPF</Text>
            <TextInput
              placeholder="Digite o CPF"
              value={cpf}
              onChangeText={setCpf}
              style={styles.label}
            />
          </View>
        </View>
        {renderAnimation && renderIconSucess()}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleRenderAnimation}>
            <Text style={styles.textButton}>Enviar</Text>
          </TouchableOpacity>
        </View>
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
  iconContainer: {
    width: '30%',
  },
  label: {
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    width: '100%',
    marginTop: 8,
    paddingLeft: 10,
    fontSize: 18,
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
