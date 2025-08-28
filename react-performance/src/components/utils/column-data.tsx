import type {
  AvailableColumn,
  Co2DataPoint,
  CountryYearData,
} from '../../shared/types/types';
import { formatValue } from './format-value';

export const columnLabel = (additionalColumns: AvailableColumn[]) => {
  return additionalColumns
    .filter((column) => column.selected)
    .map((column) => <th key={column.key}>{column.label}</th>);
};

export const columnData = (
  additionalColumns: AvailableColumn[],
  data: CountryYearData | Co2DataPoint,
) => {
  return additionalColumns
    .filter((column) => column.selected)
    .map((column) => (
      <td key={column.key}>
        {formatValue(data[column.key] as number | undefined)}
      </td>
    ));
};
