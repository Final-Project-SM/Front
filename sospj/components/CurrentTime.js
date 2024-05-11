import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString(); // 시간을 HH:MM:SS 형태로 포맷
      setCurrentTime(timeString);
    }, 1000); // 1초마다 시간 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CurrentTime;
