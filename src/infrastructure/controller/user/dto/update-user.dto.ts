interface UpdateUserDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
}

export interface UpdateUserById {
  id: string;
  userData: UpdateUserDto;
}
