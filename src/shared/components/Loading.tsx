import {Spinner} from "@radix-ui/themes";

export function Loading() {
  return (
    <main className="flex gap-2 items-center">
      <p className="text-lg">Carregando...</p>
      <Spinner/>
    </main>
  )
}