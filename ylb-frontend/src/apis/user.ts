import { post } from "@/utils/axios";


interface LoginParams {
  phone: string;
  password: string;
}


interface RegisterParams {
  phone: string;
  password: string;
}




export const login = (loginParams: LoginParams) => {
  return post({ url: 'api/users/login', data: loginParams })
}


export const register = (registerParams: RegisterParams) => {
  return post({ url: 'api/users/register', data: registerParams })
}