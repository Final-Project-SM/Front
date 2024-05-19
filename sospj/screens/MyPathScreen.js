import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import MapComponent from '../map/MapComponent2.js'; // MapComponent를 가져오기
import styles from '../styleFolder/MyPathScreenStyles.js'; // 새로운 스타일 파일 가져오기
import { userAxios } from '../API/requestNode.js';
;

const MyPathScreen = ({navigation, route}) => {
  const [dummyData,setDummyData] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);
  const {id} = route.params; // route.params에서 사용자 데이터를 가져옵니다.
  const loadData = async () => {
    const data = await userAxios.ansimiHistory({id:id})
    console.log(data)
    setDummyData(data)

  }
  useEffect(() => {
    loadData()
  }, []);

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
