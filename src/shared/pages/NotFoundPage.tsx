import { Link } from "@radix-ui/themes"
import {useNavigate} from "react-router";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main>
      <h1 className="text-indigo-700 text-2xl font-bold mb-4">A página não foi encontrada</h1>
      <Link onClick={() => navigate('/')}>Retornar para a página inicial.</Link>
    </main>
  )
}