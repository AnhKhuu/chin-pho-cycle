'use client';

import { TFilterItem, TInitialFilters, TQueryParamsList } from '@/utils/types';

export interface IFilterListProps {
  handleSubmit: (fields: TQueryParamsList) => void;
  filterList: TFilterItem[];
  initialFilters: TInitialFilters;
}
