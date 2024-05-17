//import Link from "next/link";
import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CldImage } from 'next-cloudinary';

const Home = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const loading = status === 'loading';
    const [user, setUser] = useState([]);
    const id = router.query.Profile;
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado

    useEffect(() => {
        if (loading) return;

        if (!session) {
            router.push('../');
        } else if (session.user.isNewUser === true) {
            router.push(`/Users/profileForm`);
        } else {
            fetchUser();
        }

    }, [session, router, loading]);

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch(`/api/Users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            console.log(data);
            setUser(data);
            setIsLoading(false); // Termina la carga
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    if (isLoading) {
        return <BaseLayout><div>Loading...</div></BaseLayout>; // O cualquier otro componente de carga
    } else {

        return <BaseLayout>

            <div className="bg-gray-100 p-4">

                <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">

                    <div className="flex rounded-t-lg bg-top-color sm:px-2 w-full">
                        <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
                            <CldImage width="600" height="600" src={user?.profilePicture} />
                        </div>

                        <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
                            <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
                                {user?.name + " " + user?.lastname}
                            </p>
                            <p className="text-heading">{user?.education?.degree}</p>
                        </div>

                    </div>

                    <div className="p-5">

                        <div className="flex flex-col sm:flex-row sm:mt-10">

                            <div className="flex flex-col sm:w-1/3">

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

                                <div className="py-3 sm:order-none order-2">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Skills</h2>
                                    <div className="border-2 w-20 border-top-color my-3"></div>

                                    <div>
                                        {user?.skills?.map((data, index) => (
                                            <div className="flex items-center my-1" key={index}>
                                                <div className="ml-2 text-gray-700 hover:text-orange-600">
                                                    <p>{data}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                <div className="py-3 sm:order-none order-1">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Educacion</h2>
                                    <div className="border-2 w-20 border-top-color my-3"></div>

                                    <div className="flex flex-col space-y-1">

                                        {user?.education?.map((data, index) => (
                                            <div className="flex flex-col" key={index}>
                                                <p className="font-semibold text-xs text-gray-700">{data.period}</p>
                                                <p className="text-sm font-medium">
                                                    <span className="text-green-700">{data.school}. </span>
                                                    {data.degree}
                                                </p>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:w-2/3 order-first sm:order-none sm:-mt-10">

                                <div className="py-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Sobre mi</h2>
                                    <div className="border-2 w-20 border-top-color my-3"></div>
                                    <p>{user?.about}</p>
                                </div>

                                <div className="py-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Experiencia profesional</h2>
                                    <div className="border-2 w-20 border-top-color my-3"></div>
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
                                    <div className="border-2 w-20 border-top-color my-3"></div>

                                    <div className="flex flex-col">

                                        <div className="flex flex-col">
                                            <p className="text-lg font-semibold text-gray-700">Projecto_1</p>
                                            <p className="font-normal text-sm text-gray-700 mb-1 pl-2">Descripcion</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    }
}

export default Home;