import React, {useState, useMemo, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Carousel} from 'react-native-basic-carousel';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {setRegion, setSelectedPlace} from '../redux/slices/mapSlice';
import {API_KEY} from '../redux/placesApi';
import {Place} from '../types';
import {ZOOM_LEVEL} from '../constants';
import SwipeBar from './SwipeBar';
import MoreInfoPanel from './MoreInfoPanel';

const {width, height} = Dimensions.get('window');

const PlacesCarousel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {places, selectedPlace} = useSelector((state: RootState) => state.map);

  const [isPanelActive, setIsPanelActive] = useState(false);

  const reorderedPlaces = useMemo(() => {
    if (!selectedPlace) {
      return places;
    }
    return [
      selectedPlace,
      ...places.filter(place => place.place_id !== selectedPlace.place_id),
    ];
  }, [places, selectedPlace]);

  const [shownPlace, setShownPlace] = useState(reorderedPlaces[0]);

  useEffect(() => {
    const changeSelected = (place: Place) => {
      dispatch(
        setRegion({
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          latitudeDelta: ZOOM_LEVEL.latitudeDelta,
          longitudeDelta: ZOOM_LEVEL.longitudeDelta,
        }),
      );
    };

    changeSelected(shownPlace);
  },[shownPlace, dispatch]);

  const handleItemClick = (place: Place) => {
    dispatch(
      setRegion({
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        latitudeDelta: ZOOM_LEVEL.latitudeDelta,
        longitudeDelta: ZOOM_LEVEL.longitudeDelta,
      }),
    );
    dispatch(setSelectedPlace(place));
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const onSwipeUp = () => {
    setIsPanelActive(true);
  };

  const onSwipeDown = () => {
    setIsPanelActive(false);
  };

  return (
    <View style={styles.container}>
      <Carousel
        key={selectedPlace?.place_id || 'carousel'}
        data={reorderedPlaces}
        getCurrentIndex={index => setShownPlace(reorderedPlaces[index])}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleItemClick(item)}>
            {item.photos && item.photos.length > 0 ? (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${API_KEY}`,
                }}
                style={styles.image}
              />
            ) : (
              <View style={styles.noImage}>
                <Text style={styles.noImageText}>No Image</Text>
              </View>
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.placeName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        itemWidth={width}
      />

      {isPanelActive && (
        <MoreInfoPanel place={shownPlace} onClose={closePanel} />
      )}

      {!isPanelActive && (
        <SwipeBar onSwipeUp={onSwipeUp} onSwipeDown={onSwipeDown} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.25,
    width: width,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: width,
    height: '70%',
  },
  noImage: {
    width: width,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  noImageText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  placeName: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  placeDetails: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default PlacesCarousel;
