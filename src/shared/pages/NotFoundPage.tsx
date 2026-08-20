import { Link } from "react-router"

export function NotFoundPage() {
  return (
    <main>
      <h1 className="text-indigo-700 text-2xl font-bold mb-4">A página não foi encontrada</h1>
      <Link to="/">Retornar para a página inicial</Link>
    </main>
  )
}