import Link from 'next/link'
import Image from "next/image"
import { Disclosure, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const options = [
        { id: 1, name: 'Publicaciones', href: '/Publicaciones', rol: '' },
        { id: 2, name: 'Usuarios', href: '/Admins/Usuarios', rol: 'Admin' },
        { id: 3, name: 'Reportes', href: '/Admins/Reportes', rol: 'Admin' },
        { id: 4, name: 'Comunidad', href: '/Users/Comunidad', rol: 'Estudiante' },
        { id: 5, name: 'Nueva oferta', href: '/Posts/CrearOferta', rol: 'Empresa' },
        { id: 6, name: 'Ofertas hechas', href: '/Posts/OfertasHechas', rol: 'Empresa' },
        { id: 7, name: 'Perfil', href: '/Users/' + session?.user?.id, rol: 'User' },
        { id: 8, name: 'Cerrar sesión', href: 'LogOff', rol: '' }
    ]

    const selectedOption = (href) => {
        if (href === 'LogOff') {
            signOut({ callbackUrl: '/' })
        } else {
            router.push(href);
        }
    }

    return (
        <div className="w-full">
            <nav className="container relative flex flex-wrap items-center justify-between p-5 mx-auto bg-jkb-primary">
                <div className="flex justify-between w-full">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <div>
                                    <Link href="/">
                                        <span>
                                            <Image
                                                src="/logo.png"
                                                alt="Logo"
                                                width="32"
                                                height="32"
                                                className="w-8"
                                            />
                                        </span>
                                    </Link>
                                </div>
                            </>
                        )}
                    </Disclosure>

                    <div>
                        <Listbox onChange={selectedOption}>
                            <ListboxButton className="text-white font-bold ">
                                ☰
                            </ListboxButton>
                            <ListboxOptions anchor="bottom">
                                {options.map((option) => {
                                    if ((session?.user?.roles[0] === "Admin" && (option.rol === '' || option.rol === 'Admin')) ||
                                        (session?.user?.roles[1] === "Estudiante" && (option.rol === '' || option.rol === 'Estudiante')) ||
                                        (session?.user?.roles[1] === "Empresa" && (option.rol === '' || option.rol === 'Empresa')) ||
                                        (session?.user?.roles[0] === "User" && option.rol === '')) {
                                        return (
                                            <ListboxOption key={option.id} value={option.href}
                                                className={`group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 border-b ${router.pathname === option.href ? "bg-jkb-primary" : "bg-white"}`}>
                                                <p className='p-1'>{option.name}</p>
                                            </ListboxOption>
                                        )
                                    }
                                })}
                            </ListboxOptions>
                        </Listbox>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;