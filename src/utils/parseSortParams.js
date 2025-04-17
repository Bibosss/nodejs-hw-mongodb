import { SORT_ORDER } from '../constants/index.js';

export const parseSortParams = ({ sortBy, sortOrder }, sortFields) => {
  const parsedSortOrder = SORT_ORDER.includes(sortOrder)
    ? sortOrder
    : SORT_ORDER[0];

  const parsedSortBy = sortFields.includes(sortBy) ? sortBy : '_id';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
