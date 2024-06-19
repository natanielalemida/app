import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {HomeScreenNavigationProp} from './types/types';

export default function Login({navigation}: HomeScreenNavigationProp) {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const handleVerifyLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View>
        <LottieView
          source={require('../../assets/loginAnimation.json')}
          autoPlay={true}
          style={styles.iconContainer}
        />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Bem vindo ao PDV</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.labelLogin}>Username ou email</Text>
        <TextInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.labelLogin}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.button} onPress={handleVerifyLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    paddingBottom: 50,
  },
  iconContainer: {
    height: 300,
    width: 300,
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  labelLogin: {
    fontSize: 18,
    fontWeight: '900',
  },
  loginContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingBottom: 15,
  },
  input: {
    width: '95%',
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '95%',
    alignItems: 'center',
    height: 60,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 3,
  },
});
