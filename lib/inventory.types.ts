export type Region = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  name: string;
  regionId: string; // FK -> Region.id
};

export type LocationItemSection = {
  title: string;
  list: string[];
};

export type Location = {
  id: string;
  name: string;
  cityId: string;
  title?: string;
  mapTitle?: string;
  description?: string;
  notes?: string;
  image?: string;
  mapImage?: string;
  sliderImages?: string[];
  brochure?: string; // ruta PDF
  items?: LocationItemSection[];
};

export type InventoryData = {
  regions: Region[];
  cities: City[];
  locations: Location[];
};