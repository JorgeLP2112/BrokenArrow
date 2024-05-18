import BaseLayout from "@/components/BaseLayout";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Benefits from "@/components/benefits";
import { benefitOne, benefitTwo } from "@/components/data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

const Home = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push('/Publicaciones');
		}
	}, [session, router, status]);

	return <BaseLayout>
		<Hero />
		<Benefits data={benefitOne} />
		<Benefits imgPos="right" data={benefitTwo} />
		<Footer />
	</BaseLayout>;
};

export default Home;