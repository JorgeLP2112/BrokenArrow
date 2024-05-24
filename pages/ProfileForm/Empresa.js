import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

const Step1 = ({ nextStep, values, setValues }) => {
    const router = useRouter();

    const prevStep = () => {
        router.push(`/ProfileForm/`);
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">Nombre de la empresa</label>
            <input type='text' name="company_name" onChange={handleChange} value={values.company_name} placeholder='Nombre de la empresa' className="w-full mb-4 p-2 border rounded-md"></input>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>

            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step2 = ({ nextStep, prevStep, values, setValues }) => {
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">Descripción de la empresa</label>
            <textarea name="company_description" onChange={handleChange} value={values.company_description} className="w-full mb-4 p-2 border rounded-md"></textarea>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step3 = ({ nextStep, prevStep, values, setValues }) => {
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">¿A qué sector pertenece?</label>
            <input type='text' name="industry" onChange={handleChange} value={values.industry} placeholder='Sector' className="w-full mb-4 p-2 border rounded-md"></input>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step4 = ({ nextStep, prevStep, values, setValues }) => {

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">¿En dónde se encuentran?</label>
            <textarea name="location" onChange={handleChange} value={values.location} className="w-full mb-4 p-2 border rounded-md"></textarea>

            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step5 = ({ nextStep, prevStep, values, setValues }) => {
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">Página oficial</label>
            <textarea name="website" onChange={handleChange} value={values.website} className="w-full mb-4 p-2 border rounded-md"></textarea>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step6 = ({ nextStep, prevStep, values, setValues }) => {
    const handleChange = (event) => {
        setValues({
            ...values,
            contact_information: {
                ...values.contact_information,
                [event.target.name]: event.target.value
            }
        });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">Datos de contacto</h2>
            <label className="block">Dirección de correo</label>
            <input type="text" name="email" onChange={handleChange} value={values.contact_information.email} className="w-full mb-4 p-2 border rounded-md" />
            <label className="block">Teléfono</label>
            <input type="text" name="phone" onChange={handleChange} value={values.contact_information.phone} className="w-full mb-4 p-2 border rounded-md" />
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step7 = ({ nextStep, prevStep, values, setValues }) => {

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">Agrega una imagen de perfil</label>

            <CldUploadWidget uploadPreset="ProfilePicsEmpresas"
                onSuccess={(results) => {
                    setValues({ ...values, profilePicture: results.info.public_id });
                }}
            >
                {({ open }) => {
                    return (
                        <button onClick={() => open()}>
                            Sube una imagen
                        </button>
                    );
                }}
            </CldUploadWidget>

            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    )
};

const Step8 = ({ prevStep, values }) => {


    const handleSave = async () => {
        const response = await fetch('/api/Users/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if (response.ok) {
            const { data: session } = useSession();
            Swal.fire({
                icon: "success",
                title: "¡Completado!",
                text: "Información guardada con éxito",
                background: "#fff",
                customClass: {
                    title: "black-font",
                },
                didClose: () => {
                    session.user.isNewUser = false;
                    router.push(`/Users/`);
                },
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "¡Error!",
                text: "Hubo un error al guardar la información",
                background: "#fff",
                customClass: {
                    title: "black-font",
                },
            });
        }
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <p>¿Deseas guardar la información?</p>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Guardar</button>
        </div>
    );
};

const MultiStepForm = () => {
    const { data: session } = useSession();
    const id = session && session.user ? session.user.id : null;

    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        id: id,
        company_name: "",
        company_description: "",
        industry: "",
        location: "",
        website: "",
        contact_information: {
            email: "",
            phone: ""
        },
        profilePicture: "",
        type: "Empresa"
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    switch (step) {
        case 1:
            return <Step1 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 2:
            return <Step2 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 3:
            return <Step3 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 4:
            return <Step4 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 5:
            return <Step5 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 6:
            return <Step6 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 7:
            return <Step7 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 8:
            return <Step8 values={values} />;
    }
};

const App = () => {
    const { data: session, loading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !session) {
            router.push('../');
        } else if (!loading && session && !session.user.isNewUser) {
            router.push(`/Publicaciones`);
        }
    }, [session, loading, router]);

    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
            <MultiStepForm />
        </div>
    );
};

export default App;
