export interface IAuthPayload {
  email: string;
  sub: string;
}

export interface IAuthResponse {
  token: string;
}
