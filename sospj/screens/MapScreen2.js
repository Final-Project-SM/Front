import React, {memo, useState, useEffect} from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';

const MapScreen2 = ({ x, y }) => {
  const [zoomLevel, setZoomLevel] = useState(15); // Tmap의 기본 줌 레벨 설정

  // HTML 템플릿에서 Tmap API를 사용하여 지도를 초기화하고 설정합니다.
  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Tmap in React Native</title>
      <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=여기에_당신의_Tmap_API_키"></script>
    </head>
    <body>
      <div id="Tmap" style="width:100%;height:r100%;"></div>
      <script>
        var map = new Tmapv2.Map("Tmap", {
          center: new Tmapv2.LatLng(${y}, ${x}),
          width: "100%",
          height: "100%",
          zoom: ${zoomLevel}
        });

        // 마커 추가 예시
        var marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(${y}, ${x}),
          map: map
        });

        // 줌 레벨 변경 이벤트 핸들러
        map.addListener("zoom_changed", function(evt) {
          var newZoomLevel = map.getZoom();
          // React Native로 줌 레벨 변경 메시지를 전송
          window.ReactNativeWebView.postMessage(JSON.stringify({type: 'zoom_changed', zoomLevel: newZoomLevel}));
        });
      </script>
    </body>
    </html>
  `;

  // 웹뷰로부터 메시지를 받았을 때의 핸들러
  const onMessage = (event) => {
    const { data } = event.nativeEvent;
    const message = JSON.parse(data);

    if (message.type === 'zoom_changed') {
      setZoomLevel(message.zoomLevel); // 줌 레벨 상태 업데이트
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        style={styles.webview}
        onMessage={onMessage} // 웹뷰로부터 메시지를 받기 위한 핸들러 설정
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

export default memo(MapScreen2);
