import React, {memo, useState, useEffect, useRef} from 'react';
import { StyleSheet, Dimensions, View, Text,TouchableOpacity, Image  } from 'react-native';
import { WebView } from 'react-native-webview';
import { REACT_APP_KAKKO_KEY } from '@env'; // 환경 변수에서 카카오 API 키 가져오기
import Geolocation from "react-native-geolocation-service"

const MapComponent = ({ x, y, markers, currentX, currentY, category }) => {
  const [zoomLevel, setZoomLevel] = useState(3); // 초기 Zoom Level을 3으로 설정
  const [currentLocation, setCurrentLocation] = useState({ x, y });
  
   // WebView로부터 메시지를 받았을 때의 핸들러
   const onMessage = (event) => {
    const { data } = event.nativeEvent;
    const message = JSON.parse(data); 
    
    if (message.type === 'zoom_changed') {
      setZoomLevel(message.zoomLevel);
    }
  };

  useEffect(() => {
    updateLocation(); // 컴포넌트가 마운트될 때 위치 갱신
  }, []);

  // 하버사인 거리 계산 함수를 문자열로 정의합니다. 유클리드 계산법은 정확하지 않음
  // 이 함수는 지도 스크립트 내에서 사용됩니다.
  const haversineDistance = `
  function haversineDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // 지구의 반지름(km)
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c;
  }
  function toRad(Value) {
      return Value * Math.PI / 180;
  }`;

  // 사용자 지정 마커를 추가하는 함수입니다.
  // 특정 위치에 이미지를 사용한 마커를 표시합니다.
  const createMarkerScript2 = (position, imageUrl, imageSize) => `
      var markerPosition = new kakao.maps.LatLng(${position.lat}, ${position.lng});
      var markerImage = new kakao.maps.MarkerImage('${imageUrl}', new kakao.maps.Size(${imageSize.width}, ${imageSize.height}));
      var marker = new kakao.maps.Marker({ position: markerPosition, image: markerImage });
      marker.setMap(map);`;

 // 위치 갱신 버튼의 핸들러
 const updateLocation = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      setCurrentLocation({
        x: position.coords.latitude,
        y: position.coords.longitude
      });
    },
    (error) => {
      console.error(error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};



  // 마커 생성 및 클릭 이벤트 처리 로직을 포함하는 함수입니다.
const createMarkersScript = (markers, category) => {
  const categoryIcons = {
    fire: 'https://cdn-icons-png.flaticon.com/128/4906/4906569.png',  // 예시: 소방서 마커 아이콘
    police: 'https://cdn-icons-png.flaticon.com/128/2563/2563376.png', // 예시: 경찰서 마커 아이콘
    store: 'https://cdn-icons-png.flaticon.com/128/11790/11790206.png',   // 예시: 편의점 마커 아이콘
    hospital: 'https://cdn-icons-png.flaticon.com/128/527/527034.png'
  };

  return `
    ${haversineDistance}
    var infowindow = new kakao.maps.InfoWindow({zIndex:1, removable: true});

  ` + markers.map(marker => {
    const distance = `haversineDistance(${currentX}, ${currentY}, ${marker.latitude}, ${marker.longitude}).toFixed(2)`;
    return `
      var markerPosition = new kakao.maps.LatLng(${marker.latitude}, ${marker.longitude});
      var markerImage = new kakao.maps.MarkerImage('${categoryIcons[category]}', new kakao.maps.Size(80, 85));
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage
      });
      marker.setMap(map);

      var distanceOverlay = new kakao.maps.CustomOverlay({
        content: '<div style="padding:5px; background:white; border:1px solid black; font-size:12px;">' + ${distance} + ' km</div>',
        position: markerPosition,
        yAnchor: 3
      });
      distanceOverlay.setMap(map);

      kakao.maps.event.addListener(marker, 'click', function() {
        var content = '<div style="padding:15px; font-size:18px; line-height:1.6; font-family:Arial, sans-serif; color:#333; min-width:250px; min-height:150px;">' +
          '<strong style="font-size:20px;">${marker.name}</strong><br>' +
          '거리: ' + ${distance} + 'km<br>' +
          '<a href="https://map.kakao.com/link/search/' + encodeURIComponent('${marker.name}') +
          '" target="_blank" style="display:inline-block; margin-top:10px; text-decoration:none; color:#4183c4; font-size:16px;">카카오맵에서 길찾기</a>' +
          '<div style="position: absolute; top: 10px; right: 10px; font-size: 28px; padding: 6px; cursor: pointer; color: #888;" onclick="infowindow.close();">&times;</div></div>';
        
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    `;
  }).join('');
};


  // HTML 템플릿에 JavaScript 코드를 삽입하여 지도를 초기화하고 마커를 추가합니다.
  const mapHtml = `
  <html>
    <head>
      <title>Kakao Maps in React Native</title>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_KAKKO_KEY}&libraries=services"></script>
    </head> 
    <body>
      <div id="map" style="width:100%;height:100%;"></div>
      <script>
        var mapContainer = document.getElementById('map'), mapOption = { center: new kakao.maps.LatLng(${currentLocation.x}, ${currentLocation.y}), level: ${zoomLevel} };
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // Zoom Level 변경 시 이벤트 핸들러
        kakao.maps.event.addListener(map, 'zoom_changed', function() {
          var zoomLevel = map.getLevel();
          // React Native로 Zoom Level 변경 메시지 전송
          window.ReactNativeWebView.postMessage(JSON.stringify({type: 'zoom_changed', zoomLevel: zoomLevel}));
        });

        ${createMarkersScript(markers, category)}
        ${createMarkerScript2({lat: currentLocation.x, lng: currentLocation.y}, 'https://cdn-icons-png.flaticon.com/128/7976/7976202.png', {width: 84, height: 89})}
      </script>
    </body>
  </html>`;

  return (
    <View style={styles.container}>
     
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        style={styles.webview}
        onMessage={onMessage}
      />
       <TouchableOpacity onPress={updateLocation} style={styles.updateButton}>
        <Image source={require('../assets/images/gps.png')} style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    width: 35, // 버튼 크기 조정
    height: 35, // 버튼 크기 조정
    borderRadius: 25, // 원형 버튼
    position:'absolute',
    bottom:20,
    left:10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonIcon: {
    width: 25, // 이미지 크기
    height: 25  // 이미지 크기
  }
});

export default memo(MapComponent);