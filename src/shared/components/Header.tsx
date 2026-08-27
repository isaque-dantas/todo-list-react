import {NavOption} from "./NavOption.tsx";
import {isAuthenticated, logout} from "../services/auth-service.ts";
import {Button, DropdownMenu} from "@radix-ui/themes";
import {useNavigate} from "react-router";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {useQueryClient} from "@tanstack/react-query";

export function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleClick() {
    // queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEY.ALL })
    // queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.ALL })
    // queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.ALL })
    // console.log('before', queryClient.getQueryData(GROUP_QUERY_KEY.LIST(true)));
    // queryClient.invalidateQueries()
    // console.log('after', queryClient.getQueryState(GROUP_QUERY_KEY.LIST(true)));
    queryClient.clear()
    console.log('invalidated!')
    logout();
    //
    // queryClient.invalidateQueries({queryKey: ["group"]})
    navigate("/login")
  }

  function getNavOptions() {
    return isAuthenticated() ?
      [
        {to: '/', label: 'Ver tarefas'},
        {to: '/tarefas/adicionar', label: 'Adicionar Tarefa'},
        {to: '/grupos/adicionar', label: 'Adicionar Grupo'},
        {to: '/perfil', label: 'Perfil'},
      ]
      :
      [
        {to: '/login', label: 'Fazer Login'},
        {to: '/cadastro', label: 'Cadastrar-se'},
      ];
  }

  return (
    <header className={"flex items-center justify-between py-8 bg-slate-50 shadow-md border-b border-slate-200"}>
      <p className={"font-bold text-indigo-700 text-2xl"}>Lista de tarefas</p>
      <nav className="md:hidden">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              <HamburgerMenuIcon/>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {
              getNavOptions().map((option, i) => (
                <DropdownMenu.Item
                  key={i}
                  onClick={() => navigate(option.to)}
                >
                  {option.label}
                </DropdownMenu.Item>
              ))
            }

            { isAuthenticated() && <Button onClick={handleClick} variant="soft">Sair</Button> }
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </nav>

      <nav className="hidden md:flex items-center gap-6">
        {
          getNavOptions().map((option, i) => <NavOption key={i} {...option}/>)
        }
        { isAuthenticated() && <Button onClick={handleClick} variant="soft">Sair</Button> }
      </nav>
    </header>
  )
}