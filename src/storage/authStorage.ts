import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setAuth(value: string) {
  await AsyncStorage.setItem('auth', value);
}

export async function getAuth(): Promise<string | null> {
  return await AsyncStorage.getItem('auth');
}
