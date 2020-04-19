export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  roles: {
    admin: boolean;
    moderator: boolean;
    verified: boolean;
  };
}
