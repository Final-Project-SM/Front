import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
  Button,
} from 'react-native';

const Setting = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleModalToggle = (content = '') => {
    setModalContent(content);
    setModalVisible(!modalVisible);
  };

  const [isEnabledNotification, setIsEnabledNotification] = useState(false);
  const [isEnabledNightMode, setIsEnabledNightMode] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/12328/12328821.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.itemText}>알림 받기</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabledNotification ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={newValue => setIsEnabledNotification(newValue)}
          value={isEnabledNotification}
        />
      </View>

      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/7531/7531649.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.itemText}>밤에 알림 받기</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabledNightMode ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={newValue => setIsEnabledNightMode(newValue)}
          value={isEnabledNightMode}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleModalToggle()}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>hello</Text>
            <Button title="닫기" onPress={() => handleModalToggle()} />
          </View>
        </View>
      </Modal>
      {/* 프리미엄서비스 */}
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleModalToggle(title)}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/4400/4400740.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.itemText}>프리미엄 서비스</Text>
      </TouchableOpacity>

      {/* 도움말 */}
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleModalToggle(title)}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/4502/4502682.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.itemText}>도움말</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleModalToggle(title)}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/4262/4262486.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.itemText}>문의하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleModalToggle(title)}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/3683/3683211.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.itemText}>계정삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Setting;
