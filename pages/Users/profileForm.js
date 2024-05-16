import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from "next/router";

const Step1 = ({ nextStep, values, setValues }) => {
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">¿Cual es tu nombre?</label>
            <input type='text' name="name" onChange={handleChange} value={values.name} placeholder='Nombre' className="w-full mb-4 p-2 border rounded-md"></input>
            <input type='text' name="lastname" onChange={handleChange} value={values.lastname} placeholder='Apellidos' className="w-full mb-4 p-2 border rounded-md"></input>

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
            <label className="block">Cuéntanos un poco sobre ti</label>
            <textarea name="about" onChange={handleChange} value={values.about} className="w-full mb-4 p-2 border rounded-md"></textarea>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step3 = ({ nextStep, prevStep, values, setValues }) => {
    const handleChange = (event) => {
        setValues({
            ...values,
            education: {
                ...values.education,
                [event.target.name]: event.target.value
            }
        });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h3 className="text-lg font-bold mb-4">Cuentanos sobre tu educacion universitaria</h3>
            <label className="block">Carrera</label>
            <input type="text" name="degree" onChange={handleChange} value={values.education.degree} className="w-full mb-4 p-2 border rounded-md" />
            <label className="block">Institucion</label>
            <input type="text" name="school" onChange={handleChange} value={values.education.school} className="w-full mb-4 p-2 border rounded-md" />
            <label className="block">Fecha de inicio</label>
            <input type="text" name="period" onChange={handleChange} value={values.education.period} className="w-full mb-4 p-2 border rounded-md" />
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step4 = ({ nextStep, prevStep, values, setValues }) => {
    const [workExperience, setWorkExperience] = React.useState(values.work_experience);

    const handleChange = (index, field) => (event) => {
        const newWorkExperience = [...workExperience];
        newWorkExperience[index][field] = event.target.value;
        setWorkExperience(newWorkExperience);
        setValues({ ...values, work_experience: newWorkExperience });

    };

    const handleAddWorkExperience = () => {
        setWorkExperience(prevWorkExperience => [
            ...prevWorkExperience,
            { period: "", position: "", company: "", description: "" }
        ]);
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">¿Cuentas con experiencia laboral?</h2>

            {workExperience.map((work, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-1/2 px-2">
                        <label className="block">Lugar</label>
                        <input type="text" name={`company-${index}`} onChange={handleChange(index, 'company')} value={work.company} className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 px-2">
                        <label className="block">Periodo</label>
                        <input type="text" name={`period-${index}`} onChange={handleChange(index, 'period')} value={work.period} className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 px-2">
                        <label className="block">Posición</label>
                        <input type="text" name={`position-${index}`} onChange={handleChange(index, 'position')} value={work.position} className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 px-2">
                        <label className="block">Descripción</label>
                        <input type="text" name={`description-${index}`} onChange={handleChange(index, 'description')} value={work.description} className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                </div>
            ))}
            <div className="mb-4">
                <button onClick={handleAddWorkExperience} className="px-4 py-2 bg-green-500 text-white rounded-md mr-4">Agregar Experiencia Laboral</button>
            </div>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step5 = ({ nextStep, prevStep, values, setValues }) => {
    const [projects, setProjects] = React.useState(values.projects);

    const handleChange = (index, field) => (event) => {
        const newProjects = [...projects];
        newProjects[index][field] = event.target.value;
        setProjects(newProjects);
        setValues({ ...values, projects: newProjects });
    };

    const handleAddProject = () => {
        setProjects(prevProjects => [
            ...prevProjects,
            { name: "", description: "" }
        ]);
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">¿Que proyectos relevantes has realizado?</h2>

            {projects.map((project, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-1/2 px-2">
                        <input type="text" name={`projectName-${index}`} onChange={handleChange(index, 'name')} value={project.name} placeholder='Nombre del proyecto' className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 px-2">
                        <input type="text" name={`projectDescription-${index}`} onChange={handleChange(index, 'description')} value={project.description} placeholder='Descripción' className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                </div>
            ))}
            <div className="mb-4">
                <button onClick={handleAddProject} className="px-4 py-2 bg-green-500 text-white rounded-md mr-4">Agregar Proyecto</button>
            </div>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step6 = ({ nextStep, prevStep, values, setValues }) => {
    const [skills, setSkills] = React.useState(values.skills || []);

    const handleChange = (index) => (event) => {
        const newSkills = [...skills];
        newSkills[index] = event.target.value;
        setSkills(newSkills);
        setValues({ ...values, skills: newSkills });
    };

    const handleAddSkill = () => {
        setSkills(prevSkills => ([...prevSkills, ""]));
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">¿Que habilidades tecnicas posees?</h2>

            {Object.keys(skills).map((skillKey, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-full p-2">
                        <input type="text" name={`skill-${index}`} onChange={handleChange(index)} value={skills[skillKey]} placeholder='Habilidad' className="w-full p-2 border rounded-md" />
                    </div>
                </div>
            ))}
            <div className="mb-4">
                <button onClick={handleAddSkill} className="px-4 py-2 bg-green-500 text-white rounded-md mr-4">Agregar Habilidad</button>
            </div>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step7 = ({ nextStep, prevStep, values, setValues }) => {
    const [languages, setLanguages] = React.useState(values.languages);

    const handleChange = (index, field) => (event) => {
        const newLanguages = [...languages];
        newLanguages[index][field] = event.target.value;
        setLanguages(newLanguages);
        setValues({ ...values, languages: newLanguages });
    };

    const handleAddLanguage = () => {
        setLanguages(prevLanguages => [
            ...prevLanguages,
            { language: "", proficiency: "" }
        ]);
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">¿Que idiomas manejas?</h2>

            {languages.map((lang, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-1/2 p-2">
                        <label className="block">Idioma</label>
                        <input type="text" name={`language-${index}`} onChange={handleChange(index, 'language')} value={lang.language} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block">Nivel</label>
                        <select name={`proficiency-${index}`} onChange={handleChange(index, 'proficiency')} value={lang.proficiency} className="w-full p-2 border rounded-md">
                            <option value="">Selecciona un nivel</option>
                            <option value="A0">A0: Principiante</option>
                            <option value="A1-A2">A1-A2: Básico</option>
                            <option value="A2-B1">A2-B1: Pre-intermedio</option>
                            <option value="B1">B1: Intermedio</option>
                            <option value="B2">B2: Intermedio-Alto</option>
                            <option value="C1-C2">C1-C2: Avanzado</option>
                        </select>
                    </div>
                </div>
            ))}
            <div className="mb-4">
                <button onClick={handleAddLanguage} className="px-4 py-2 bg-green-500 text-white rounded-md mr-4">Agregar Idioma</button>
            </div>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step8 = ({ nextStep, prevStep, values, setValues }) => {
    const [certifications, setCertifications] = React.useState(values.certifications);

    const handleChange = (index, field) => (event) => {
        const newCertifications = [...certifications];
        newCertifications[index][field] = event.target.value;
        setCertifications(newCertifications);
        setValues({ ...values, certifications: newCertifications });
    };

    const handleAddCertification = () => {
        setCertifications(prevCertifications => [
            ...prevCertifications,
            { name: "", issuing_organization: "", date: "" }
        ]);
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">¿Cuentas con alguna certificacion?</h2>

            {certifications.map((cert, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-1/3 p-2">
                        <label className="block">Certificacion</label>
                        <input type="text" name={`certification-${index}`} onChange={handleChange(index, 'name')} value={cert.name} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="w-1/3 p-2">
                        <label className="block">Organización Emisora</label>
                        <input type="text" name={`issuing_organization-${index}`} onChange={handleChange(index, 'issuing_organization')} value={cert.issuing_organization} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="w-1/3 p-2">
                        <label className="block">Fecha de obtencion</label>
                        <input type="date" name={`date-${index}`} onChange={handleChange(index, 'date')} value={cert.date} className="w-full p-2 border rounded-md" />
                    </div>
                </div>
            ))}
            <div className="mb-4">
                <button onClick={handleAddCertification} className="px-4 py-2 bg-green-500 text-white rounded-md mr-4">Agregar Certificacion</button>
            </div>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step9 = ({ nextStep, prevStep, values, setValues }) => {
    const [softSkills, setSoftSkills] = React.useState(values.soft_skills || []);

    const handleChange = (index) => (event) => {
        const newSoftSkills = [...softSkills];
        newSoftSkills[index] = event.target.value;
        setSoftSkills(newSoftSkills);
        setValues({ ...values, soft_skills: newSoftSkills });
    };

    const handleAddSoftSkill = () => {
        setSoftSkills(prevSoftSkills => [...prevSoftSkills, ""]);
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">¿Con cuales habilidades blandas cuentas?</h2>

            {softSkills.map((skill, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-full p-2">
                        <label className="block">Habilidad blanda</label>
                        <input type="text" name={`soft_skill-${index}`} onChange={handleChange(index)} value={skill} className="w-full p-2 border rounded-md" />
                    </div>
                </div>
            ))}
            <div className="mb-4">
                <button onClick={handleAddSoftSkill} className="px-4 py-2 bg-green-500 text-white rounded-md mr-4">Agregar Habilidad</button>
            </div>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step10 = ({ nextStep, prevStep, values, setValues }) => {
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">¿Cual es tu meta profesional?</label>
            <textarea name="career_goals" onChange={handleChange} value={values.career_goals} className="w-full mb-4 p-2 border rounded-md"></textarea>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    )
};

const Step11 = ({ nextStep, prevStep, values, setValues }) => {

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">Agrega una imagen de perfil</label>


            <CldUploadWidget uploadPreset="ml_default"
                onSuccess={(results) => {
                    console.log('Public ID', results.info.public_id);
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

const Step12 = ({ values, id }) => {

    console.log(values);
    const handleSave = async () => {
        const response = await fetch('/api/Users/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "¡Completado!",
                text: "Información guardada con éxito",
                background: "#fff",
                customClass: {
                    title: "black-font",
                },
                didClose: () => {
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
            <p>¿Deseas guardar tu información?</p>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Guardar</button>
        </div>
    );
};

const MultiStepForm = () => {
    let router;
    if (typeof window !== 'undefined') { // Verifica si estamos en el lado del cliente
        const { useRouter } = require('next/router');
        router = useRouter();
    }

    const { data: session } = useSession();
    const id = session && session.user ? session.user.id : null;

    useEffect(() => {
        if (!session) {
            router && router.push('../');
        } else if (session.user.isNewUser === false) {
            router && router.push(`/Users/`);
        }
    }, [session]);

    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        name: "",
        lastname: "",
        about: "",
        education: {
            degree: "",
            school: "",
            period: ""
        },
        work_experience: [],
        skills: [],
        projects: [],
        languages: [],
        certifications: [],
        soft_skills: [],
        career_goals: "",
        profilePicture: ""
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    switch (step) {
        case 1:
            return <Step1 nextStep={nextStep} setValues={setValues} values={values} />;
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
            return <Step8 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 9:
            return <Step9 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 10:
            return <Step10 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 11:
            return <Step11 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 12:
            return <Step12 values={values} id={id} />;
    }
};

const App = () => (

    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <MultiStepForm />
    </div>
);

export default App;