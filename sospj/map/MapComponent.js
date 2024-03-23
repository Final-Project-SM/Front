import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const MapComponent = () => {
  const mapHtml = `
    <html>
      <head>
        <title>Kakao Maps in React Native</title>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=cd31cc1688cfd0bc17ba44d19c5e80a9&libraries=services"></script>
      </head>
      <body>
        <div id="map" style="width:100%;height:100%;"></div>
        <script>
          var mapContainer = document.getElementById('map'),
              mapOption = {
                  center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                  level: 3 // 지도의 확대 레벨
              };  

          var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
          // 서울특별시청 위치에 노란색 마커를 추가합니다
          var cityHallPosition = new kakao.maps.LatLng(37.5662952, 126.9779451);
          var cityHallMarker = new kakao.maps.Marker({
              position: cityHallPosition,
              map: map,
              // 노란색 마커 이미지 사용
              image: new kakao.maps.MarkerImage(
                  'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                  new kakao.maps.Size(64, 69)
              )
          });
          // 장소 검색 객체를 생성합니다
          var ps = new kakao.maps.services.Places(); 

          // 키워드로 장소를 검색합니다
          ps.keywordSearch('경찰서', placesSearchCB, {location: map.getCenter()}); 

          // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
          function placesSearchCB (data, status, pagination) {
              if (status === kakao.maps.services.Status.OK) {
                  var bounds = new kakao.maps.LatLngBounds();

                  for (var i=0; i<data.length; i++) {
                      displayMarker(data[i]);    
                      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                  }       

                  map.setBounds(bounds);
              } 
          }

          // 지도에 마커를 표시하는 함수입니다
          function displayMarker(place) {
              var marker = new kakao.maps.Marker({
                  map: map,
                  position: new kakao.maps.LatLng(place.y, place.x) 
              });
          }
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: mapHtml }}
      style={styles.webview}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapComponent;
