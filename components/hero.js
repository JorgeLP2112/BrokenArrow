import Image from "next/image";
import Container from "./container";
import heroImg from "../public/hero.png";

const Hero = () => {
    return (
        <>
            <Container className="flex flex-wrap ">
                <div className="flex items-center w-full lg:w-1/2">
                    <div className="max-w-2xl mb-8">
                        <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
                            Bienvenido a UniTalent
                        </h1>
                        <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl ">
                            Conectando a estudiantes talentosos con oportunidades laborales emocionantes en el estado de Chihuahua.
                            ¿Eres un estudiante universitario en busca de experiencia laboral relevante mientras estudias?
                            ¿O una empresa en busca de jóvenes talentosos para unirse a tu equipo? ¡Has llegado al lugar correcto!
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full lg:w-1/2">
                    <div className="">
                        <Image
                            src={heroImg}
                            width="350"
                            height="350"
                            className={"object-cover"}
                            alt="Hero Illustration"
                            loading="eager"
                            placeholder="blur"
                        />
                    </div>
                </div>
            </Container>
        </>
    );
}


export default Hero;