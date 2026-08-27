import { useAuthenticatedUser } from "../../../shared/hooks"
import {Button, DataList} from "@radix-ui/themes";
import {useNavigate} from "react-router";
import {Loading} from "../../../shared/components/Loading.tsx";

export function ProfilePage() {
  const user = useAuthenticatedUser()
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/perfil/editar?to=/perfil`)
  }

  if (user === null) return <Loading/>

  return (
    <main>
      <h1 className="text-4xl text-indigo-700 font-medium">Perfil</h1>
      <section className="mt-8">
        <DataList.Root size="3">
          <DataList.Item>
            <DataList.Label minWidth="88px">Nome</DataList.Label>
            <DataList.Value>{user.name}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">E-mail</DataList.Label>
            <DataList.Value>
              {user.email}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </section>

      <article className="mt-10">
        <Button onClick={handleClick}>Editar perfil</Button>
      </article>
    </main>
  )
}