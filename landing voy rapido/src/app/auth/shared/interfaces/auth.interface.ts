export interface UserLogin {
  email: string;
  password: string;
}

export interface ModifyPassword {
  password: string;
  repeatPassword: string;
}

export interface UserRegister {
  name: string;
  storeName: string;
  email: string;
  phone: string;
  password: string;
}
