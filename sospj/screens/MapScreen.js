// MapScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import MapComponent from '../map/MapComponent';
import MapComponent2 from '../map/MapComponent copy';
import {WebView} from 'react-native-webview';
import FetchDataComponent from '../API/FetchDataComponent';
import FetchDataKakao from '../API/FetchDataComponent.js';
import {REACT_APP_API_KEY} from '@env';
import { REACT_APP_KAKKO_KEY } from '@env'; // react-native-dotenv를 통해 환경 변수 불러오기

function MapScreen() {
  const apiUrl = `http://openapi.seoul.go.kr:8088/${REACT_APP_API_KEY}/xml/TbGiWardP/1/10/`; // 수정된 부분

  const mapHtml = `
<html>
<head>
  <title>Kakao Maps in React Native</title>
  <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_KAKKO_KEY}&libraries=services"></script>
</head>
<body>
  <div id="map" style="width:100%;height:2050px;"></div>
  <script>
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});
    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(37.540461816779, 126.99444172631),
            level: 3
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    var ps = new kakao.maps.services.Places(); 

    // 서울역에 마커 추가
    var seoulStationPosition = new kakao.maps.LatLng(37.554722, 126.970833);
    var seoulStationMarker = new kakao.maps.Marker({
        map: map,
        position: seoulStationPosition
    });

    // 서울역 마커 클릭 이벤트
    kakao.maps.event.addListener(seoulStationMarker, 'click', function() {
        // 여기서 API를 호출하여 동적으로 정보를 가져올 수 있음
        // 예시에서는 정적인 정보를 표시
        var content = '<div style="padding:5px;">서울역 노숙자 성지</div>'; // 실제 정보로 교체 필요
        infowindow.setContent(content);
        infowindow.open(map, seoulStationMarker);
    });

    ps.keywordSearch('이태원 맛집', placesSearchCB); 

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

    function displayMarker(place) {
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        kakao.maps.event.addListener(marker, 'click', function() {
          // 여기에서 font-size를 px 단위f로 고정하여 지도 확대/축소에 영향을 받지 않게 함
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          infowindow.open(map, marker);
      });
    }
  </script>
</body>
</html>
`;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Map Screen</Text>
      {/* <MapComponent />*/}
      {/*<FetchDataComponent apiUrl={apiUrl} />
      <Text>test map</Text>*/}
      <WebView
      originWhitelist={['*']}
      style={styles.mapView}
      source={{ html: mapHtml }}
      />
      {/* <Text>test map2</Text>
      <MapComponent2/> */}
      <FetchDataKakao/>
    </View>
  );
}
const styles = StyleSheet.create({
  mapView: {
    width: Dimensions.get('window').width,
    height: 750, // 높이를 350px로 설정
  },
});

export default MapScreen;
