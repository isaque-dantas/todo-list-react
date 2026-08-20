import {NavOption} from "./NavOption.tsx";

export function Header() {
  return (
    <header className={"flex items-center justify-between py-8 bg-slate-50 shadow-md border-b border-slate-200"}>
      <p className={"font-bold text-indigo-700 text-2xl"}>Lista de tarefas</p>
      <nav className={"flex gap-8 items-center"}>
        <NavOption to="/" label="Ver tarefas"/>
        <NavOption to="/adicionar-tarefas" label="Adicionar tarefas"/>
        <NavOption to="/login" label="Fazer Login"/>
        <NavOption to="/cadastro" label="Cadastrar-se"/>
      </nav>
    </header>
  )
}