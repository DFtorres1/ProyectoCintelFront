import { Users } from "./tables.models/users.model";

export class Session {
  public token: string;
  public user: Users;
}
