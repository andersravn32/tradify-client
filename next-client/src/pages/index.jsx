import { Rubik } from 'next/font/google'
import FormSignin from '../components/Forms/Signin'

const rubik = Rubik({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={rubik.className}>
      <FormSignin />
    </main>
  )
}
