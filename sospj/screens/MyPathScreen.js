import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import MapComponent from '../map/MapComponent2.js'; // MapComponent를 가져오기
import styles from '../styleFolder/MyPathScreenStyles.js'; // 새로운 스타일 파일 가져오기

const dummyData = [
  {
    date: '2024-05-01',
    locations: [
      {seq: 1, lat: 36.79973, lon: 127.0752},
      {seq: 2, lat: 36.811, lon: 127.0791},
      {seq: 3, lat: 36.8113, lon: 127.0793},
      {seq: 4, lat: 36.8116, lon: 127.0795},
      {seq: 5, lat: 36.8119, lon: 127.0798},
    ],
  },
  {
    date: '2024-05-02',
    locations: [
      {seq: 1, lat: 36.8106, lon: 127.0788},
      {seq: 2, lat: 36.8109, lon: 127.079},
      {seq: 3, lat: 36.8112, lon: 127.0792},
      {seq: 4, lat: 36.8114, lon: 127.0794},
      {seq: 5, lat: 36.8117, lon: 127.0797},
    ],
  },
  {
    date: '2024-05-03',
    locations: [
      {seq: 1, lat: 36.8108, lon: 127.0789},
      {seq: 2, lat: 36.8111, lon: 127.0791},
      {seq: 3, lat: 36.8114, lon: 127.0794},
      {seq: 4, lat: 36.8116, lon: 127.0796},
      {seq: 5, lat: 36.8119, lon: 127.0799},
    ],
  },
  {
    date: '2024-05-04',
    locations: [
      {seq: 1, lat: 36.8107, lon: 127.0788},
      {seq: 2, lat: 36.8109, lon: 127.079},
      {seq: 3, lat: 36.8112, lon: 127.0793},
      {seq: 4, lat: 36.8115, lon: 127.0795},
      {seq: 5, lat: 36.8118, lon: 127.0797},
    ],
  },
  {
    date: '2024-05-05',
    locations: [
      {seq: 1, lat: 36.8106, lon: 127.0789},
      {seq: 2, lat: 36.8109, lon: 127.0791},
      {seq: 3, lat: 36.8111, lon: 127.0793},
      {seq: 4, lat: 36.8113, lon: 127.0796},
      {seq: 5, lat: 36.8116, lon: 127.0798},
    ],
  },
  {
    date: '2024-05-06',
    locations: [
      {seq: 1, lat: 36.8107, lon: 127.0788},
      {seq: 2, lat: 36.811, lon: 127.079},
      {seq: 3, lat: 36.8112, lon: 127.0792},
      {seq: 4, lat: 36.8114, lon: 127.0794},
      {seq: 5, lat: 36.8117, lon: 127.0797},
    ],
  },
  {
    date: '2024-05-07',
    locations: [
      {seq: 1, lat: 36.8108, lon: 127.0789},
      {seq: 2, lat: 36.8111, lon: 127.0791},
      {seq: 3, lat: 36.8113, lon: 127.0793},
      {seq: 4, lat: 36.8116, lon: 127.0795},
      {seq: 5, lat: 36.8118, lon: 127.0798},
    ],
  },
];

const MyPathScreen = ({navigation, route}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const {id} = route.params; // route.params에서 사용자 데이터를 가져옵니다.

  useEffect(() => {
    if (id) {
      console.log('Selected id:', id);
      // 사용자 데이터 로깅
    }
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
