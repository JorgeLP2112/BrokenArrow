import {
    FaceSmileIcon,
    ChartBarSquareIcon,
    CursorArrowRaysIcon,
    DevicePhoneMobileIcon,
    AdjustmentsHorizontalIcon,
    SunIcon,
} from "@heroicons/react/24/solid";

const benefitOne = {
    title: "¿Qué ofrecemos?",
    desc: "Explora una variedad de trabajos a tiempo parcial, prácticas profesionales y proyectos freelance adaptados específicamente para estudiantes universitarios en Chihuahua.",
    bullets: [
        {
            title: "Perfil Personalizado",
            desc: "Crea un perfil único que muestre tus habilidades, experiencia y preferencias de trabajo, para que las empresas puedan encontrarte fácilmente.",
            icon: <FaceSmileIcon />,
        },
        {
            title: "Notificaciones Personalizadas",
            desc: "Recibe alertas instantáneas sobre nuevas oportunidades que coincidan con tus intereses y habilidades, directamente en tu bandeja de entrada.",
            icon: <ChartBarSquareIcon />,
        },
        {
            title: "Comunicación Directa",
            desc: "Comunícate directamente con las empresas a través de nuestra plataforma integrada para obtener más información sobre los trabajos y realizar consultas sobre el proceso de solicitud.",
            icon: <CursorArrowRaysIcon />,
        },
    ],
};

const benefitTwo = {
    title: "¿Cómo funciona?",
    desc: "Explora una variedad de trabajos a tiempo parcial, prácticas profesionales y proyectos freelance adaptados específicamente para estudiantes universitarios en Chihuahua.",
    bullets: [
        {
            title: "Mobile Responsive Template",
            desc: "Nextly is designed as a mobile first responsive template.",
            icon: <DevicePhoneMobileIcon />,
        },
        {
            title: "Powered by Next.js & TailwindCSS",
            desc: "This template is powered by latest technologies and tools.",
            icon: <AdjustmentsHorizontalIcon />,
        },
        {
            title: "Dark & Light Mode",
            desc: "Nextly comes with a zero-config light & dark mode. ",
            icon: <SunIcon />,
        },
    ],
};


export { benefitOne, benefitTwo };