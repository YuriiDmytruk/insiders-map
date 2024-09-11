import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Region} from 'react-native-maps';
import {Place} from '../../types';

interface MapState {
  region: Region;
  places: Place[];
  radius: number;
  selectedPlace: Place | null;
}

const initialState: MapState = {
  region: {
    latitude: 49.842957,
    longitude: 24.031111,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  places: [],
  radius: 5000,
  selectedPlace: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<Region>) {
      state.region = action.payload;
    },
    setPlaces(state, action: PayloadAction<Place[]>) {
      state.places = action.payload;
    },
    setRadius(state, action: PayloadAction<number>) {
      state.radius = action.payload;
    },
    setSelectedPlace(state, action: PayloadAction<Place | null>) {
      state.selectedPlace = action.payload;
    },
  },
});

export const {setRegion, setPlaces, setRadius, setSelectedPlace} = mapSlice.actions;
export default mapSlice.reducer;
