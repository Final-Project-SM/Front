import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useUser} from '../components/public/UserContext';
import {userAxios} from '../API/requestNode';

/**
 * WhoRegister 컴포넌트
 *
 * 나를 등록한 사용자들의 목록을 보여주는 화면 컴포넌트입니다.
 *
 * @component
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @returns {JSX.Element} WhoRegister 컴포넌트
 */
const WhoRegister = ({navigation}) => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const {user, setUser} = useUser();

  /**
   * 서버에서 나를 등록한 사용자들의 목록을 불러오는 함수
   *
   * @async
   * @function
   */
  const loadData = async () => {
    const data = await userAxios.followerList({id: user.id});
    setRegisteredUsers(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * 목록 아이템을 렌더링하는 함수
   *
   * @param {object} item - 사용자 정보 객체
   * @returns {JSX.Element} - 사용자 정보를 표시하는 TouchableOpacity 컴포넌트
   */
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
