import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from '../styleFolder/HiddenKeywordSetStyles'; // 새로운 스타일 파일 가져오기
import {useUser} from '../components/public/UserContext';
import {userAxios} from '../API/requestNode';

/**
 * HiddenKeywordSet 컴포넌트
 *
 * 사용자가 키워드를 설정하고 관리할 수 있는 화면을 렌더링하는 컴포넌트입니다.
 *
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.navigation - 네비게이션 객체
 * @returns {JSX.Element} HiddenKeywordSet 컴포넌트
 */
const HiddenKeywordSet = ({navigation}) => {
  const [keywords, setKeywords] = useState(['']); // 처음에는 하나의 키워드 입력칸만
  const {user, setUser} = useUser();

  /**
   * 사용자 키워드 데이터를 서버로부터 불러오는 함수
   *
   * @async
   * @function
   */
  const loadData = async () => {
    const data = await userAxios.keywordList({id: user.id});
    if (data.sc === 200) {
      setKeywords(data.keyword);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * 새 키워드 입력 칸을 추가하는 함수
   *
   * @function
   */
  const addKeywordInput = () => {
    if (keywords.length < 5) {
      setKeywords([...keywords, '']); // 새 입력 칸 추가
    }
  };

  /**
   * 키워드 입력 상태를 업데이트하는 함수
   *
   * @function
   * @param {number} index - 업데이트할 키워드의 인덱스
   * @param {string} value - 업데이트할 키워드의 새로운 값
   */
  const updateKeyword = (index, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  /**
   * 모든 키워드를 저장하는 함수
   *
   * @function
   */
  const saveKeywords = () => {
    console.log('저장된 키워드:', keywords);
    userAxios.keyword({id: user.id, keyword: keywords});
    navigation.goBack();
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
};

export default HiddenKeywordSet;
