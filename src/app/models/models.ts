export interface Token {
    accessToken: string
    refreshToken: string
    accessTokenExpirationDate: string
    refreshTokenExpirationDate: string
  }

  export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    roles:  ('Admin' | 'User' )[];
  }
