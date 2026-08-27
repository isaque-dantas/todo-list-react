import {UserForm} from "../components/UserForm.tsx";
import {useAuthenticatedUser} from "../../../shared/hooks.ts";
import {useNavigate, useSearchParams} from "react-router";
import type {User} from "../../../shared/types.ts";
import {useUserRemove, useUserUpdate} from "../api/mutations.ts";
import {Button} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {Loading} from "../../../shared/components/Loading.tsx";

export function EditProfilePage() {
  const user = useAuthenticatedUser()
  const [searchParams, _] = useSearchParams()
  const navigate = useNavigate()
  const {mutate: update} = useUserUpdate()
  const {mutate: remove} = useUserRemove()

  function handleSubmit(editedUser: User) {
    update(editedUser)
    const redirectUrl = searchParams.get("to")
    if (redirectUrl) navigate(redirectUrl)
  }

  function handleDelete() {
    if (user === null) return;
    remove(user.id)
    navigate('/login')
  }

  if (user === null) return <Loading />

  return (
    <main>
      <article className="flex gap-10 items-center mb-10">
        <h1 className="text-4xl font-medium text-indigo-700">Editar perfil</h1>
        <Button onClick={handleDelete} variant={"surface"} color="ruby">Excluir <TrashIcon/></Button>
      </article>
      <UserForm onSubmit={handleSubmit} defaultValues={user}></UserForm>
    </main>
  )
}