import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CldImage } from 'next-cloudinary';
import Link from "next/link";

const Home = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (status !== 'loading') {
            if (!session) {
                router.push('../');
            } else if (session.user.isNewUser === true) {
                router.push('/ProfileForm/');
            } else if (session.user.roles[1] === "Estudiante") {
                router.push('/Publicaciones');
            }
        }
    }, [session, router, status]);

    useEffect(() => {
        if (router.isReady) {
            const fetchUser = async () => {
                if (session && session.user) {
                    const response = await fetch(`/api/Users/ofertas?idEmpresa=${session.user.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setPosts(data);
                    } else {
                        console.error('Failed to fetch user');
                    }
                }
            };
            fetchUser();
        }
    }, [router.isReady, router.query.Profile, session]);

    return <BaseLayout>
        <div className="min-h-screen bg-gray-200 py-8">
            <div className="container mx-auto px-4 w-9/10 flex">
                <div className="w-3/4 ml-8" id="1">
                    {posts.map((post, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md mb-6 p-6">
                            <Link href={'/Posts/ofertas?id=' + post._id} passHref>
                                <div className="flex items-center">
                                    <div className="h-14 w-14 overflow-hidden sm:rounded-full sm:relative sm:p-0 left-0 p-3">
                                        <CldImage width="200" height="200" src={post.profilePicture} alt="" />
                                    </div>
                                    <div className="flex-col flex-wrap">
                                        <h2 className="text-2xl font-bold ml-2 block">{post.job_title}</h2>
                                        <h3 className="text-xl font-bold ml-2 ">{post.company_name}</h3>
                                    </div>
                                </div>
                                <p className="mb-4 mt-6">{post.job_description}</p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <CldImage width="400" height="400" src={post.images} alt="" />

                                </div>
                                <div className="flex justify-end">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Ver mas</button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </BaseLayout>;

};

export default Home;