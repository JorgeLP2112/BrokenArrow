import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CldImage } from 'next-cloudinary';

const Home = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState();
    const isLoading = status === 'loading' || !user;

    useEffect(() => {
        if (status !== 'loading') {
            if (!session) {
                router.push('../');
            } else if (session.user.isNewUser === true) {
                router.push('/ProfileForm/');
            }
        }
    }, [session, router, status]);

    useEffect(() => {
        if (router.isReady) {
            const fetchUser = async () => {
                const response = await fetch(`/api/Users/profile?profile=${router.query.Profile}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUser(data);
                } else {
                    console.error('Failed to fetch user');
                }
            };
            fetchUser();
        }
    }, [router.isReady, router.query.Profile]);

    if (isLoading) {
        return <BaseLayout><div>Loading...</div></BaseLayout>;
    } else {
        return <BaseLayout>

            <div className="bg-gray-100 p-4"> {/*Contenedor general del perfil*/}

                <div className="border-1 shadow-lg shadow-gray-400 rounded-lg">
{/*------------------Contenedor superior del perfil*/}
                    <div className="flex h-auto sm:items-center rounded-t-lg bg-top-color sm:px-2 w-full pt-7 pb-5">
        {/*-------------Contenedor de foto de perfil */}
                        <div className="h-48 w-48 overflow-hidden sm:rounded-full sm:relative sm:p-0 left-10 p-3">
                            <CldImage width="600" height="600" src={user?.profilePicture} />
                        </div>

                        <div className="w-2/3 sm:text-center pl-5 text-start">
                            <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
                                {user?.type === "Estudiante" ? user?.name + " " + user?.lastname : user?.company_name}
                            </p>
                            {user?.type === "Estudiante" ? <p className="text-lg text-heading text-jkb-tertiary font-bold">{user?.education?.degree}</p> : null}
                        </div>

                    </div>
                    {/*Contenedor de la parte baja del perfil */}
                    <div className="p-2">

                        <div className="flex flex-col sm:flex-row w-full">

                            {user?.type === "Estudiante" ? (
    /*------------------------------Contenedor de la columna izquierda del perfil */
                                <>
                                    <div className="flex flex-col sm:w-1/3 ml-8 mr-3">

                                        {/*
                            <div className="py-3 sm:order-none order-3">
                                <h2 className="text-lg font-poppins font-bold text-top-color">My Contact</h2>
                                <div className="border-2 w-20 border-top-color my-3"></div>

                                <div>
                                    <div className="flex items-center my-1">
                                        <Link href="youtube.com" className="w-6 text-gray-700 hover:text-orange-600"><svg
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4">
                                            <path fill="currentColor"
                                                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
                                            </path>
                                        </svg>
                                        </Link>
                                        <div className="ml-2 truncate">amitpachange@gmail.com</div>
                                    </div>
                                    <div className="flex items-center my-1">
                                        <Link className="w-6 text-gray-700 hover:text-orange-600"
                                            href="facebook.com" target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-4">
                                                <path fill="currentColor"
                                                    d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                                                </path>
                                            </svg>
                                        </Link>
                                        <div>sale galli latur</div>
                                    </div>
                                </div>
                            </div>
                            */}
                {/*---------------------Contenedor de las Skills */}
                                        <div className="py-3 sm:order-none order-2">
                                            <h2 className="text-lg font-poppins font-bold text-top-color">Skills</h2>
                                            <div className="border-2 w-32 border-jkb-primary my-3"></div>

                                            <div>
                                                {user?.skills?.map((data, index) => (
                                                    <div className="flex items-center my-1" key={index}>
                                                        <div className="ml-2 text-gray-700 hover:text-jkb-primary">
                                                            <p>{data}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                {/*-------------------------Contenedor de la Educación */}
                                        <div className="py-3 sm:order-none order-1">
                                            <h2 className="text-lg font-poppins font-bold text-top-color">Educación</h2>
                                            <div className="border-2 w-32 border-jkb-primary my-3"></div>

                                            <div className="flex flex-col space-y-1">

                                                {/*user?.education.map((data, index) => ())*/}
                                                <div className="flex flex-col" >
                                                    <p className="font-semibold text-s text-gray-700">{user?.education.period}</p>
                                                    <p className="text-sm font-medium">
                                                        <span className="text-jkb-tertiary font-bold">{user?.education.school}. </span>
                                                        {user?.education.degree}
                                                    </p>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                {/*-------------------------Contenedor de la columna derecha del perfil */}
                                    <div className="flex flex-col sm:w-2/3 order-first sm:order-none">

                    {/*-----------------Contenedor del apartado Sobre mi */}
                                        <div className="py-3">
                                            <h2 className="text-lg font-poppins font-bold text-top-color">Sobre mí</h2>
                                            <div className="border-2 w-32 border-jkb-primary my-3"></div>
                                            <p>{user?.about}</p>
                                        </div>

                                        <div className="py-3">
                                            <h2 className="text-lg font-poppins font-bold text-top-color">Experiencia profesional</h2>
                                            <div className="border-2 w-32 border-jkb-primary my-3"></div>
                                            <div className="flex flex-col">

                                                {user?.work_experience?.map((experience, index) => (
                                                    <div className="flex flex-col" key={index}>
                                                        <h2 className="text-lg font-bold text-gray-700">{experience.company}</h2>
                                                        <p className="font-semibold text-sm text-gray-700">{experience.period}</p>
                                                        <h3 className="font-semibold text-sm text-gray-700 mt-2 mb-1">{experience.position}</h3>
                                                        <p className="text-sm list-disc pl-4 space-y-1">{experience.description}</p>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>

                                        <div className="py-3">
                                            <h2 className="text-lg font-poppins font-bold text-top-color">Projectos</h2>
                                            <div className="border-2 w-32 border-jkb-primary my-3"></div>

                                            <div className="flex flex-col">

                                                <div className="flex flex-col">
                                                    <p className="text-lg font-semibold text-gray-700">Projecto_1</p>
                                                    <p className="font-normal text-sm text-gray-700 mb-1 pl-2">Descripcion</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col sm:w-1/3 sm:ml-4">
                                        <h2 className="text-xl font-bold">Información de contacto</h2>

                                        <h3 className="text-lg font-semibold mt-2">Dirección de correo</h3>
                                        <p>{user?.contact_information?.email}</p>

                                        <h3 className="text-lg font-semibold mt-2">Teléfono</h3>
                                        <p>{user?.contact_information?.phone}</p>
                                    </div>

                                    <div className="flex flex-col sm:w-1/3">
                                        <h2 className="text-xl font-bold">Sobre nosotros</h2>
                                        <p>{user?.company_description}</p>

                                        <h2 className="text-xl font-bold mt-4">Sector</h2>
                                        <p>{user?.industry}</p>

                                        <h2 className="text-xl font-bold mt-4">Dirección</h2>
                                        <p>{user?.location}</p>

                                        <h2 className="text-xl font-bold mt-4">Sitio oficial</h2>
                                        <a href={user?.website} target="_blank" rel="noopener noreferrer">{user?.website}</a>
                                    </div>
                                </>)}
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    }
}

export default Home;