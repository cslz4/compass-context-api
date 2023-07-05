import { useContext } from "react";
import { AuthContext, AuthProvider } from "./contexts/auth-context";
import { Form } from "./contexts/form";


function User() {
  const { user } = useContext(AuthContext)

  return <div>{user?.name}</div>
}

function Login() {
  const { signIn, signOut } = useContext(AuthContext)

  return (
    <main className="bg-gray-800 text-white min-w-screen min-h-screen font-sans">
      <div>
        <button type="button" onClick={() => signIn()}>Entrar</button>
      </div>

      <div>
        <button type="button" onClick={signOut}>Sair</button>
      </div>

      <User />
    </main>
  )
}

export default function App() {
  const handleSubmit = (values: Record<string, string>) => {
    console.log(values)
  }

  return (
    <main className="bg-gray-800 text-black h-screen">
      <Form.Root onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Form.Input name="username" />
          <Form.Input name="age" />
          <button type="submit">Enviar</button>
        </div>
      </Form.Root>
    </main>
  )
}
