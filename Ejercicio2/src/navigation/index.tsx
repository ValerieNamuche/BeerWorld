import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BeerList} from '../screens/BeerList';
import BeerDetails from '../screens/BeerDetails';
import BeerLogin from '../screens/BeerLogin';
import auth from '@react-native-firebase/auth';

export type MainStackParamList = {
  BeerList: undefined;
  BeerDetails: undefined;
  BeerLogin: undefined;
};

export default function Screens() {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  const noHeaderConfig = {
    header: () => null,
  };
  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authenticated ? 'BeerList' : 'BeerLogin'}>
        <Stack.Screen
          name="BeerList"
          component={BeerList}
          options={{
            ...noHeaderConfig,
          }}
        />
        <Stack.Screen
          name="BeerDetails"
          component={BeerDetails}
          options={{
            ...noHeaderConfig,
          }}
        />
        <Stack.Screen
          name="BeerLogin"
          component={BeerLogin}
          options={{
            ...noHeaderConfig,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
