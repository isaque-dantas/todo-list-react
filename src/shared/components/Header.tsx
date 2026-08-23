import {NavOption} from "./NavOption.tsx";
import {isAuthenticated, logout} from "../services/auth-service.ts";
import {Button} from "@radix-ui/themes";
import {useNavigate} from "react-router";

export function Header() {
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/login")
  }

  return (
    <header className={"flex items-center justify-between py-8 bg-slate-50 shadow-md border-b border-slate-200"}>
      <p className={"font-bold text-indigo-700 text-2xl"}>Lista de tarefas</p>
      <nav className={"flex gap-8 items-center"}>
        <NavOption to="/" label="Ver tarefas"/>
        <NavOption to="/tarefas/adicionar" label="Adicionar Tarefa"/>
        <NavOption to="/grupos/adicionar" label="Adicionar Grupo"/>
        {/*<NavOption to="/ver-tarefas-interativas" label="Ver tarefas interativas"/>*/}
        {
          isAuthenticated() ?
            <>
              <NavOption to="/perfil" label="Perfil"></NavOption>
              <Button onClick={handleClick} variant="soft">Sair</Button>
            </>

            :

            <>
              <NavOption to="/login" label="Fazer Login"/>
              <NavOption to="/cadastro" label="Cadastrar-se"/>
            </>
        }
      </nav>
    </header>
  )
}