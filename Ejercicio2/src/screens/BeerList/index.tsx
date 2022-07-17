import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../redux/stores/hooks';
import {Beer} from '../../config/entity/beerType';
import {getBeerListAction} from '../../redux/actions/beerActions';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import logout from './logout.png';
import Item from './components/Item';
import CustomButton from '../../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type IindexProps = {
  route: RouteProp<any, any> | any;
  navigation: NavigationProp<ParamListBase>;
};

const BeerList: React.FC<IindexProps> = ({route, navigation}: IindexProps) => {
  const dispatch = useDispatch();
  const {beer: patient, loading, error} = useAppSelector(state => state.beer);
  const username = route.params.userEmail;

  useEffect(() => {
    dispatch(getBeerListAction(20));
  }, []);

  const chooseBeer = (value: Beer) => {
    navigation.navigate('BeerDetails', {
      patienDetails: value,
      userMail: username,
    });
    console.log('BEER=>', value.name);
    console.log('USERLIST!!!!', username);
  };
  const onPress = () => {
    dispatch(getBeerListAction(20));
  };
  const logOut = () => {
    auth().signOut();
    navigation.navigate('BeerLogin');
  };
  const renderItem = ({item}: ListRenderItemInfo<Beer>) => {
    return <Item key={item.id} item={item} onPress={chooseBeer} />;
  };

  if (error) {
    return (
      <View style={styles.containerDescription}>
        <Text style={styles.description}>
          An error occurred trying to get the information
        </Text>
        <CustomButton
          icon={'plus'}
          label="try again"
          onPress={onPress}
          disabled={loading}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperBar}>
        <Text>{username}</Text>
        <TouchableOpacity onPress={logOut}>
          <Image style={styles.imageStyle} source={logout} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>BEEEEEEEEEER</Text>
      <View>
        {loading && (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color={'#78ab78'} />
          </View>
        )}
        {patient.length ? (
          <FlatList
            data={patient}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.containerDescription}>
            <Text style={styles.description}>There is no beer</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperBar: {
    flexDirection: 'row',
    backgroundColor: '#78ab78',
    height: 50,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 20,
  },
  imageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 5,

    borderBottomWidth: 1,
  },
  containerDescription: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  description: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,

    borderBottomWidth: 1,
  },
});

export {BeerList};
