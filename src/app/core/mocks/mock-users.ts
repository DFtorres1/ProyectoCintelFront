import {User} from "../models/user.model";

export const USERS: User[] = [
  {id: 1, name: 'Javier', surname: 'Castillo', email: 'jcast@somewhere.com', username: 'jcastillo', password: 'abcd', accessLevel: 1, rol: "Agente"},
  {id: 2, name: 'Jesus', surname: 'Belazquez', email: 'jbel@somewhere.com', username: 'jbelaz', password: 'abcd', accessLevel: 2, rol: "Lider"},
  {id: 3, name: 'Anna', surname: 'Tinto', email: 'atin@somewhere.com', username: 'atinto', password: 'abcd', accessLevel: 3, rol: "Gerente"},
  {id: 4, name: 'Diego', surname: 'Maradona', email: 'maradona@somewhere.com', username: 'maradona', password: 'abcd', accessLevel: 4, rol: "Administrador"},
];
