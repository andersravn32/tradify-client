import { Rubik } from 'next/font/google'
import { useEffect } from "react";

const rubik = Rubik({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    console.log("Mounted home")
}, [])

  return (
    <main className={rubik.className}>
      <h1>Index</h1>
    </main>
  )
}
