// import type {UserToSend} from "../../shared/types.ts";

import type {User} from "../../shared/types.ts";

export function userToSendFactory(): User {
 return {
   id: '',
   name: '',
   email: '',
   password: '',
 }
}