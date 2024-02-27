import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
} from 'react-native';

import Contacts from 'react-native-contacts';

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
  },
  contactName: {
    fontSize: 16,
  },
  phones: {
    color: 'blue',
  },
});

const handleCall = phoneNumber => {
  console.log(phoneNumber);
  const url = `tel:${phoneNumber}`;
  Linking.openURL(url);
};

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: ' This app would like to see your contacts',
      }).then(() => {
        this.getList();
      });
    } else if (Platform.OS === 'ios') {
      this.getList();
    }
  }

  getList = () => {
    Contacts.getAll()
      .then(contacts => {
        this.setState({contacts});
      })
      .catch(e => {
        console.log('cannot access');
      });
  };

  renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          handleCall(item.phoneNumbers[0].number);
        }}>
        <Text style={styles.contactName}>
          Name: {`${item.givenName} `} {item.familyName}
        </Text>
        {item.phoneNumbers.map(phone => (
          <Text style={styles.phones}>{phone.number}</Text>
        ))}
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.contacts}
          renderItem={this.renderItem}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default ContactList;
