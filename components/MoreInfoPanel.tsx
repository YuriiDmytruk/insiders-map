import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import {Place} from '../types';
import {Carousel} from 'react-native-basic-carousel';
import {API_KEY} from '../redux/placesApi';

const starEmpty: ImageSourcePropType = require('../assets/star-empty.png');
const starFull: ImageSourcePropType = require('../assets/star-full.png');

interface MoreInfoPanelProps {
  place: Place | null;
  onClose: () => void;
}

const renderRatingStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <View style={styles.starsContainer}>
      {[...Array(fullStars)].map((_, index) => (
        <Image key={`full-${index}`} source={starFull} style={styles.star} />
      ))}
      {halfStars > 0 && <Image source={starFull} style={styles.star} />}
      {[...Array(emptyStars)].map((_, index) => (
        <Image key={`empty-${index}`} source={starEmpty} style={styles.star} />
      ))}
    </View>
  );
};

const MoreInfoPanel: React.FC<MoreInfoPanelProps> = ({place, onClose}) => {
  if (!place) {
    return null;
  }

  const {width} = Dimensions.get('window');

  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{place.name}</Text>

      {place.photos && place.photos.length > 0 ? (
        <Carousel
          data={place.photos}
          renderItem={({item}) => (
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${API_KEY}`,
              }}
              style={styles.image}
            />
          )}
          autoplay
          pagination
          itemWidth={width}
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No Images Available</Text>
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          {renderRatingStars(place.rating)}
        </View>

        <Text style={styles.panelText}>Address: {place.vicinity}</Text>
        <Text style={styles.panelText}>Price Level: {place.price_level}</Text>
        <Text style={styles.panelText}>
          User Ratings Total: {place.user_ratings_total}
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  panelTitle: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  panelText: {
    fontSize: 16,
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  star: {
    width: 20,
    height: 20,
    marginHorizontal: 2,
  },
  ratingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
  },
});

export default MoreInfoPanel;
