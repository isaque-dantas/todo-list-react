import {Button} from "@radix-ui/themes";
import {NavLink} from "react-router";

export function NavOption({to, label}: {to: string, label: string}) {
  return (
    <NavLink to={to}>
      {
        ({isActive}) => (
          isActive ?
            <Button size="3" variant={"soft"}>{label}</Button>
            :
            <Button size="3" variant={"ghost"} ><span className="underline">{label}</span></Button>
        )
      }
    </NavLink>
  )
}