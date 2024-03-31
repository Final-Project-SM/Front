import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Dimensions, View, TextInput, Button } from 'react-native';

export default function MapComponent2() {
  const [keyword, setKeyword] = useState('');
  const webviewRef = useRef(null); // useRef를 사용하여 ref 생성
  const mapHtml = `
    <html>
      <head>
        <title>Kakao Maps in React Native</title>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=cd31cc1688cfd0bc17ba44d19c5e80a9&libraries=services&autoload=false"></script>
        <style>
          body, html, #map { width: 100%; height: 100%; margin: 0; padding: 0;}
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          kakao.maps.load(function() {
            let markers = [];
            const container = document.getElementById('map');
            const options = {
              center: new kakao.maps.LatLng(38.2313466, 128.2139293),
              level: 3
            };
            const map = new kakao.maps.Map(container, options);

            // Search places
            const ps = new kakao.maps.services.Places();
            const infowindow = new kakao.maps.InfoWindow({ zIndex:1 });

            window.searchPlaces = function(keyword) {
              if (!keyword.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요!');
                return false;
              }

              ps.keywordSearch(keyword, placesSearchCB);
            }

            function placesSearchCB(data, status, pagination) {
              if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                removeAllChildNods();
                for (let i = 0; i < data.length; i++) {
                  displayMarker(data[i]);
                  bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                map.setBounds(bounds);
              } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
              } else if (status === kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
              }
            }

            function displayMarker(place) {
              const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
              });
              kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
              });
              markers.push(marker);
            }

            function removeAllChildNods() {
              for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
              } 
              markers = [];
            }
          });
        </script>
      </body>
    </html>
  `;

  const runFirst = `
    document.body.style.backgroundColor = 'blue';
    window.searchPlaces("${keyword}");
  `;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="키워드를 입력하세요"
        value={keyword}
        onChangeText={setKeyword}
      />
      <Button title="검색" onPress={() => webviewRef.current?.injectJavaScript(runFirst)} />
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        style={styles.mapView}
        javaScriptEnabled={true}
        ref={webviewRef} // ref를 WebView에 할당
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.75,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
});
