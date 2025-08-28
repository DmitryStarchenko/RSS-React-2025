import type { AvailableColumn } from './types/types';

export const availableAdditionalColumns: AvailableColumn[] = [
  { key: 'methane', label: 'Methane', selected: false },
  { key: 'oil_co2', label: 'Oil CO2', selected: false },
  {
    key: 'temperature_change_from_co2',
    label: 'Temp Change from CO2',
    selected: false,
  },
  { key: 'cement_co2', label: 'Cement CO2', selected: false },
  { key: 'coal_co2', label: 'Coal CO2', selected: false },
  { key: 'flaring_co2', label: 'Flaring CO2', selected: false },
  { key: 'gas_co2', label: 'Gas CO2', selected: false },
];

export const DATA_URL =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';
