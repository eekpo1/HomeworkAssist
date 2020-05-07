export interface User {
  id: null | string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roles: {
    admin: boolean;
    moderator: boolean;
    verified: boolean;
  };
  token: null | string;
}
