import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

function HiddenKeywordSet({navigation}) {
  const [keywords, setKeywords] = useState(['']); // 처음에는 하나의 키워드 입력칸만

  // 새 키워드 입력 칸을 추가하는 함수
  const addKeywordInput = () => {
    if (keywords.length < 5) {
      setKeywords([...keywords, '']); // 새 입력 칸 추가
    }
  };

  // 키워드 입력 상태를 업데이트하는 함수
  const updateKeyword = (index, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  // 모든 키워드를 저장하는 함수 (실제 동작은 구현 필요)
  const saveKeywords = () => {
    console.log('저장된 키워드:', keywords);
    // 여기서 서버로 키워드를 전송하거나 로컬에 저장할 수 있습니다.
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>신고키워드 설정하기</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            음성 녹음을 통해 신고할 경우 사용자가 지정해 놓은 키워드를
            말함으로써 자연스럽게 신고가 가능합니다.(최대 5개)
          </Text>
          {keywords.map((keyword, index) => (
            <TextInput
              key={index}
              style={styles.input}
              onChangeText={text => updateKeyword(index, text)}
              value={keyword}
              placeholder={`키워드 ${index + 1}`}
            />
          ))}
          {keywords.length < 5 && (
            <TouchableOpacity
              style={styles.addbutton}
              onPress={addKeywordInput}>
              <Image
                style={styles.icon}
                source={require('../assets/images/plus2.png')} // '추가하기' 아이콘 URL
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={saveKeywords}>
        <Text style={styles.buttonText}>저장하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.closeButton]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>닫기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingBottom: 60, // 버튼 공간 확보
  },
  scrollView: {
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  descriptionBox: {
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: width - 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    width: '90%',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    bottom: 30,
    alignSelf: 'center',
  },
  addbutton: {
    minWidth: 300,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    bottom: 80, // 버튼의 위치 조정
  },
});

export default HiddenKeywordSet;
