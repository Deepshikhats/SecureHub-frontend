interface LoginUserCredentials {
  email: string;
  password: string;
}

interface SignupUserCredentials extends LoginUserCredentials {
  name: string;
}
interface IUserStatus {
  resp: boolean;
  status: boolean;
  message?: string;
}

interface IUser {
  name: string;
  email: string;
}
