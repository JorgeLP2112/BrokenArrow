import BaseLayout from "../components/BaseLayout";
import Head from "next/head";
import Hero from "../components/hero";
import Footer from "../components/footer";
import Benefits from "../components/benefits";
import { benefitOne, benefitTwo } from "../components/data";

const Home = () => {
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