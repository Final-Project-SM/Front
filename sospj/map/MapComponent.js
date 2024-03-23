import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const MapComponent = () => {
  const mapHtml = `
    <html>
      <head>
        <title>Kakao Maps in React Native</title>
        <script type="text/javascript" src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=cd31cc1688cfd0bc17ba44d19c5e80a9"></script>
      </head>
      <body>
        <div id="map" style="width:100%;height:100%;"></div>
        <script>
          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3
          };

          var map = new kakao.maps.Map(container, options);
          console.log('Map initialized');
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
