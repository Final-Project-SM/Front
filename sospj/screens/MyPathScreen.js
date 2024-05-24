import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import MapComponent from '../map/MapComponent2.js'; // MapComponent를 가져오기
import styles from '../styleFolder/MyPathScreenStyles.js'; // 새로운 스타일 파일 가져오기

import {userAxios} from '../API/requestNode.js';

/**
 * MyPathScreen 컴포넌트
 *
 * 사용자의 특정 날짜의 위치 데이터를 시각화하여 보여주는 화면 컴포넌트입니다.
 *
 * @component
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @param {object} props.route - 경로 객체, route.params에서 사용자 ID를 가져옵니다.
 * @returns {JSX.Element} MyPathScreen 컴포넌트
 */
const MyPathScreen = ({navigation, route}) => {
  const [dummyData, setDummyData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const {id} = route.params; // route.params에서 사용자 데이터를 가져옵니다.

  /**
   * 서버에서 사용자의 위치 데이터를 불러오는 함수
   *
   * @async
   * @function
   */
  const loadData = async () => {
    const data = await userAxios.ansimiHistory({id: id});
    console.log(data);
    setDummyData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * 날짜를 선택했을 때 호출되는 함수
   *
   * @param {object} day - 선택한 날짜 객체
   */
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  // 데이터가 있는 날짜를 빨간 점으로 표시하기 위해 markedDates 객체 생성
  const markedDates = dummyData.reduce((acc, day) => {
    acc[day.date] = {
      marked: true,
      dotColor: 'red',
    };
    if (day.date === selectedDate) {
      acc[day.date].selected = true;
      acc[day.date].selectedColor = 'blue';
    }
    return acc;
  }, {});

  /**
   * 선택한 날짜의 위치 데이터를 렌더링하는 함수
   *
   * @returns {JSX.Element} 선택한 날짜의 위치 데이터를 표시하는 JSX 요소
   */
  const renderLocations = () => {
    const dayData = dummyData.find(data => data.date === selectedDate);
    if (!dayData) {
      return (
        <Text style={styles.noDataText}>No data available for this date.</Text>
      );
    }
    return (
      <MapComponent
        x={dayData.locations[0].lat}
        y={dayData.locations[0].lon}
        markers={dayData.locations}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
      <View style={styles.mapContainer}>
        {selectedDate ? (
          renderLocations()
        ) : (
          <Text style={styles.noDataText}>Select a date to view locations</Text>
        )}
      </View>
    </View>
  );
};

export default MyPathScreen;
