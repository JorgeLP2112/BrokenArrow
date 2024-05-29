import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CldImage } from 'next-cloudinary';
import Link from 'next/link'

const Home = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState();
    const isLoading = status === 'loading' || !users;
    const [searchTerm, setSearchTerm] = useState('');
    const [userType, setUserType] = useState("Estudiante");

    useEffect(() => {
        if (status !== 'loading') {
            if (!session) {
                router.push('../');
            } else if (session.user.isNewUser === true) {
                router.push('/ProfileForm/');
            }
        }
    }, [session, router, status]);

    const fetchUser = async (userType, searchTerm) => {
        console.log(searchTerm, userType);
        const response = await fetch(`/api/Users/profile?type=${userType}&name=${searchTerm}`);
        if (response.ok) {
            const data = await response.json();
            setUsers(data);
        } else {
            console.error('Failed to fetch user');
        }
    };

    useEffect(() => {
        if (router.isReady) {
            fetchUser(userType, searchTerm);
        }
    }, [router.isReady, userType, searchTerm]);

    if (isLoading) {
        return <BaseLayout><div>Loading...</div></BaseLayout>;
    } else {
        return <BaseLayout>
            <div className="min-h-screen bg-gray-200 py-8">
                <div className="mx-auto px-4 w-4/5">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="p-2 mb-4 w-3/4 mr-2"
                        />

                        <select
                            value={userType}
                            onChange={e => {
                                setUserType(e.target.value); fetchUser(e.target.value, searchTerm);
                            }}
                            className="bg-white p-2 mb-4 w-1/4"
                        >
                            <option value="Estudiante">Estudiantes</option>
                            <option value="Empresa">Empresas</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map((user) => (
                            <div key={user.id} className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                <Link href={'/Users/' + user.idUser}>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                            <CldImage width="600" height="600" src={user?.profilePicture} />
                                        </div>
                                        <div>

                                            {userType == "Estudiante" ? (
                                                <>
                                                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        {user?.name} {user?.lastname}
                                                    </p>
                                                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        {user?.education?.degree}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    {user?.company_name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BaseLayout>
    }
}

export default Home;