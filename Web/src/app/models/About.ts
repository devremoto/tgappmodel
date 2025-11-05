import { User } from 'oidc-client';

export class About {
  id?: string;
  title: string;
  image: string;
  description: string;

  constructor() {
  }
}

export class UserData extends User {
  name?: string;
  email?: string;
  picture?: string;
}
