import React, {memo, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {REACT_APP_KAKKO_KEY, REACT_APP_KAKAO_REST_KEY} from '@env'; // 환경 변수에서 카카오 API 키 가져오기
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {useUser} from '../components/public/UserContext';
import {userAxios} from '../API/requestNode';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment-timezone';

/**
 * MapComponent 컴포넌트
 *
 * 지도에 마커, 원, 폴리라인을 표시하고, 사용자의 현재 위치를 갱신하여 표시하는 컴포넌트입니다.
 *
 * @component
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {number} props.x - 초기 지도 중심의 위도
 * @param {number} props.y - 초기 지도 중심의 경도
 * @param {Array} props.markers - 지도에 표시할 마커들의 배열
 * @param {number} props.currentX - 사용자의 현재 위도
 * @param {number} props.currentY - 사용자의 현재 경도
 * @param {string} props.category - 마커의 카테고리 (예: 'fire', 'police', 'store', 'hospital')
 * @returns {JSX.Element} MapComponent 컴포넌트
 */
const MapComponent = ({x, y, markers, currentX, currentY, category}) => {
  const [zoomLevel, setZoomLevel] = useState(3); // 초기 Zoom Level을 3으로 설정
  const [currentLocation, setCurrentLocation] = useState({x, y});
  const isFocused = useIsFocused();
  const {user} = useUser();

  // WebView로부터 메시지를 받았을 때의 핸들러
  const onMessage = event => {
    const {data} = event.nativeEvent;
    const message = JSON.parse(data);

    if (message.type === 'zoom_changed') {
      setZoomLevel(message.zoomLevel);
    }
  };

  const [locations, setLocations] = useState([
    {seq: 1, lat: 36.8107, lon: 127.0789},
    {seq: 2, lat: 36.8135, lon: 127.0815},
    {seq: 3, lat: 36.8001, lon: 127.0762},
    {seq: 4, lat: 36.812, lon: 127.0763},
    {seq: 5, lat: 36.7994, lon: 127.081},
    {seq: 6, lat: 36.8061, lon: 127.0636},
    {seq: 7, lat: 36.8051, lon: 127.0758},
    {seq: 8, lat: 36.8042, lon: 127.0811},
    {seq: 9, lat: 36.8076, lon: 127.0814},
    {seq: 10, lat: 36.7976, lon: 127.0817},
  ]);
  const [coordinates, setCoordinates] = useState([
    {lat: 36.79888, lon: 127.0648},
    {lat: 36.7988819, lon: 127.0747772},
    {lat: 36.79763, lon: 127.0851},
    {lat: 36.79857, lon: 127.0927},
  ]);

  /**
   * 사용자의 현재 위치를 갱신하고, 위치 정보를 서버로 전송하는 함수
   *
   * @async
   * @function
   * @param {number} lat - 현재 위치의 위도
   * @param {number} lon - 현재 위치의 경도
   */
  const updateCirclessScript = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
        {
          headers: {Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_KEY}`},
        },
      );
      const addressName = response.data.documents[0].address
        ? response.data.documents[0].address.address_name
        : '주소를 찾을 수 없습니다.';
      const kr_curr = moment().tz('Asia/Seoul').format('YYYY-MM-DD');
      const kr_curr2 = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
      console.log(kr_curr2);
      const data = await userAxios.map({
        id: user.id,
        region1: response.data.documents[0].address.region_1depth_name,
        region2: response.data.documents[0].address.region_2depth_name,
        today: kr_curr,
        test: kr_curr2,
      });
      if (data.sc == 200) {
        setLocations(data.response);
        setCoordinates(data.locations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 원을 생성하는 JavaScript 코드 생성 함수
   *
   * @function
   * @param {Array} locations - 원을 생성할 위치 배열
   * @returns {string} 생성된 JavaScript 코드
   */
  const createCirclesScript = locations => {
    return locations
      .map(location => {
        let fillColor;
        let fillOpacity;

        if (location.seq <= 10) {
          fillColor = '#FF6347';
          fillOpacity = 0.4;
        } else if (location.seq <= 20) {
          fillColor = '#FFD700';
          fillOpacity = 0.5;
        } else if (location.seq <= 30) {
          fillColor = '#FFFF00';
          fillOpacity = 0.6;
        } else if (location.seq <= 40) {
          fillColor = '#FFA500';
          fillOpacity = 0.7;
        } else {
          fillColor = '#FF0000';
          fillOpacity = 0.8;
        }

        return `
        var center = new kakao.maps.LatLng(${location.lat}, ${location.lon});
        var circleOptions = {
          center: center,
          radius: 25, // 반지름 25m
          strokeWeight: 5,
          strokeColor: '${fillColor}',
          strokeOpacity: 0.8,
          fillColor: '${fillColor}',
          fillOpacity: ${fillOpacity}
        };
        var circle = new kakao.maps.Circle(circleOptions);
        circle.setMap(map);

        // 원 중앙에 텍스트 추가
        var content = '<div style=" width: 30px; height: 30px; line-height: 30px; text-align: center; font-size: 22px; color: white; font-weight: bold;">${location.seq}</div>';
        var customOverlay = new kakao.maps.CustomOverlay({
          content: content,
          position: center,
          xAnchor: 0.5,
          yAnchor: 0.5
        });
        customOverlay.setMap(map);
        `;
      })
      .join('');
  };

  /**
   * 폴리라인을 생성하는 JavaScript 코드 생성 함수
   *
   * @function
   * @returns {string} 생성된 JavaScript 코드
   */
  const createPolylineScript = () => {
    const markerScript = coordinates
      .map(
        coord => `
        var markerPosition = new kakao.maps.LatLng(${coord.lat}, ${coord.lon});
        var marker2 = new kakao.maps.Marker({
          position: markerPosition,
          image: new kakao.maps.MarkerImage(
            'https://cdn-icons-png.flaticon.com/128/190/190411.png',
            new kakao.maps.Size(24, 35)
          )
        });
        marker2.setMap(map);
        `,
      )
      .join('');

    return `
      var linePath = [
        ${coordinates
          .map(coord => `new kakao.maps.LatLng(${coord.lat}, ${coord.lon})`)
          .join(',')}
      ];

      var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#FF0000',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
      });

      polyline.setMap(map);

      ${markerScript}
    `;
  };

  useEffect(() => {
    updateLocation(); // 컴포넌트가 마운트될 때 위치 갱신
  }, [isFocused]);

  // 하버사인 거리 계산 함수를 문자열로 정의합니다. 유클리드 계산법은 정확하지 않음
  // 이 함수는 지도 스크립트 내에서 사용됩니다.
  const haversineDistance = `
  function haversineDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // 지구의 반지름(km)
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon1 - lon2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c;
  }
  function toRad(Value) {
      return Value * Math.PI / 180;
  }`;

  /**
   * 사용자 지정 마커를 추가하는 함수
   *
   * @function
   * @param {object} position - 마커의 위치 객체 (lat, lng)
   * @param {string} imageUrl - 마커 이미지 URL
   * @param {object} imageSize - 마커 이미지 크기 객체 (width, height)
   * @returns {string} 생성된 JavaScript 코드
   */
  const createMarkerScript2 = (position, imageUrl, imageSize) => `
      var markerPosition = new kakao.maps.LatLng(${position.lat}, ${position.lng});
      var markerImage = new kakao.maps.MarkerImage('${imageUrl}', new kakao.maps.Size(${imageSize.width}, ${imageSize.height}));
      var marker = new kakao.maps.Marker({ position: markerPosition, image: markerImage });
      marker.setMap(map);`;

  /**
   * 위치 갱신 버튼의 핸들러
   */
  const updateLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          x: position.coords.latitude,
          y: position.coords.longitude,
        });
        updateCirclessScript(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  /**
   * 마커 생성 및 클릭 이벤트 처리 로직을 포함하는 함수
   *
   * @function
   * @param {Array} markers - 마커 배열
   * @param {string} category - 마커 카테고리
   * @returns {string} 생성된 JavaScript 코드
   */
  const createMarkersScript = (markers, category) => {
    const categoryIcons = {
      fire: 'https://cdn-icons-png.flaticon.com/128/4906/4906569.png', // 예시: 소방서 마커 아이콘
      police: 'https://cdn-icons-png.flaticon.com/128/2563/2563376.png', // 예시: 경찰서 마커 아이콘
      store: 'https://cdn-icons-png.flaticon.com/128/11790/11790206.png', // 예시: 편의점 마커 아이콘
      hospital: 'https://cdn-icons-png.flaticon.com/128/527/527034.png',
    };

    return (
      `
    ${haversineDistance}
    var infowindow = new kakao.maps.InfoWindow({zIndex:1, removable: true});

  ` +
      markers
        .map(marker => {
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
        })
        .join('')
    );
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
        var mapContainer = document.getElementById('map'), mapOption = { center: new kakao.maps.LatLng(${
          currentLocation.x
        }, ${currentLocation.y}), level: ${zoomLevel} };
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // Zoom Level 변경 시 이벤트 핸들러
        kakao.maps.event.addListener(map, 'zoom_changed', function() {
          var zoomLevel = map.getLevel();
          // React Native로 Zoom Level 변경 메시지 전송
          window.ReactNativeWebView.postMessage(JSON.stringify({type: 'zoom_changed', zoomLevel: zoomLevel}));
        });

        ${createMarkersScript(markers, category)}
        ${createMarkerScript2(
          {lat: currentLocation.x, lng: currentLocation.y},
          'https://cdn-icons-png.flaticon.com/128/7976/7976202.png',
          {width: 84, height: 89},
        )}
        ${createCirclesScript(locations)}
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
    width: 25, // 이미지 크기
    height: 25, // 이미지 크기
  },
});

export default memo(MapComponent);
