import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const CaseStore = ({navigation}) => {
  const [cases, setCases] = useState([
    {
      id: '1',
      name: 'Elegant Blue Case',
      price: '19.99',
      imageUrl: 'https://example.com/image1.png',
    },
    {
      id: '2',
      name: 'Red Leather Case',
      price: '24.99',
      imageUrl: 'https://example.com/image2.png',
    },
    {
      id: '3',
      name: 'Black Silicon Case',
      price: '15.99',
      imageUrl: 'https://example.com/image3.png',
    },
    // 추가 제품 데이터는 여기에...
  ]);

  // 가상의 API로부터 케이스 데이터를 로드하는 함수
  const loadCases = async () => {
    // 데이터 로딩 로직 구현
    // 예: 서버에서 데이터를 fetch하는 코드
  };

  useEffect(() => {
    loadCases();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => console.log('Buy', item.name)}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cases}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  buyButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
  },
});

export default CaseStore;
