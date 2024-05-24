import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Benefits from "@/components/benefits";
import { benefitOne, benefitTwo } from "@/components/data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";


const Home = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push('/Publicaciones');
		}
	}, [session, router, status]);

	return <>
		<Navbar />
		<Hero />
		<Benefits data={benefitOne} />
		<Benefits imgPos="right" data={benefitTwo} />
		<Footer />
	</>;
};

export default Home;