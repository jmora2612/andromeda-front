export interface ParamsHttpPaginateDto {
  name?: string;
  skip: number;
  limit: number;
  stage?: number;
  history?: number;
}
