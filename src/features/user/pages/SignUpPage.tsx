import {UserForm} from "../components/UserForm.tsx";
import type {User} from "../../../shared/types.ts";
import {post} from "../../../shared/services/api-service.ts";
import {useNavigate} from "react-router";

import {getIntIfPossible} from "../../../shared/services/cache-service.ts";
import {useCacheDispatcher} from "../../../shared/contexts/cache-context.ts";

export function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useCacheDispatcher()

  async function onSubmit(form: User) {
    const password = getIntIfPossible(form.password)
    post('users', {...form, password})
      .then(
        data => dispatch!({
          type: 'add',
          entityName: 'users',
          data: [data],
          id: data.id,
        })
      )
    navigate('/login')
  }

  return (
    <main>
      <h1 className="text-4xl font-medium text-indigo-700 mb-10">Fazer cadastro</h1>
      <UserForm onSubmit={onSubmit}></UserForm>
    </main>
  )
}