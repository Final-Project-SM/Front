import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  Linking,
} from 'react-native';

const Setting = () => {
  const [isEnabledNotification, setIsEnabledNotification] = useState(false);
  const [isEnabledNightMode, setIsEnabledNightMode] = useState(false);

  const openLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Can't open URI: " + url);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        <View style={styles.itemContainer2}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/12328/12328821.png',
              }}
              style={styles.icon}
            />
            <Text style={styles.itemText}>미정</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabledNotification ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={newValue => setIsEnabledNotification(newValue)}
            value={isEnabledNotification}
          />
        </View>

        <View style={styles.itemContainer2}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/7531/7531649.png',
              }}
              style={styles.icon}
            />
            <Text style={styles.itemText}>미정</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabledNightMode ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={newValue => setIsEnabledNightMode(newValue)}
            value={isEnabledNightMode}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Options</Text>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => alert('Premium Service')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/4400/4400740.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.itemText}>프리미엄 서비스</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => alert('Help')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/4502/4502682.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.itemText}>도움말</Text>
        </TouchableOpacity>

        <View style={styles.itemContainer2}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/4262/4262486.png',
              }}
              style={styles.icon}
            />
            <Text style={styles.itemText}>문의하기</Text>
          </View>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={() => openLink('https://www.instagram.com/syong._.00')}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/2111/2111463.png',
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink('https://open.kakao.com/o/gRAbKbG')}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,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',
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => alert('Delete Account')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3683/3683211.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.itemText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', // Matching with the common color scheme
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold', // Section titles are bold for emphasis
    color: '#2E7D32', // Consistent dark green
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures components align properly
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333', // A soft gray for text
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});

export default Setting;
