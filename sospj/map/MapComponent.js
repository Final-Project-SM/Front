import React, {memo, useState, useEffect} from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { REACT_APP_KAKKO_KEY } from '@env'; // 환경 변수에서 카카오 API 키 가져오기

const MapComponent = ({ x, y, markers, currentX, currentY, category }) => {
  const [zoomLevel, setZoomLevel] = useState(3); // 초기 Zoom Level을 3으로 설정

  // WebView로부터 메시지를 받았을 때의 핸들러
  const onMessage = (event) => {
    const { data } = event.nativeEvent;
    const message = JSON.parse(data);
    
    if (message.type === 'zoom_changed') {
      setZoomLevel(message.zoomLevel); // Zoom Level 상태 업데이트
    }
  };

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

  // 마커 생성 및 클릭 이벤트 처리 로직을 포함하는 함수입니다.
const createMarkersScript = (markers, category) => {
  const categoryIcons = {
    fire: 'https://cdn-icons-png.flaticon.com/128/4906/4906569.png',  // 예시: 소방서 마커 아이콘
    police: 'https://cdn-icons-png.flaticon.com/128/2563/2563376.png', // 예시: 경찰서 마커 아이콘
    store: 'https://cdn-icons-png.flaticon.com/128/11790/11790206.png'   // 예시: 편의점 마커 아이콘
  };

  return `
    ${haversineDistance}
    var infowindow = new kakao.maps.InfoWindow({zIndex:1}); // 인포윈도우를 미리 생성하고 재사용
  ` + markers.map(marker => `
    var markerPosition = new kakao.maps.LatLng(${marker.latitude}, ${marker.longitude});
    var markerImage = new kakao.maps.MarkerImage('${categoryIcons[category]}', new kakao.maps.Size(64, 69));
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage
    });
    marker.setMap(map);
    
    // 마커에 클릭 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
      // 현재 위치에서 마커까지의 거리 계산
      var distance = haversineDistance(${currentX}, ${currentY}, ${marker.latitude}, ${marker.longitude});
      distance = distance.toFixed(2); // 소수점 둘째 자리까지 표시

      // 인포윈도우에 표시할 내용 업데이트
      var content = '<div style="padding:5px; font-size:20px; min-width:150px; min-height:100px; position: relative;">' + 
        '${marker.name}까지의 거리: ' + distance + 'km<br>' +
        '<a href="https://map.kakao.com/link/search/' + encodeURIComponent('${marker.name}') + 
        '" target="_blank" style="display:inline-block; margin-top:5px; color:blue; text-decoration:underline; font-size:30px;">카카오맵에서 검색하기</a>' +
        '<div style="position: absolute; top: 30px; right: 20px; font-size: 24px; padding: 4px; cursor: pointer;" onclick="infowindow.close();">닫기</div></div>';

      infowindow.setContent(content);

      // 현재 마커에 인포윈도우를 표시합니다
      infowindow.open(map, marker);
    });
  `).join('');
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
          var mapContainer = document.getElementById('map'), mapOption = { center: new kakao.maps.LatLng(${x}, ${y}), level: ${zoomLevel} };
          var map = new kakao.maps.Map(mapContainer, mapOption);

          // Zoom Level 변경 시 이벤트 핸들러
          kakao.maps.event.addListener(map, 'zoom_changed', function() {
            var zoomLevel = map.getLevel();
            // React Native로 Zoom Level 변경 메시지 전송
            window.ReactNativeWebView.postMessage(JSON.stringify({type: 'zoom_changed', zoomLevel: zoomLevel}));
          });

          ${createMarkersScript(markers,category)}
          ${createMarkerScript2({lat: currentX, lng: currentY}, 'https://cdn-icons-png.flaticon.com/128/7976/7976202.png', {width: 84, height: 89})}
        </script>
      </body>
    </html>`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        style={styles.webview}
        onMessage={onMessage} // WebView로부터 메시지를 받기 위한 핸들러 설정
      />
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
});

export default memo(MapComponent);
