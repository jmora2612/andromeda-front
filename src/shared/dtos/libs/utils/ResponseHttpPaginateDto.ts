export interface ResponseHttpPaginateDto<T> {
  data: T;
  skip: number;
  limit: number;
  count: number;
  message: string;
}
