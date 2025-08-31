import { useState, useEffect } from 'react';
import type {
  Co2DataResponse,
  CountryData,
  CountryYearData,
} from '../types/types';
import { DATA_URL } from '../constants';

export function useData() {
  const [data, setData] = useState<Co2DataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(DATA_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData: Co2DataResponse = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCountries = (): CountryData[] => {
    if (!data) return [];

    return Object.entries(data).map(([country, countryData]) => ({
      ...countryData,
      country,
    }));
  };

  const getCountriesByYear = (year: number): CountryYearData[] => {
    if (!data) return [];

    return Object.entries(data)
      .map(([country, countryData]) => {
        const yearData = countryData.data.find((data) => data.year === year);

        return {
          country,
          iso_code: countryData.iso_code,
          year,
          population: yearData?.population,
          co2: yearData?.co2,
          co2_per_capita: yearData?.co2_per_capita,
          methane: yearData?.methane,
          oil_co2: yearData?.oil_co2,
          temperature_change_from_co2: yearData?.temperature_change_from_co2,
          ...yearData,
        };
      })
      .filter(
        (country) =>
          country.population !== undefined ||
          country.co2 !== undefined ||
          country.co2_per_capita !== undefined,
      );
  };

  const getAvailableYears = (): number[] => {
    if (!data) return [];

    const years = new Set<number>();
    Object.values(data).forEach((country) => {
      country.data.forEach((point) => {
        if (point.year) years.add(point.year);
      });
    });

    return Array.from(years).sort((a, b) => b - a);
  };

  return {
    data,
    loading,
    error,
    getCountries,
    getCountriesByYear,
    getAvailableYears,
  };
}
