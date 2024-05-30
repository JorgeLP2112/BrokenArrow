import {
    FaceSmileIcon,
    ChartBarSquareIcon
} from "@heroicons/react/24/solid";

import benefitOneImg from "../public/benefit-one.jpg";

const ComunidadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
);

const Oportunidades = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
    </svg>
);

const benefitOne = {
    title: "¿Qué ofrecemos?",
    desc: "Explora una variedad de trabajos a tiempo parcial, prácticas profesionales y proyectos freelance adaptados específicamente para estudiantes universitarios en Chihuahua.",
    image: benefitOneImg,
    bullets: [
        {
            title: "Variedad de Oportunidades",
            desc: "Accede a una amplia gama de trabajos a tiempo parcial, prácticas profesionales y proyectos freelance diseñados específicamente para estudiantes universitarios en Chihuahua.",
            icon: <Oportunidades />,
        },
        {
            title: "Perfil Personalizado",
            desc: "Crea un perfil único que muestre tus habilidades, experiencia y preferencias de trabajo, para que las empresas puedan encontrarte fácilmente.",
            icon: <FaceSmileIcon />,
        },
        {
            title: "Comunidad",
            desc: "Explora los perfiles de otros estudiantes y empresas en una pestaña de comunidad, permitiéndote conocer a otros estudiantes como tu y a las empresas que buscan talento joven.",
            icon: <ComunidadIcon />,
        },
    ],
};

export { benefitOne };