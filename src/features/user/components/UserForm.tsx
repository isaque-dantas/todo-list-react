import {useState} from "react";
import type {SignUpForm, User} from "../../../shared/types.ts";
import {useGet} from "../../../shared/services/api-service.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@radix-ui/themes";

interface Props {
  onSubmit: (data: SignUpForm) => unknown;
}

export function UserForm({onSubmit}: Props) {
  const [users, setUsers] = useState<User[] | null>(null);
  useGet('users', setUsers);

  const schema = z.object({
    name: (
      z
        .string()
        .nonempty("Você precisa inserir seu nome.")
    ),

    email: (
      z
        .email("Insira um e-mail válido.")
        .nonempty("Você precisa inserir um e-mail.")
    )
      .refine(
        value => users?.every(u => u.email !== value),
        { message: "Esse e-mail já foi inserido!" }
      ),

    password: (
      z
        .string()
        .nonempty("Insira a senha.")
    )
  })

  const {register, formState: {errors}, handleSubmit} = useForm<SignUpForm>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  function shouldDisableSubmit() {
    return (
      errors !== undefined &&
      (
        errors.name !== undefined ||
        errors.email !== undefined ||
        errors.password !== undefined
      )
    )
  }

  return (<article className="flex flex-col gap-6">
      <fieldset className="flex flex-3 flex-col gap-2 max-w-120">
        <label htmlFor="content">Nome</label>
        <input
          id="name"
          {...register("name")}
          placeholder="Insira seu nome aqui..."
          className="flex-1 border px-2 py-1 rounded-lg border-slate-300"
        />
        {
          (errors !== undefined && errors.name !== undefined) &&
            <p className="text-red-700 font-bold text-sm">{errors.name.message}</p>
        }
      </fieldset>

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
      <div className="mt-4">
        <Button
          disabled={shouldDisableSubmit()}
          size="3"
          onClick={handleSubmit(onSubmit)}>Fazer cadastro</Button>
      </div>
    </article>
  )
}