import { environment } from '../environments/environment';

const siteUrl = `${environment.HostServer}${environment.HostPort ? `:${environment.HostPort}` : ''}`;
const apiAddress = environment.ApiUrl;
const authorityAddress = environment.Authority;

export interface IConfig {
  siteTile: string;
  logoUrl: string;
  favicon: string;
  useAuthorityServer: boolean;
  siteUrl: string;
  apiAddress: string;
  authorityAddress: string;
  iss: string;
  server: string;
  redirect_url: string;
  jwks_url: string;
  client_id: string;
  response_type: string;
  scope: string;
  post_logout_redirect_uri: string;
  silent_redirect_uri: string;
  allowSilentRenew: boolean;
}

export const Config: IConfig = {
  siteTile: `TUGON - APP MODEL`,
  logoUrl: '/assets/admin/img/logo.png',
  favicon: '/favicon.png',
  useAuthorityServer: environment.UseAuthority,
  siteUrl,
  apiAddress,
  authorityAddress: environment.Authority,
  iss: authorityAddress,
  server: authorityAddress,
  redirect_url: `${siteUrl}/callback`,
  jwks_url: `${authorityAddress}/.well-known/openid-configuration/jwks`,
  client_id: environment.ClientId,
  response_type: 'id_token token',
  scope: 'openid profile offline_access role sso api1',
  post_logout_redirect_uri: `${siteUrl}/logout-callback`,
  silent_redirect_uri: `${siteUrl}/callback&renew=true`,
  allowSilentRenew: true
} as IConfig;
