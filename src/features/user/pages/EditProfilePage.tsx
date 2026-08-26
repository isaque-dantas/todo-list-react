import {UserForm} from "../components/UserForm.tsx";
import {useAuthenticatedUser} from "../../../shared/hooks.ts";
import {Spinner} from "@radix-ui/themes";
import {useNavigate, useSearchParams} from "react-router";
import {put} from "../../../shared/services/api-service.ts";
import type {User} from "../../../shared/types.ts";
import {getIntIfPossible} from "../../../shared/services/cache-service.ts";

export function EditProfilePage() {
  const user = useAuthenticatedUser()
  const [searchParams, _] = useSearchParams()
  const navigate = useNavigate()


  function handleSubmit(editedUser: User) {
    put(
      `users/${user?.id}`,
      {...editedUser, password: getIntIfPossible(editedUser.password)},
      false
    )

    const redirectUrl = searchParams.get("to")
    if (redirectUrl) navigate(redirectUrl)
  }

  return (
    <main>
      <h1 className="text-4xl text-indigo-700 font-medium mb-10">Editar perfil</h1>

      {
        user === null
          ?
          <p className="text-lg">Carregando... <Spinner/></p>

          :

          <UserForm onSubmit={handleSubmit} defaultValues={user}></UserForm>
      }
    </main>
  )
}