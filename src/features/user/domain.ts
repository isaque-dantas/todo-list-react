import type {User} from "../../shared/types.ts";

export function userToSendFactory(): User {
 return {
   id: '',
   name: '',
   email: '',
   password: '',
 }
}

export function getIntIfPossible(value: string | number) {
  const parsed = parseInt(value.toString());
  return Number.isNaN(parsed) ? value : parsed;
}