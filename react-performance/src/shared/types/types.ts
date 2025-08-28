export interface Co2DataPoint {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  [key: string]: number | undefined;
}

export interface CountryData {
  data: Co2DataPoint[];
  iso_code?: string;
  country: string;
}

export interface Co2DataResponse {
  [country: string]: CountryData;
}

export interface AvailableColumn {
  key: string;
  label: string;
  selected: boolean;
}

export interface CountryYearData {
  country: string;
  iso_code?: string;
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  [key: string]: number | string | undefined;
}
