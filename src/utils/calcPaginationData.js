export const calcPaginationData = ({ page, perPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const hasPrevPAge = page > 1;
  const hasNextPage = page < totalPages;

  return {
    totalPages,
    hasPrevPAge,
    hasNextPage,
  };
};
