import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';

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
        message: 'This app would like to see your contacts',
      }).then(this.getList);
    } else if (Platform.OS === 'ios') {
      this.getList();
    }
  }

  getList = () => {
    Contacts.getAll()
      .then(contacts => {
        this.setState({contacts, filteredContacts: contacts});
      })
      .catch(e => {
        console.log('cannot access');
      });
  };

  handleSearch = text => {
    const filteredContacts = this.state.contacts.filter(contact => {
      const contactName = `${contact.givenName} ${contact.familyName}`;
      return contactName.toLowerCase().includes(text.toLowerCase());
    });

    this.setState({searchText: text, filteredContacts});
  };

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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    // borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    margin: 10,
    borderTopWidth: 1,
    borderColor: '#212121',
  },
  contactName: {
    fontSize: 16,
    color: 'blue',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  phones: {
    color: 'gray',
    fontSize: 14,
  },
});

export default ContactList;
