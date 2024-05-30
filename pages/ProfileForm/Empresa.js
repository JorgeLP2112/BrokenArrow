import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import TextareaAutosize from 'react-textarea-autosize';
import ProfilePlaceholder from "@/public/ProfilePlaceholder.png";
import Image from "next/image";

const Step1 = ({ nextStep, values, setValues }) => {
  const router = useRouter();

  const prevStep = () => {
    router.push(`/ProfileForm/`);
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrorMessage(null);
  };

  const handleNextStep = () => {
    if (values.company_name) {
      nextStep();
    } else {
      setErrorMessage('Por favor, completa todos los campos antes de continuar.');
    }
  };

  return (
    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
      <label className="block">Nombre de la empresa</label>
      <input
        type="text"
        name="company_name"
        onChange={handleChange}
        value={values.company_name}
        placeholder="Nombre de la empresa"
        className="w-full mb-4 p-2 border rounded-md"
      ></input>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={prevStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
      >
        Anterior
      </button>

      <button
        onClick={handleNextStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Siguiente
      </button>
    </div>
  );
};

const Step2 = ({ nextStep, prevStep, values, setValues }) => {
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleNextStep = () => {
    if (values.company_description) {
      nextStep();
    } else {
      setErrorMessage('Por favor, completa todos los campos antes de continuar.');
    }
  };

  return (
    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
      <label className="block">Descripción de la empresa</label>
      <TextareaAutosize
        name="company_description"
        onChange={handleChange}
        value={values.company_description}
        minRows={3}
        maxRows={20}
        className="w-full mb-4 p-2 border rounded-md"
        style={{ resize: 'none', overflow: 'hidden' }}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={prevStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
      >
        Anterior
      </button>
      <button
        onClick={handleNextStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Siguiente
      </button>
    </div>
  );
};

const Step3 = ({ nextStep, prevStep, values, setValues }) => {
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleNextStep = () => {
    if (values.industry) {
      nextStep();
    } else {
      setErrorMessage('Por favor, completa todos los campos antes de continuar.');
    }
  };

  return (
    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
      <label className="block">¿A qué sector pertenece?</label>
      <input
        type="text"
        name="industry"
        onChange={handleChange}
        value={values.industry}
        placeholder="Sector"
        className="w-full mb-4 p-2 border rounded-md"
      ></input>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={prevStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
      >
        Anterior
      </button>
      <button
        onClick={handleNextStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Siguiente
      </button>
    </div>
  );
};

const Step4 = ({ nextStep, prevStep, values, setValues }) => {
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleNextStep = () => {
    if (values.location) {
      nextStep();
    } else {
      setErrorMessage('Por favor, completa todos los campos antes de continuar.');
    }
  };

  return (
    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
      <label className="block">¿En dónde se encuentran?</label>
      <TextareaAutosize
        name="location"
        onChange={handleChange}
        value={values.location}
        minRows={3}
        maxRows={20}
        className="w-full mb-4 p-2 border rounded-md"
        style={{ resize: 'none', overflow: 'hidden' }}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={prevStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
      >
        Anterior
      </button>
      <button
        onClick={handleNextStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Siguiente
      </button>
    </div>
  );
};

const Step5 = ({ nextStep, prevStep, values, setValues }) => {
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNextStep = () => {
    if (values.website) {
      nextStep();
    } else {
      setErrorMessage('Por favor, completa todos los campos antes de continuar.');
    }
  };

  return (
    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
      <label className="block">Página oficial</label>
      <input
        type="text"
        name="website"
        onChange={handleChange}
        value={values.website}
        className="w-full mb-4 p-2 border rounded-md"
      ></input>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={prevStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
      >
        Anterior
      </button>
      <button
        onClick={handleNextStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Siguiente
      </button>
    </div>
  );
};

const Step6 = ({ nextStep, prevStep, values, setValues }) => {
  const handleChange = (event) => {
    setValues({
      ...values,
      contact_information: {
        ...values.contact_information,
        [event.target.name]: event.target.value,
      },
    });
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleNextStep = () => {
    if (values.contact_information.email && values.contact_information.phone) {
      nextStep();
    } else {
      setErrorMessage('Por favor, completa todos los campos antes de continuar.');
    }
  };

  return (
    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
      <h2 className="text-lg font-bold mb-4">Datos de contacto</h2>
      <label className="block">Dirección de correo</label>
      <input
        type="text"
        name="email"
        onChange={handleChange}
        value={values.contact_information.email}
        className="w-full mb-4 p-2 border rounded-md"
      />
      <label className="block">Teléfono</label>
      <input
        type="text"
        name="phone"
        onChange={handleChange}
        value={values.contact_information.phone}
        className="w-full mb-4 p-2 border rounded-md"
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={prevStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
      >
        Anterior
      </button>
      <button
        onClick={handleNextStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Siguiente
      </button>
    </div>
  );
};

const Step7 = ({ nextStep, prevStep, values, setValues }) => {

  const [errorMessage, setErrorMessage] = useState(null);

  const handleNextStep = () => {
    if (values.profilePicture) {
      nextStep();
    } else {
      setErrorMessage('Por favor, agregue una imagen antes de continuar.');
    }
  };

  return (
    <div className="mx-auto w-full sm:w-3/4 md:w-2/5 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Completa tu perfil</h2>
      <label className="block">Agrega una imagen de perfil</label>
      <div className="flex justify-center items-center bg-gray-100">
        {values.profilePicture ? (
          <CldImage width="200" height="200" src={values.profilePicture} />
        ) : (
          <Image
            src={ProfilePlaceholder}
            width="150"
            height="150"
            alt="Profile Picture"
            loading="eager"
            placeholder="blur"
          />
        )}
      </div>
      <CldUploadWidget
        uploadPreset="ProfilePics"
        onSuccess={(results) => {
          setValues({ ...values, profilePicture: results.info.public_id });
        }}
      >
        {({ open }) => {
          return <button
            onClick={() => open()}
            className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              ></path>
            </svg>
            Sube una foto de perfil
          </button>;
        }}
      </CldUploadWidget>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={prevStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
      >
        Anterior
      </button>
      <button
        onClick={handleNextStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Siguiente
      </button>
    </div>
  );
};

const Step8 = ({ prevStep, values }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSave = async () => {
    const response = await fetch("/api/Users/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
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
          router.push(`/Publicaciones`);
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
      <button
        onClick={prevStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
      >
        Anterior
      </button>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Guardar
      </button>
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
      phone: "",
    },
    profilePicture: "",
    type: "Empresa",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          prevStep={prevStep}
          setValues={setValues}
          values={values}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          setValues={setValues}
          values={values}
        />
      );
    case 3:
      return (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          setValues={setValues}
          values={values}
        />
      );
    case 4:
      return (
        <Step4
          nextStep={nextStep}
          prevStep={prevStep}
          setValues={setValues}
          values={values}
        />
      );
    case 5:
      return (
        <Step5
          nextStep={nextStep}
          prevStep={prevStep}
          setValues={setValues}
          values={values}
        />
      );
    case 6:
      return (
        <Step6
          nextStep={nextStep}
          prevStep={prevStep}
          setValues={setValues}
          values={values}
        />
      );
    case 7:
      return (
        <Step7
          nextStep={nextStep}
          prevStep={prevStep}
          setValues={setValues}
          values={values}
        />
      );
    case 8:
      return <Step8 prevStep={prevStep} values={values} />;
  }
};

const App = () => {
  const { data: session, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("../");
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
