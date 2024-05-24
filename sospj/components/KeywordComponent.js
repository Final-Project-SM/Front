import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../styleFolder/HiddenKeywordSetStyles'; // 새로운 스타일 파일 가져오기

/**
 * KeywordComponent 컴포넌트
 *
 * 사용자가 신고 키워드를 설정할 수 있는 인터페이스를 제공하는 컴포넌트입니다.
 * 최대 5개의 키워드를 추가할 수 있으며, 키워드를 저장하는 기능을 포함합니다.
 *
 * @component
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @returns {JSX.Element} KeywordComponent 컴포넌트
 */
const KeywordComponent = ({navigation}) => {
  const [keywords, setKeywords] = useState(['']); // 처음에는 하나의 키워드 입력 칸만

  /**
   * 새 키워드 입력 칸을 추가하는 함수
   *
   * 최대 5개의 키워드를 추가할 수 있습니다.
   */
  const addKeywordInput = () => {
    if (keywords.length < 5) {
      setKeywords([...keywords, '']); // 새 입력 칸 추가
    }
  };

  /**
   * 키워드 입력 상태를 업데이트하는 함수
   *
   * @param {number} index - 업데이트할 키워드의 인덱스
   * @param {string} value - 새로운 키워드 값
   */
  const updateKeyword = (index, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  /**
   * 모든 키워드를 저장하는 함수
   *
   * 실제 동작은 구현 필요
   */
  const saveKeywords = () => {
    console.log('저장된 키워드:', keywords);
    // 여기서 서버로 키워드를 전송하거나 로컬에 저장할 수 있습니다.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>신고키워드 설정하기</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          음성 녹음을 통해 신고할 경우 사용자가 지정해 놓은 키워드를 말함으로써
          자연스럽게 신고가 가능합니다.(최대 5개)
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
          <TouchableOpacity style={styles.addbutton} onPress={addKeywordInput}>
            <Image
              style={styles.icon}
              source={require('../assets/images/plus2.png')} // '추가하기' 아이콘 URL
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={saveKeywords}>
        <Text style={styles.buttonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KeywordComponent;
