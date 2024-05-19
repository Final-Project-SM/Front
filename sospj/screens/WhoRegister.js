import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import { useUser } from '../components/public/UserContext';
import { userAxios } from '../API/requestNode';
const dummyData = [
  {id: 1, name: 'John Doe', phone: '010-1234-5678'},
  {id: 2, name: 'Jane Smith', phone: '010-2345-6789'},
  {id: 3, name: 'Alice Johnson', phone: '010-3456-7890'},
  {id: 4, name: 'Robert Brown', phone: '010-4567-8901'},
  {id: 5, name: 'Emily Davis', phone: '010-5678-9012'},
  {id: 6, name: 'Michael Wilson', phone: '010-6789-0123'},
  {id: 7, name: 'Sarah Taylor', phone: '010-7890-1234'},
  {id: 8, name: 'David Moore', phone: '010-8901-2345'},
  {id: 9, name: 'Laura White', phone: '010-9012-3456'},
  {id: 10, name: 'Daniel Harris', phone: '010-0123-4567'},
];

const WhoRegister = ({navigation}) => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const {user,setUser} = useUser()
  const loadData = async () => {
    const data = await userAxios.followerList({id:user.id})
    setRegisteredUsers(data)
  }
  useEffect(() => {
    // 더미 데이터를 상태에 설정
    loadData()
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('MyPathScreen', {id: item.id})}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.phoneText}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={registeredUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#f8f8f8',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});

export default WhoRegister;
