import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

const Step0 = ({ userId, nextStep }) => {
    const [userType, setUserType] = useState("Estudiante");
    const router = useRouter();

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleNextStep = async () => {
        try {
            const response = await fetch('/api/updateRole', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, userType }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (userType !== "Estudiante") {
                console.log("redireccionando a empresa");
                router.push(`/ProfileForm/Empresa`);
            } else {
                nextStep();
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation: ', error);
        }
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">¿Qué tipo de cuenta quieres crear?</label>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                    <input type="radio" name="userType" id="react-option" value="Estudiante" className="peer" style={{ opacity: 0, position: "absolute" }} required onChange={handleUserTypeChange} defaultChecked />
                    <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block flex flex-col items-center">
                            <svg className="mb-2 w-12 h-12 text-sky-500" fill="currentColor" aria-hidden="true" viewBox="0 0 512 512">  {/* Increase size here */}
                                <path className="st0" d="M473.61,63.16L276.16,2.927C269.788,0.986,263.004,0,256.001,0c-7.005,0-13.789,0.986-20.161,2.927 L38.386,63.16c-3.457,1.064-5.689,3.509-5.689,6.25c0,2.74,2.232,5.186,5.691,6.25l91.401,27.88v77.228 c0.023,39.93,13.598,78.284,38.224,107.981c11.834,14.254,25.454,25.574,40.483,33.633c15.941,8.564,32.469,12.904,49.124,12.904 c16.646,0,33.176-4.34,49.126-12.904c22.597-12.143,42.04-31.646,56.226-56.39c14.699-25.683,22.471-55.155,22.478-85.224v-78.214 l45.244-13.804v64.192c-6.2,0.784-11.007,6.095-11.007,12.5c0,5.574,3.649,10.404,8.872,12.011l-9.596,63.315 c-0.235,1.576,0.223,3.168,1.262,4.386c1.042,1.204,2.554,1.902,4.148,1.902h36.273c1.592,0,3.104-0.699,4.148-1.91 c1.036-1.203,1.496-2.803,1.262-4.386l-9.596-63.307c5.223-1.607,8.872-6.436,8.872-12.011c0-6.405-4.81-11.716-11.011-12.5V81.544 l19.292-5.885c3.457-1.064,5.691-3.517,5.691-6.25C479.303,66.677,477.069,64.223,473.61,63.16z M257.62,297.871 c-10.413,0-20.994-2.842-31.448-8.455c-16.194-8.649-30.908-23.564-41.438-42.011c-4.854-8.478-8.796-17.702-11.729-27.445 c60.877-10.776,98.51-49.379,119.739-80.97c10.242,20.776,27.661,46.754,54.227,58.648c-3.121,24.984-13.228,48.812-28.532,67.212 c-8.616,10.404-18.773,18.898-29.375,24.573C278.606,295.029,268.025,297.871,257.62,297.871z"></path> <path className="st0" d="M373.786,314.23l-1.004-0.629l-110.533,97.274L151.714,313.6l-1.004,0.629 c-36.853,23.036-76.02,85.652-76.02,156.326v0.955l0.846,0.45C76.291,472.365,152.428,512,262.249,512 c109.819,0,185.958-39.635,186.712-40.038l0.846-0.45v-0.955C449.808,399.881,410.639,337.265,373.786,314.23z"></path>

                            </svg>
                            <div className="w-full text-lg font-semibold">Estudiante</div>
                            <div className="w-full text-sm">Perfil estándar para aplicar a las vacantes de las empresas.</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" name="userType" id="flowbite-option" value="Empresa" className="peer" style={{ opacity: 0, position: "absolute" }} onChange={handleUserTypeChange} />
                    <label htmlFor="flowbite-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block flex flex-col items-center">
                            <svg className="mb-2 w-12 h-12 text-sky-500" fill="currentColor" aria-hidden="true" viewBox="0 0 512 512">  {/* Increase size here */}
                                <path d="M364.374,207.697V25.508H156.687v100.57H0v343.717h156.687v0.241h338.858V207.69H364.374V207.697z M103.291,455.226 v-82.651H67.976v82.651H14.579V140.65h142.108v314.576H103.291z M480.968,455.464H296.352V308.503h-63.158v146.961h-61.937V126.078 v-85.99h178.536v182.188h131.175V455.464z M190.144,75.303h30.369v67.539h-30.369V75.303z M248.334,75.303h30.358v67.539h-30.358 V75.303z M304.308,75.303h30.371v67.539h-30.371V75.303z M190.144,179.022h30.369v74.828h-30.369V179.022z M248.334,179.022h30.358 v74.828h-30.358V179.022z M304.308,179.022h30.371v74.828h-30.371V179.022z M388.721,324.421h-30.359v-69.362h30.359V324.421z M388.721,435.426h-30.359v-71.18h30.359V435.426z M452.478,324.421h-30.358v-69.362h30.358V324.421z M452.478,435.426h-30.358 v-71.18h30.358V435.426z M38.569,164.88h30.359v69.357H38.569V164.88z M38.569,274.058h30.359v71.179H38.569V274.058z M102.329,164.88h30.358v69.357h-30.358V164.88z M102.329,274.058h30.358v71.179h-30.358V274.058z"></path>

                            </svg>
                            <div className="w-full text-lg font-semibold">Empresa</div>
                            <div className="w-full text-sm">Perfil especializado que ofrece las herramientas que las empresas necesitan para ofertar vacantes</div>
                        </div>
                    </label>
                </li>
            </ul>
            <button onClick={handleNextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4">Siguiente</button>
        </div>
    );
};

const Step1 = ({ nextStep, prevStep, values, setValues }) => {
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">¿Cual es tu nombre?</label>
            <input type='text' name="name" onChange={handleChange} value={values.name} placeholder='Nombre/s' className="w-full mb-4 p-2 border rounded-md"></input>
            <input type='text' name="lastname" onChange={handleChange} value={values.lastname} placeholder='Apellidos' className="w-full mb-4 p-2 border rounded-md"></input>
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
            <label className="block">Cuéntanos un poco sobre ti</label>
            <textarea name="about" onChange={handleChange} value={values.about} className="w-full mb-4 p-2 border rounded-md"></textarea>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
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
            <h3 className="text-base font-bold mb-4">Cuéntanos sobre tu educación superior</h3>
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
                        <label className="block">Periodo de actividad</label>
                        <input type="text" name={`period-${index}`} onChange={handleChange(index, 'period')} value={work.period} className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 px-2">
                        <label className="block">Puesto</label>
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
            <h2 className="text-lg font-bold mb-4">¿Tienes algún proyecto que quieras compartir?</h2>

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
            <h2 className="text-lg font-bold mb-4">¿Qué habilidades tecnicas posees?</h2>

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
            <h2 className="text-lg font-bold mb-4">¿Qué idiomas hablas?</h2>

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
                            <option value="Nativo">Nativo</option>

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
            <h2 className="text-lg font-bold mb-4">¿Con cuáles habilidades sociales (Soft Skills)?</h2>

            {softSkills.map((skill, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-full p-2">
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
            <h2 className="text-lg font-bold mb-4">¿A qué correo te gustaria que las empresas te contacten?</h2>
            <input type='text' name="email" onChange={handleChange} value={values.email} placeholder='Nombre/s' className="w-full mb-4 p-2 border rounded-md"></input>

            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
        </div>
    );
};

const Step11 = ({ nextStep, prevStep, values, setValues }) => {

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <label className="block">Agrega una imagen de perfil</label>

            <CldUploadWidget uploadPreset="ProfilePics"
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

const Step12 = ({ prevStep, values }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSave = async () => {
        const response = await fetch('/api/Users/profile', {
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
            <p>¿Deseas guardar tu información?</p>
            <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Guardar</button>
        </div>
    );
};

const MultiStepForm = () => {
    const { data: session } = useSession();
    const id = session && session.user ? session.user.id : null;

    const [step, setStep] = useState(0);
    const [values, setValues] = useState({
        id: id,
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
        profilePicture: "",
        type: "Estudiante"
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    switch (step) {
        case 0:
            return <Step0 userId={id} nextStep={nextStep} />;
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
            return <Step8 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 9:
            return <Step9 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 10:
            return <Step10 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 11:
            return <Step11 nextStep={nextStep} prevStep={prevStep} setValues={setValues} values={values} />;
        case 12:
            return <Step12 values={values} />;
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
