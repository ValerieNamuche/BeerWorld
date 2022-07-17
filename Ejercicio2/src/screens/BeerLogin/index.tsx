import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Cheers from './cheers-beer.png';
import auth from '@react-native-firebase/auth';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const BeerLogin: React.FC<Props> = ({navigation}: Props) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const signin = (email: string, pass: string) => {
    try {
      auth().signInWithEmailAndPassword(email, pass);
      navigation.navigate('BeerList', {userEmail: email});
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewColumn}>
        <Text style={styles.title}> Welcome to BeerWorld </Text>
        <TextInput
          style={styles.textInput}
          placeholder="user"
          value={user}
          onChangeText={text => setUser(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="passworld"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.loginButton}>
          <Button
            title={'Login'}
            color="#ded145"
            onPress={() => signin(user, password)}
          />
        </View>
      </View>
      <View style={styles.cheersRow}>
        <Image style={styles.cheerImg} source={Cheers} />
        <Image style={styles.cheerImgIn} source={Cheers} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  viewColumn: {
    flexDirection: 'column',
    backgroundColor: '#78ab78',
    height: '45%',
    width: '80%',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    height: 40,
  },
  loginButton: {
    width: '40%',
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: 'yellow',
  },
  cheersRow: {
    marginTop: 50,
    flexDirection: 'row',
  },
  cheerImg: {
    height: 100,
    width: 100,
  },
  cheerImgIn: {
    height: 100,
    width: 100,
    transform: [{rotateY: '180deg'}],
  },
});
export default BeerLogin;
