import {UserForm} from "../components/UserForm.tsx";
import type {User} from "../../../shared/types.ts";
import {useNavigate} from "react-router";
import {useUserCreate} from "../api/mutations.ts";

export function SignUpPage() {
  const navigate = useNavigate();
  const {mutate} = useUserCreate()

  async function onSubmit(form: User) {
    mutate(form)
    navigate('/login')
  }

  return (
    <main>
      <h1 className="text-4xl font-medium text-indigo-700 mb-10">Fazer cadastro</h1>
      <UserForm onSubmit={onSubmit}></UserForm>
    </main>
  )
}