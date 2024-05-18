import React, {memo, useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {REACT_APP_KAKKO_KEY} from '@env'; // 환경 변수에서 카카오 API 키 가져오기
import Geolocation from 'react-native-geolocation-service';

const MapComponent2 = ({x, y, markers}) => {
  const [currentLocation, setCurrentLocation] = useState({x, y});

  const onMessage = event => {
    const {data} = event.nativeEvent;
    const message = JSON.parse(data);

    if (message.type === 'zoom_changed') {
      setZoomLevel(message.zoomLevel);
    }
  };

  const updateLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          x: position.coords.latitude,
          y: position.coords.longitude,
        });
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const createPolylineScript = () => {
    const linePath = markers
      .map(marker => `new kakao.maps.LatLng(${marker.lat}, ${marker.lon})`)
      .join(',');

    const markersScript = markers
      .map(
        marker => `
        var markerPosition = new kakao.maps.LatLng(${marker.lat}, ${marker.lon});
        var marker = new kakao.maps.Marker({
          position: markerPosition,
          image: new kakao.maps.MarkerImage(
            'https://cdn-icons-png.flaticon.com/128/190/190411.png',
            new kakao.maps.Size(24, 35)
          )
        });
        marker.setMap(map);
      `,
      )
      .join('');

    return `
      var linePath = [${linePath}];

      var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#FF0000',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
      });

      polyline.setMap(map);

      ${markersScript}
    `;
  };

  const mapHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Kakao Maps in React Native</title>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_KAKKO_KEY}&libraries=services"></script>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        #map {
          width: 100%;
          height: 100%;
        }
      </style>
    </head> 
    <body>
      <div id="map"></div>
      <script>
        var mapContainer = document.getElementById('map'), 
            mapOption = { 
              center: new kakao.maps.LatLng(${x}, ${y}), 
              level: 3 
            };

        var map = new kakao.maps.Map(mapContainer, mapOption);

        ${createPolylineScript()}
      </script>
    </body>
  </html>`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{html: mapHtml}}
        style={styles.webview}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      <TouchableOpacity onPress={updateLocation} style={styles.updateButton}>
        <Image
          source={require('../assets/images/gps.png')}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  webview: {
    width: Dimensions.get('window').width,
    height: 400, // 고정된 높이로 설정
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    width: 35,
    height: 35,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    left: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 25,
    height: 25,
  },
});

export default memo(MapComponent2);
