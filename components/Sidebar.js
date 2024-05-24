import Image from "next/image";

import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FiMail } from "react-icons/fi";

const Sidebar = () => {
    const router = useRouter();
    const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);
    const { data: session } = useSession();

    const btnClass = isCollapsed ? 'btn-collapsed' : 'btn-expanded';

    return (
        <div className="sidebar__wrapper">
            <button className={`btn ${btnClass}`} onClick={toggleSidebarcollapse}>
                {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
            </button>
            <aside className="sidebar" data-collapse={isCollapsed}>
                <div className="sidebar__top">
                    <Image
                        width={80}
                        height={80}
                        className="sidebar__logo"
                        src="/logo.jpg"
                        alt="logo"
                    />
                    <p className="sidebar__logo-name">JKB Jobs</p>
                </div>
                <ul className="sidebar__list">

                    {session ? (
                        <>
                            <li className="sidebar__item">
                                <Link
                                    className={`sidebar__link ${router.pathname === "/Publicaciones" ? "sidebar__link--active" : ""
                                        }`}
                                    href="/Publicaciones"
                                >
                                    <span className="sidebar__icon">
                                        <AiOutlineHome />
                                    </span>
                                    <span className="sidebar__name">Publicaciones</span>
                                </Link>
                            </li>

                            {session && session.user && session.user.roles && session.user.roles[0] === "Admin" ? (
                                <>
                                    <li className="sidebar__item">
                                        <Link
                                            className={`sidebar__link ${router.pathname === "/Admins/Usuarios" ? "sidebar__link--active" : ""
                                                }`}
                                            href="/Admins/Usuarios"
                                        >
                                            <span className="sidebar__icon">
                                                <FiMail />
                                            </span>
                                            <span className="sidebar__name">Usuarios</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar__item">
                                        <Link
                                            className={`sidebar__link ${router.pathname === "/Admins/Reportes" ? "sidebar__link--active" : ""
                                                }`}
                                            href="/Admins/Reportes"
                                        >
                                            <span className="sidebar__icon">
                                                <FiMail />
                                            </span>
                                            <span className="sidebar__name">Reportes</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {session && session.user && session.user.roles && session.user.roles[1] === "Estudiante" ? (
                                        <>
                                            <li className="sidebar__item">
                                                <Link
                                                    className={`sidebar__link ${router.pathname === "/Users/Comunidad" ? `sidebar__link--active` : ""
                                                        }`}
                                                    href="/Users/Comunidad"
                                                >
                                                    <span className="sidebar__icon">
                                                        <FiMail />
                                                    </span>
                                                    <span className="sidebar__name">Comunidad</span>
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}

                                    <li className="sidebar__item">
                                        <Link
                                            className={`sidebar__link ${router.pathname === `/Users/${session.user.id}` ? `sidebar__link--active` : ""
                                                }`}
                                            href={`/Users/${session.user.id}`}
                                        >
                                            <span className="sidebar__icon">
                                                <FiMail />
                                            </span>
                                            <span className="sidebar__name">Perfil</span>
                                        </Link>
                                    </li>
                                </>

                            )}
                            <li className="sidebar__item__SignOut">
                                <button className="sidebar__link" onClick={() => signOut()}>
                                    <span className="sidebar__icon">
                                        <CiLogout />
                                    </span>
                                    <span className="sidebar__name">Sign Out</span>
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="sidebar__item">

                                <button className="sidebar__link" onClick={() => signIn()}>
                                    <span className="sidebar__icon">
                                        <BsPeople />
                                    </span>
                                    Iniciar Sesion
                                </button>
                            </li>

                        </>
                    )}
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;