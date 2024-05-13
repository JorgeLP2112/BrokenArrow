import React, { useState } from 'react';

const Step1 = ({ nextStep, handleChange, values }) => (
    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
        <label className="block">Cuéntanos un poco sobre ti</label>
        <textarea name="about" onChange={handleChange} value={values.about} className="w-full mb-4 p-2 border rounded-md"></textarea>
        <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
    </div>
);

const Step2 = ({ nextStep, prevStep, handleChange, values }) => (

    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
        <h3 className="text-lg font-bold mb-4">Cuentanos sobre tu educacion universitaria</h3>
        <label className="block">Carrera</label>
        <input type="text" name="degree" onChange={handleChange} value={values.degree} className="w-full mb-4 p-2 border rounded-md" />
        <label className="block">Institucion</label>
        <input type="text" name="school" onChange={handleChange} value={values.school} className="w-full mb-4 p-2 border rounded-md" />
        <label className="block">Inicio</label>
        <input type="text" name="period" onChange={handleChange} value={values.period} className="w-full mb-4 p-2 border rounded-md" />        <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
        <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
    </div>
);

const Step3 = ({ nextStep, prevStep, handleChange, values }) => {
    const [workExperience, setWorkExperience] = React.useState(values.work_experience);

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
                        <input type="text" name={`company-${index}`} onChange={handleChange} value={work.company} className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 px-2">
                        <label className="block">Periodo</label>
                        <input type="text" name={`period-${index}`} onChange={handleChange} value={work.period} className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 px-2">
                        <label className="block">Posición</label>
                        <input type="text" name={`position-${index}`} onChange={handleChange} value={work.position} className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 px-2">
                        <label className="block">Descripción</label>
                        <input type="text" name={`description-${index}`} onChange={handleChange} value={work.description} className="w-full mb-4 p-2 border rounded-md" />
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

const Step4 = ({ nextStep, prevStep, handleChange, values }) => {
    const [projects, setProjects] = React.useState(values.projects);

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
                        <input type="text" name={`projectName-${index}`} onChange={handleChange} value={project.name} placeholder='Nombre del proyecto' className="w-full mb-4 p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 px-2">
                        <input type="text" name={`projectDescription-${index}`} onChange={handleChange} value={project.description} placeholder='Descripción' className="w-full mb-4 p-2 border rounded-md" />
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

const Step5 = ({ nextStep, prevStep, handleChange, values }) => {
    const [skills, setSkills] = React.useState(values.skills.length > 0 ? values.skills : [""]);

    const handleAddSkill = () => {
        setSkills(prevSkills => [
            ...prevSkills,
            ""
        ]);
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">¿Que habilidades tecnicas posees?</h2>

            {skills.map((skill, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-full p-2">
                        <input type="text" name={`skill-${index}`} onChange={handleChange} value={skill} placeholder='Habilidad' className="w-full p-2 border rounded-md" />
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

const Step6 = ({ nextStep, prevStep, handleChange, values }) => {
    const [languages, setLanguages] = React.useState(values.languages.length > 0 ? values.languages : [{ language: "", level: "" }]);

    const handleAddLanguage = () => {
        setLanguages(prevLanguages => [
            ...prevLanguages,
            { language: "", level: "" }
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
                        <input type="text" name={`language-${index}`} onChange={handleChange} value={lang.language} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block">Nivel</label>
                        <select name={`level-${index}`} onChange={handleChange} value={lang.level} className="w-full p-2 border rounded-md">
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

const Step7 = ({ nextStep, prevStep, handleChange, values }) => {
    const [certifications, setCertifications] = React.useState(values.certifications.length > 0 ? values.certifications : [{ name: "", date: "" }]);

    const handleAddCertification = () => {
        setCertifications(prevCertifications => [
            ...prevCertifications,
            { name: "", date: "" }
        ]);
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">¿Cuentas con alguna certificacion?</h2>

            {certifications.map((cert, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-1/2 p-2">
                        <label className="block">Certificacion</label>
                        <input type="text" name={`certification-${index}`} onChange={handleChange} value={cert.name} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block">Fecha de obtencion</label>
                        <input type="date" name={`date-${index}`} onChange={handleChange} value={cert.date} className="w-full p-2 border rounded-md" />
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

const Step8 = ({ nextStep, prevStep, handleChange, values }) => {
    const [softSkills, setSoftSkills] = React.useState(values.soft_skills.length > 0 ? values.soft_skills : [""]);

    const handleAddSoftSkill = () => {
        setSoftSkills(prevSoftSkills => [
            ...prevSoftSkills,
            ""
        ]);
    };

    return (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
            <h2 className="text-lg font-bold mb-4">¿Con cuales habilidades blandas cuentas?</h2>

            {softSkills.map((skill, index) => (
                <div key={index} className="flex flex-wrap bg-gray-50">
                    <div className="w-full p-2">
                        <label className="block">Habilidad blanda</label>
                        <input type="text" name={`soft_skill-${index}`} onChange={handleChange} value={skill} className="w-full p-2 border rounded-md" />
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

const Step9 = ({ nextStep, prevStep, handleChange, values }) => (
    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
        <label className="block">¿Cual es tu meta profesional?</label>
        <textarea name="professionalGoal" onChange={handleChange} value={values.professionalGoal} className="w-full mb-4 p-2 border rounded-md"></textarea>
        <button onClick={prevStep} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Anterior</button>
        <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">Siguiente</button>
    </div>
);

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        about: "",
        education: {
            degree: "",
            school: "",
            period: ""
        },
        work_experience: [],
        skills: [],
        career: "",
        projects: [],
        languages: [],
        certifications: [],
        soft_skills: [],
        career_goals: "",
        profile_links: {}
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleChange = (name, value) => {
        setValues({ ...values, [name]: value });
        console.log(values);
    };

    switch (step) {
        case 1:
            return <Step1 nextStep={nextStep} handleChange={handleChange} values={values} />;
        case 2:
            return <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />;
        case 3:
            return <Step3 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange2} values={values} />;
        case 4:
            return <Step4 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />;
        case 5:
            return <Step5 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />;
        case 6:
            return <Step6 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />;
        case 7:
            return <Step7 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />;
        case 8:
            return <Step8 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />;
        case 9:
            return <Step9 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />;
        case 10:
            console.log(values);
    }
};

const App = () => (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <MultiStepForm />
    </div>
);

export default App;