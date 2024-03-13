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

    return (
        <div className="sidebar__wrapper">
            <button className="btn" onClick={toggleSidebarcollapse}>
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
                    <li className="sidebar__item">
                        <Link
                            className={`sidebar__link ${router.pathname === "/" ? "sidebar__link--active" : ""
                                }`}
                            href="/"
                        >
                            <span className="sidebar__icon">
                                <AiOutlineHome />
                            </span>
                            <span className="sidebar__name">Inicio</span>
                        </Link>
                    </li>


                    {session ? (
                        <>
                            <li className="sidebar__item">

                                <p className="sidebar__link">Signed in as {session.user.name}
                                </p>
                                <button className="sidebar__link" onClick={() => signOut()}>
                                    <span className="sidebar__icon">
                                        <CiLogout />
                                    </span>
                                    Sign out
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
                            <li className="sidebar__item">
                                <Link
                                    className={`sidebar__link ${router.pathname === "/singup" ? "sidebar__link--active" : ""
                                        }`}
                                    href="/singup"
                                >
                                    <span className="sidebar__icon">
                                        <FiMail />
                                    </span>
                                    <span className="sidebar__name">Registrarse</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;