import type {UserToSend} from "../../shared/types.ts";

export function userToSendFactory(): UserToSend {
 return {
   key: '',
   email: '',
   password: '',
 }
}