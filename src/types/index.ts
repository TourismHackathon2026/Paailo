export type Destination = {
  id: number;
  name: string;
  province: string;
  category: string;
  rating: number;
  budget: string;
  season: string;
  img: string;
  desc: string;
};

export type Province = {
  id: number;
  name: string;
  nepali: string;
  capital: string;
  color: string;
  light: string;
  img: string;
  highlights: string[];
  description: string;
  categories: string[];
  topDest: string[];
  bestSeason: string;
  budget: string;
};

export type Festival = {
  name: string;
  date: string;
  province: string;
  desc: string;
  img: string;
};

export type TravelTip = {
  icon: string;
  title: string;
  desc: string;
  color: string;
};

export type ExperienceCategory = {
  icon: string;
  label: string;
  color: string;
};

export type PlanDay = {
  day: number;
  morning: string;
  afternoon: string;
  evening: string;
  hotel: string;
  restaurant: string;
  cost: string;
  weather: string;
};
