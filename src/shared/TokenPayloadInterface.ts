export interface TokenPayload {
    type: "access";
    sub: number;
    iat: number;
    exp: number;
    iss: string;
  }