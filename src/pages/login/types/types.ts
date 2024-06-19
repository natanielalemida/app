import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type HomeScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type HomeScreenNavigationProp = {
  navigation: HomeScreenNavigation;
};
