import type { CountryData, CountryYearData } from '../../shared/types/types';
import { filterCountries } from './filter-countries';

const compareValues = (
  firstValue: string | number,
  secondValue: string | number,
  sortOrder: 'asc' | 'desc',
): number => {
  if (sortOrder === 'asc') {
    return firstValue > secondValue ? 1 : -1;
  } else {
    return firstValue < secondValue ? 1 : -1;
  }
};

export const getFilteredAndSortedCountries = (
  allCountries: CountryData[],
  countriesByYear: CountryYearData[],
  searchTerm: string,
  showYearlyData: boolean,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
  selectedYear: number,
) => {
  if (showYearlyData) {
    const filteredCountries = filterCountries(allCountries, searchTerm);

    return filteredCountries.sort((firstCountry, secondCountry) => {
      let firstValue: string | number;
      let secondValue: string | number;

      if (sortBy === 'population') {
        const firstCountryData = firstCountry.data.find(
          (yearData) => yearData.year === selectedYear,
        );
        const secondCountryData = secondCountry.data.find(
          (yearData) => yearData.year === selectedYear,
        );
        firstValue = firstCountryData?.population ?? 0;
        secondValue = secondCountryData?.population ?? 0;
      } else {
        firstValue = firstCountry.country;
        secondValue = secondCountry.country;
      }

      return compareValues(firstValue, secondValue, sortOrder);
    });
  } else {
    const filteredCountries = filterCountries(countriesByYear, searchTerm);

    return filteredCountries.sort((firstCountry, secondCountry) => {
      let firstValue: string | number;
      let secondValue: string | number;

      switch (sortBy) {
        case 'population':
          firstValue = firstCountry.population ?? 0;
          secondValue = secondCountry.population ?? 0;
          break;
        case 'co2':
          firstValue = firstCountry.co2 ?? 0;
          secondValue = secondCountry.co2 ?? 0;
          break;
        case 'co2_per_capita':
          firstValue = firstCountry.co2_per_capita ?? 0;
          secondValue = secondCountry.co2_per_capita ?? 0;
          break;
        default:
          firstValue = firstCountry.country;
          secondValue = secondCountry.country;
      }

      return compareValues(firstValue, secondValue, sortOrder);
    });
  }
};
