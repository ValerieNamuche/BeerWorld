import React, {FC} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
import {useAppSelector} from '../../../../redux/stores/hooks';

//types
import {Beer} from '../../../../config/entity/beerType';

interface IProps {
  item: Beer;
  onPress: (value: Beer) => void;
}

const Item: FC<IProps> = ({item, onPress}: IProps) => {
  const {loading} = useAppSelector(state => state.beer);

  return (
    <View>
      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={() => onPress(item)}>
        <View style={styles.card}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={styles.item1}>
            <Image source={{uri: item.image_url}} style={styles.imageStyle} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 50,
    height: 200,
    resizeMode: 'contain',
  },
  card: {
    flex: 0.3,
    backgroundColor: '#78ab78',
    borderRadius: 15,
    paddingVertical: 20,
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  item1: {
    alignItems: 'center',
    width: '20%',
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
});

export default Item;
