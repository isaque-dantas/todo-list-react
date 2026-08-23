import {UserForm} from "../components/UserForm.tsx";
import type {UserToSend} from "../../../shared/types.ts";
import {post} from "../../../shared/services/api-service.ts";
import {useNavigate} from "react-router";

export function SignUpPage() {
  const navigate = useNavigate();

  async function onSubmit(form: UserToSend) {
    const password = Number.isNaN(parseInt(form.password)) ? form.password : parseInt(form.password);
    post('users', {...form, password})
    navigate('/login')
  }

  return (
    <main>
      <h1 className="text-4xl font-medium text-indigo-700 mb-10">Fazer cadastro</h1>
      <UserForm onSubmit={onSubmit}></UserForm>
    </main>
  )
}