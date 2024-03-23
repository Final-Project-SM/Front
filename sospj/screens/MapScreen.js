import React from 'react';
import { View, Text,  } from 'react-native';
import MapComponent from '../map/MapComponent';

function MapScreen() {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <MapComponent/>
    </View>
  );
}

export default MapScreen;
