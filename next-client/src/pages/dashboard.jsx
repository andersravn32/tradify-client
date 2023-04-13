import { Rubik } from "next/font/google";
import { useEffect } from "react";

const rubik = Rubik({ subsets: ["latin"] });

const Dashboard = () => {
    useEffect(() => {
        console.log("Mounted dashboard")
    }, [])
  return (
    <main className={rubik.className}>
      <h1>Dashboard</h1>
    </main>
  );
};

export default Dashboard;
