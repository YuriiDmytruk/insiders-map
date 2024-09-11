import React from 'react';
import MapView, {Marker, Region} from 'react-native-maps';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {
  setRegion,
  setPlaces,
  setRadius,
  setSelectedPlace,
} from '../redux/slices/mapSlice';
import {useFetchNearbyPlacesQuery} from '../redux/placesApi';
import {Place} from '../types';
import {ZOOM_LEVEL} from '../constants';

// Import images statically
const pinSelected = require('../assets/pin-selected.png');
const pin = require('../assets/pin.png');
const searchIcon = require('../assets/search-icon.png'); // Add this line for search icon

const Map = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {region, places, selectedPlace, radius} = useSelector(
    (state: RootState) => state.map,
  );

  const {data: fetchedPlaces} = useFetchNearbyPlacesQuery({
    latitude: region.latitude,
    longitude: region.longitude,
    radius,
    type: 'restaurant|cafe',
  });

  const onSearchButtonPress = () => {
    if (fetchedPlaces) {
      dispatch(setPlaces(fetchedPlaces.results));
    }
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    dispatch(setRegion(newRegion));
    dispatch(
      setRadius(
        (Math.max(newRegion.latitudeDelta, newRegion.longitudeDelta) * 111000) /
          2,
      ),
    );
  };

  const zoomIn = () => {
    dispatch(
      setRegion({
        ...region,
        latitudeDelta: region.latitudeDelta * 0.9,
        longitudeDelta: region.longitudeDelta * 0.9,
      }),
    );
    dispatch(
      setRadius(
        (Math.max(region.latitudeDelta * 0.9, region.longitudeDelta * 0.9) *
          111000) /
          2,
      ),
    );
  };

  const zoomOut = () => {
    dispatch(
      setRegion({
        ...region,
        latitudeDelta: region.latitudeDelta * 1.1,
        longitudeDelta: region.longitudeDelta * 1.1,
      }),
    );
    dispatch(
      setRadius(
        (Math.max(region.latitudeDelta * 1.1, region.longitudeDelta * 1.1) *
          111000) /
          2,
      ),
    );
  };

  const onMarkerPress = (place: Place) => {
    dispatch(setSelectedPlace(place));
    dispatch(
      setRegion({
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        latitudeDelta: ZOOM_LEVEL.latitudeDelta,
        longitudeDelta: ZOOM_LEVEL.longitudeDelta,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        style={styles.map}>
        {places.map(place => {
          const isSelected = selectedPlace?.place_id === place.place_id;
          const markerImage = isSelected ? pinSelected : pin;

          return (
            <Marker
              key={place.place_id}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              onPress={() => onMarkerPress(place)}>
              <Image
                source={markerImage}
                style={isSelected ? styles.imageSelected : styles.image}
              />
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.controlContainer}>
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={zoomIn}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={zoomOut}>
          <Text style={styles.zoomButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={onSearchButtonPress}>
          <Image
            source={searchIcon}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 42,
    height: 54,
  },
  imageSelected: {
    width: 44,
    height: 59,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  controlContainer: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    alignItems: 'center',
  },
  zoomButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 10,
  },
  zoomButtonText: {
    color: '#007bff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 25,
    elevation: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
});

export default Map;
