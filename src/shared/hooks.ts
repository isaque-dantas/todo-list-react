import {getToken} from "./services/auth-service.ts";
import {useUserDetail} from "../features/user/api/queries.ts";

export function useAuthenticatedUser() {
  const userId = getToken()
  const {data: user, isLoading} = useUserDetail(userId ?? '');
  return (
    userId === null ||
    isLoading ||
    user === undefined
  )
    ? null
    : user
}
