import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router";
import {isAuthenticated} from "../services/auth-service.ts";

export function AuthRequiredProvider() {
  const navigate = useNavigate();

  useEffect(
    () => {
      if (!isAuthenticated()) navigate("/login");
    },
    [navigate]
  )

 return <Outlet />;
}