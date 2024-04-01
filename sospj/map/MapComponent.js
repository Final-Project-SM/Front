import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { REACT_APP_KAKKO_KEY } from '@env'; // react-native-dotenv를 통해 환경 변수 불러오기
const MapComponent = ({x,y,markers}) => {
  // 마커를 추가하는 JavaScript 코드를 생성하는 함수
  const createMarkerScript = (position, imageUrl, imageSize) => {
    console.log(markers)
    return `
      var markerPosition = new kakao.maps.LatLng(${position.lat}, ${position.lng});
      var markerImage = new kakao.maps.MarkerImage('${imageUrl}', new kakao.maps.Size(${imageSize.width}, ${imageSize.height}));
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage
      });
      marker.setMap(map);
    `;
  };

  const createMarkersScript = (markers) => {
    return markers.map(marker => `
      var markerPosition = new kakao.maps.LatLng(${marker.latitude}, ${marker.longitude});
      var markerImage = new kakao.maps.MarkerImage('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', new kakao.maps.Size({width: 64, height: 69}));
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage
      });
      marker.setMap(map);
      
      // 마커에 클릭 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {
        // 클릭 시, 마커 이름 표시 (예시)
        alert('${marker.name}');
      });
    `).join('');
  };

  const mapHtml = `
    <html>
      <head>
        <title>Kakao Maps in React Native</title>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_KAKKO_KEY}&libraries=services"></script>
      </head> 
      <body>
        <div id="map" style="width:100%;height:100%;"></div>
        <script>
          var mapContainer = document.getElementById('map'),
              mapOption = {
                  center: new kakao.maps.LatLng(${x}, ${y}),
                  level: 3
              };  

          var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
          // 장소 검색 객체를 생성합니다
          var ps = new kakao.maps.services.Places(); 

          // 키워드로 장소를 검색합니다
          ps.keywordSearch('경찰서', placesSearchCB); 
          // 키워드 검색 완료 시 호출되는 콜백함수 입니다
          function placesSearchCB (data, status, pagination) {
              if (status === kakao.maps.services.Status.OK) {

                  // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                  // LatLngBounds 객체에 좌표를 추가합니다
                  var bounds = new kakao.maps.LatLngBounds();

                  for (var i=0; i<data.length; i++) {
                      displayMarker(data[i]);    
                      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                  }       

                  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                  map.setBounds(bounds);
              } 
          }
          // 마커를 추가하는 코드를 여기에 삽입합니다
          ${createMarkersScript(markers)}
          ${createMarkerScript({lat: 36.7991628, lng: 127.0760286}, 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', {width: 64, height: 69})}
          ${createMarkerScript({lat: 36.7991628, lng: 127.0760286}, 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', {width: 64, height: 69})}
        </script>
      </body>
    </html>
  `;

  return (
    <View>
      <Text>{x}, {y}</Text>
      {/* {markers.map((marker, index) => (
        <View key={index} style={styles.markerContainer}>
          <Text style={styles.text}>Name: {marker.name}</Text>
          <Text style={styles.text}>Latitude: {marker.latitude}</Text>
          <Text style={styles.text}>Longitude: {marker.longitude}</Text>
        </View>
      ))} */}
    <WebView
      originWhitelist={['*']}
      source={{ html: mapHtml }}
      style={styles.webview}
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
  markerContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
  },
});

export default MapComponent;
