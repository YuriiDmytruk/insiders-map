import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Map from './components/Map';

import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import PlacesCarousel from './components/PlacesCarousel';

enableScreens();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.containerMap}>
            <Map />
          </View>
          <View>
            <PlacesCarousel />
          </View>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  containerMap: {
    width: '100%',
    height: '70%',
  },
});

export default App;
