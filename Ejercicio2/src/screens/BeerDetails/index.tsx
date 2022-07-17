import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import {useAppSelector} from '../../redux/stores/hooks';

import {getBeerDetails} from '../../redux/actions/beerActions';

import backArrow from './back-arrow.png';
import logout from '../BeerList/logout.png';


import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';

import {Beer} from '../../config/entity/beerType';
import {useDispatch} from 'react-redux';
import CustomAlert from '../../components/Alert';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

interface IProps {
  route: RouteProp<any, any> | any;
  navigation: NavigationProp<ParamListBase>;
}

const initial: Beer = {
  id: '',
  name: '',
  description: '',
  image_url: '',
  tagline: '',
  first_brewed: '',
  brewers_tips: '',
  abv: '',
};

const BeerDetails: React.FC<IProps> = ({route, navigation}: IProps) => {
  const dispatch = useDispatch();
  const {loading} = useAppSelector(state => state.beer);
  const {patienDetails} = route.params;
  const username = route.params.userMail;

  useEffect(() => {
    dispatch(getBeerDetails(patienDetails.id));
    console.log('BEERDETAIL=>>', patienDetails);
    console.log('USERDETAIL!!!!!', username);
  }, [patienDetails, dispatch]);

  const logOut = () => {
    auth().signOut();
    navigation.navigate('BeerLogin');
  };

  return (
    <SafeAreaView style={styles.container}>
        {loading && (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <View style={styles.upperBar}>
          <TouchableOpacity onPress={navigation.goBack} style={styles.row}>
          <Image source={backArrow} style={styles.iconStyle} />
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.textUser}> {username} </Text>
        <TouchableOpacity onPress={logOut}>
          <Image style={styles.iconStyle} source={logout} />
        </TouchableOpacity>
        </View>
        <Text style={styles.title}>{patienDetails.name}</Text>

        <View style={styles.card}>
          <Text style={styles.text}>
            First brewed: {patienDetails?.first_brewed}
          </Text>
          <Text style={styles.description}>Tags: {patienDetails?.tagline}</Text>
          <Text style={styles.description}>
            Alcohol by volume: {patienDetails?.abv}
          </Text>
          <Text style={styles.description}>
            Brewers Tips: {patienDetails?.brewers_tips}
          </Text>
          <Text style={styles.description}>
            Description: {patienDetails?.description}
          </Text>
          <View style={styles.beerPic}>
            <Image
              style={styles.imageStyle}
              source={{uri: patienDetails?.image_url}}
            />
          </View>
          <CustomAlert text="An error occurred trying to send the info, please try again" />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 50,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#78ab78',
  },
  upperBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 30,
    alignSelf: 'flex-end',
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 20,
    width: '90%',
    padding: 15,
  },
  beerPic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,

    borderBottomWidth: 1,
  },
  text: {
    fontSize: 14,
    paddingTop: 5,
    paddingLeft: 5,
  },
  textUser: {
    fontSize: 14,
    paddingTop: 6,
    paddingLeft: 120,
  },
  description: {
    fontSize: 12,
    padding: 2,
    textAlign: 'justify',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    top: 3,
    left: 3,
    position: 'absolute',
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    zIndex: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 20,
    marginTop: 5,
  },
  containerDescription: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    position: 'absolute',
  },
});

export default BeerDetails;
