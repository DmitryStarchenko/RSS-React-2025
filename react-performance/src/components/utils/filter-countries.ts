export const filterCountries = <
  T extends { country: string; iso_code?: string },
>(
  countries: T[],
  searchTerm: string,
): T[] => {
  let filteredCountries = [...countries];

  if (searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    filteredCountries = filteredCountries.filter((country) =>
      country.country.toLowerCase().includes(searchTermLower),
    );
  }

  return filteredCountries;
};
