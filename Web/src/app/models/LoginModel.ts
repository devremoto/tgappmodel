export class LoginModel {
  username: string;
  password: string;
  grant_type: string;
  scope: string;
  client_id: string;
  client_secret;
  state: string;
  nonce: string;
  redirect_uri: string;
  language: string;
}
