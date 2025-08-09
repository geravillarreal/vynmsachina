export interface Region {
  id: string;
  name: string;
}

export interface City {
  id: string;
  regionId: string;
  name: string;
}

export interface ItemList {
  title: string;
  list: string[];
}

export interface Location {
  id: string;
  cityId: string;
  name: string;
  mapTitle: string;
  description: string;
  title: string;
  notes?: string;
  sliderImages: string[];
  image: string;
  mapImage: string;
  brochure?: string;
  items?: ItemList[];
}

export interface Inventory {
  regions: Region[];
  cities: City[];
  locations: Location[];
}
