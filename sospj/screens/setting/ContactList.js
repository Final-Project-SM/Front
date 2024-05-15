import React from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import styles from '../../styleFolder/ContactListStyles';

/**
 * @class ContactList
 * @extends React.Component
 * @description 연락처를 표시하고 검색하는 컴포넌트입니다.
 */
class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filteredContacts: [],
      searchText: '',
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: '이 앱은 연락처를 보려 합니다',
      }).then(this.getList);
    } else if (Platform.OS === 'ios') {
      this.getList();
    }
  }

  /**
   * @method getList
   * @description 기기에서 연락처 목록을 가져옵니다.
   */
  getList = () => {
    Contacts.getAll()
      .then(contacts => {
        this.setState({contacts, filteredContacts: contacts});
      })
      .catch(e => {
        console.log('접근할 수 없습니다');
      });
  };

  /**
   * @method handleSearch
   * @description 검색 텍스트를 기준으로 연락처를 필터링합니다.
   * @param {string} text - 검색 텍스트.
   */
  handleSearch = text => {
    const filteredContacts = this.state.contacts.filter(contact => {
      const contactName = `${contact.givenName} ${contact.familyName}`;
      return contactName.toLowerCase().includes(text.toLowerCase());
    });

    this.setState({searchText: text, filteredContacts});
  };

  /**
   * @method selectContact
   * @description 연락처를 선택하고 데이터를 부모 컴포넌트로 전달합니다.
   * @param {Object} contact - 선택된 연락처.
   */
  selectContact = contact => {
    const mobilePhone = contact.phoneNumbers.find(
      phone => phone.label.toLowerCase() === 'mobile',
    );
    const contactData = {
      name: `${contact.givenName} ${contact.familyName}`,
      phone: mobilePhone ? mobilePhone.number : '번호 없음',
    };
    this.props.onContactSelect(contactData);
  };

  /**
   * @method renderItem
   * @description 연락처 항목을 렌더링합니다.
   * @param {Object} item - 연락처 항목.
   * @returns {JSX.Element} 연락처 항목 컴포넌트.
   */
  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => this.selectContact(item)}>
      <Text style={styles.contactName}>
        이름: {`${item.givenName} ${item.familyName}`}
      </Text>
      {item.phoneNumbers
        .filter(phone => phone.label.toLowerCase() === 'mobile')
        .map((phone, index) => (
          <Text key={index} style={styles.phones}>
            번호: {phone.number}
          </Text>
        ))}
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: 'black'}}>연락처</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={this.handleSearch}
          value={this.state.searchText}
          placeholder="연락처 검색"
        />
        <FlatList
          data={this.state.filteredContacts}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default ContactList;
