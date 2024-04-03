import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Dimensions } from 'react-native';
import { REACT_APP_TMAP_KEY } from '@env'; // 환경변수에서 TMap API 키 가져오기

const TMapComponent = () => {
  // HTML 문자열 내에서 JavaScript 코드를 올바르게 실행할 수 있도록 수정
  const mapHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>simpleMap</title>
    <script type="text/javascript" src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${REACT_APP_TMAP_KEY}"></script>
    <style>
      html, body, #map_div {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map_div"></div>
    <script type="text/javascript">
      function initTmap() {
        var map = new Tmapv2.Map("map_div", {
          center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841), // 지도 초기 좌표
          width: "100%", // 화면 전체 너비
          height: "100%", // 화면 전체 높이
          zoom: 18
        });
      }
      initTmap();
    </script>
  </body>
  </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        style={styles.mapView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default TMapComponent;
