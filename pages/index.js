import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (

    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <a className="bg-black text-white p-2 rounded">
          Adios mundo jejejejeje
        </a>
      </div>
      <p>Hola Mundo</p>
    </main>
  );
}
