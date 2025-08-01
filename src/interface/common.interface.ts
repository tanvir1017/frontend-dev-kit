export interface I_PaginationResponse<T> {
  meta: {
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
  };

  result: T;
}
