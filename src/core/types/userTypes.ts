
export type LoginDto = {
  email: string;
  password: string;
};
export type RegisterDto = {
  name: string;
  email: string;
  password: string;
  phone: string;
};
export type AddUserDto = {
  phone: string;
  role: string;
}