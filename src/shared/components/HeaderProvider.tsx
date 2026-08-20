import {Header} from "./Header.tsx";
import {Outlet} from "react-router";

export function HeaderProvider() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  )
}