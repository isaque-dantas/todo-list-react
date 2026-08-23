import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {LoginForm} from "../../../shared/types.ts";
import {Button} from "@radix-ui/themes";
import {login} from "../../../shared/services/auth-service.ts";
import {useNavigate} from "react-router";
import {Link} from '@radix-ui/themes';

export function LoginPage() {
  const schema = z.object({
    email: (
      z
        .email("Insira um e-mail válido.")
        .nonempty("Você precisa inserir um e-mail.")
    ),

    password: (
      z
        .string()
        .nonempty("Insira a senha.")
    )
  })

  const {register, formState: {errors}, handleSubmit} = useForm<LoginForm>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const navigate = useNavigate()

  async function onSubmit(form: LoginForm) {
    const loginResult = await login(form)
    if (loginResult) alert(loginResult.message);

    else {
      navigate('/')
    }
  }

  function shouldDisableSubmit(): boolean {
    return (
      errors !== undefined &&
      (
        errors.email !== undefined ||
        errors.password !== undefined
      )
    )
  }

  return (
    <main className="max-w-xl mx-auto">
      <h1 className="text-4xl font-medium text-indigo-700 mb-10">Faça seu login</h1>
      <article className="flex flex-col gap-6">
        <fieldset className="flex flex-3 flex-col gap-2 max-w-120">
          <label htmlFor="content">E-mail</label>
          <input
            id="email"
            {...register("email")}
            placeholder="Insira o e-mail aqui..."
            className="flex-1 border px-2 py-1 rounded-lg border-slate-300"
          />
          {
            (errors !== undefined && errors.email !== undefined) &&
              <p className="text-red-700 font-bold text-sm">{errors.email.message}</p>
          }
        </fieldset>
        <fieldset className="flex flex-3 flex-col gap-2 max-w-120">
          <label htmlFor="content">Senha</label>
          <input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Insira a senha aqui..."
            className="flex-1 border px-2 py-1 rounded-lg border-slate-300"
          />
          {
            (errors !== undefined && errors.password !== undefined) &&
              <p className="text-red-700 font-bold text-sm">{errors.password.message}</p>
          }
        </fieldset>

        <p>Não possui conta? <Link onClick={() => navigate("/cadastro")}>Cadastre-se agora mesmo.</Link></p>

        <Button
          disabled={shouldDisableSubmit()}
          size="3"
          onClick={handleSubmit(onSubmit)}>Enviar</Button>
      </article>
    </main>
  )
}