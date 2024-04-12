export interface UsersParamsHttpDto {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  skip: number;
  limit: number;
}
