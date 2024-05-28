import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { BsPostcardFill } from "react-icons/bs";
import { HiDocumentPlus } from "react-icons/hi2";
import { FaRegFolderOpen } from "react-icons/fa";
import { VscReport } from "react-icons/vsc";

const Sidebar = () => {
    const router = useRouter();
    const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);
    const { data: session } = useSession();

    const btnClass = isCollapsed ? 'btn-collapsed' : 'btn-expanded';

    return (
        <div className={`sidebar__wrapper flex-col`}>
            <button className={`btn ${btnClass}`} onClick={toggleSidebarcollapse}>
                {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
            </button>
            <aside className="sidebar" data-collapse={isCollapsed}>
                <div className="sidebar__top">
                    <Image
                        width={80}
                        height={80}
                        className="sidebar__logo"
                        src="/logo.png"
                        alt="logo"
                    />
                    <p className="sidebar__logo-name">UniTalent</p>
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
                                        <BsPostcardFill />
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
                                                <FaUsers />
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
                                                <VscReport />
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
                                                        <BsPeople />
                                                    </span>
                                                    <span className="sidebar__name">Comunidad</span>
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="sidebar__item">
                                                <Link
                                                    className={`sidebar__link ${router.pathname === `/Posts/CrearOferta` ? `sidebar__link--active` : ""
                                                        }`}
                                                    href={`/Posts/CrearOferta`}
                                                >
                                                    <span className="sidebar__icon">
                                                        <HiDocumentPlus />
                                                    </span>
                                                    <span className="sidebar__name">Nueva oferta</span>
                                                </Link>
                                            </li>
                                            <li className="sidebar__item">
                                                <Link
                                                    className={`sidebar__link ${router.pathname === `/Posts/OfertasHechas` ? `sidebar__link--active` : ""
                                                        }`}
                                                    href={`/Posts/OfertasHechas`}
                                                >
                                                    <span className="sidebar__icon">
                                                        <FaRegFolderOpen />
                                                    </span>
                                                    <span className="sidebar__name">Ofertas hechas</span>
                                                </Link>
                                            </li>
                                        </>
                                    )}

                                    <li className="sidebar__item">
                                        <Link
                                            className={`sidebar__link ${router.pathname === `/Users/${session.user.id}` ? `sidebar__link--active` : ""
                                                }`}
                                            href={`/Users/${session.user.id}`}
                                        >
                                            <span className="sidebar__icon">
                                                <CgProfile />
                                            </span>
                                            <span className="sidebar__name">Perfil</span>
                                        </Link>
                                    </li>

                                </>

                            )}
                            <li className="sidebar__item__SignOut">
                                <button className="sidebar__link" onClick={() => signOut({ callbackUrl: '/' })}>
                                    <span className="sidebar__icon">
                                        <CiLogout />
                                    </span>
                                    <span className="sidebar__name">Sign Out</span>
                                </button>
                            </li>
                        </>
                    ) : (null)}
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;