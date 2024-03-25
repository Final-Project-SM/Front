import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { REACT_APP_KAKKO_KEY } from '@env'; // react-native-dotenv를 통해 환경 변수 불러오기
const MapComponent = () => {
  // 마커를 추가하는 JavaScript 코드를 생성하는 함수
  const createMarkerScript = (position, imageUrl, imageSize) => {
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
                  center: new kakao.maps.LatLng(37.566826, 126.9786567),
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
          ${createMarkerScript({lat: 37.5662952, lng: 126.9779451}, 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', {width: 64, height: 69})}
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
