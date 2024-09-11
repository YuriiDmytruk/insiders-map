export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type PlusCode = {
  compound_code: string;
  global_code: string;
};

export type Geometry = {
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
};

export type OpeningHours = {
  open_now: boolean;
};

type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

export type Place = {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
};
