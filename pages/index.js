import BaseLayout from "../components/BaseLayout";
import Head from "next/head";
import Hero from "../components/hero";
import Footer from "../components/footer";
import Benefits from "../components/benefits";
import { benefitOne, benefitTwo } from "../components/data";
import { SidebarContext } from '@/context/SidebarContext';
import { useEffect, useContext } from 'react';

const Home = () => {

	const { isCollapsed } = useContext(SidebarContext);

	useEffect(() => {
		const layout = document.querySelector('.layout');
		const btn = document.querySelector('.btn');

		if (isCollapsed) {
			layout.style.marginLeft = 'var(--sidebar-collapsed-width)';
			btn.style.left = '4rem';
		} else {
			layout.style.marginLeft = 'var(--sidebar-width)';
			btn.style.left = '87%';
		}
	}, [isCollapsed]);

	return <BaseLayout>
		<Head>
			<title>JKB Jobs</title>
			<meta
				name="description"
				content=""
			/>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Hero />
		<Benefits data={benefitOne} />
		<Benefits imgPos="right" data={benefitTwo} />
		<Footer />
	</BaseLayout>;
};

export default Home;