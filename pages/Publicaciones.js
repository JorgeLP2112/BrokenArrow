import Footer from "@/components/footer";
import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CldImage } from 'next-cloudinary';

const Home = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status !== 'loading') {
            if (!session) {
                router.push('/');
            } else if (session.user.isNewUser === true && session.user.roles[1] === "Estudiante") {
                router.push('/Users/profileFormEstudiante');
            } else if (session.user.isNewUser === true && session.user.roles[1] === "Empresa") {
                router.push('/Users/profileFormEmpresa');
            }
        }
    }, [session, router, status]);


    return <BaseLayout>
        publicaciones
        <Footer />
    </BaseLayout>;

};

export default Home;