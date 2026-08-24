import {useState} from "react";
import type {UserToSend, User} from "../../../shared/types.ts";
import {useGet} from "../../../shared/hooks.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@radix-ui/themes";
import {userToSendFactory} from "../domain.ts";

interface Props {
  onSubmit: (data: UserToSend) => unknown;
  defaultValues?: UserToSend
}

export function UserForm({onSubmit, defaultValues}: Props) {
  const [users, setUsers] = useState<User[] | null>(null);
  useGet('users', setUsers, false);

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
        value => {
          return (
            users === null

            ||

            users
              .filter(
                u => defaultValues === undefined ||  u.email !== defaultValues.email
              )
              .every(u => u.email !== value)
          )
        } ,
        { message: "Esse e-mail já foi inserido!" }
      ),

    password: (
      z
        .string()
        .nonempty("Insira a senha.")
    )
  })

  const {register, formState: {errors}, handleSubmit} = useForm<UserToSend>({
    resolver: zodResolver(schema),
    defaultValues: (defaultValues ?? userToSendFactory()),
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
          onClick={handleSubmit(onSubmit)}>Enviar informações</Button>
      </div>
    </article>
  )
}