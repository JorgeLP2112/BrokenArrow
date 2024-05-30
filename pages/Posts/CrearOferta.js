import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import React from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import documentPlaceholder from "@/public/documentPlaceholder.png";

const Job = () => {
  const [post, setPost] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";

  useEffect(() => {
    if (status !== "loading") {
      if (!session) {
        router.push("../");
      } else if (session.user.isNewUser === true) {
        router.push("/ProfileForm/");
      } else if (session.user.roles[1] === "Estudiante") {
        router.push("/Publicaciones");
      }
    }
  }, [session, router, status]);

  async function guardar() {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estas seguro de que deseas guardar la informacion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, hazlo!",
    });

    if (result.isConfirmed) {
      const company_id = session.user.id;
      const postWithId = { ...post, company_id };
      const response = await fetch(`/api/Users/ofertas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postWithId),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  }

  if (isLoading) {
    return (
      <BaseLayout>
        <div>Loading...</div>
      </BaseLayout>
    );
  } else {
    return (
      <BaseLayout>
        <div className="min-h-screen bg-gray-200 py-8">
          <div className="container mx-auto px-4 w-4/5">
            <div className="bg-white rounded-lg shadow-md mb-6 p-6">
              <div className="flex flex-col lg:p-8 w-full">
                <div className="flex items-center">
                  <div className="flex-col flex-wrap flex-grow">
                    <h3 className="text-xl font-bold mt-4">
                      Puesto de trabajo
                    </h3>
                    <input
                      type="text"
                      className="text-2xl font-bold block bg-gray-50 rounded-lg border border-blue-200 focus:outline-none w-full sm:w-auto px-2"
                      value={post.job_title}
                      placeholder=""
                      onChange={(e) =>
                        setPost({ ...post, job_title: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="">
                  <div className="">
                    <h3 className="text-xl font-bold mt-4">Descripción</h3>
                    <textarea
                      className="mt-4 min-w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none resize-none"
                      value={post.job_description}
                      placeholder=""
                      onChange={(e) =>
                        setPost({ ...post, job_description: e.target.value })
                      }
                      rows="5"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                  <div className="md:w-1/2 h-full">
                    <div className="mt-4 mr-3 mb-4 pl-4 flex items-center justify-center">
                      {post.images ? (
                        <CldImage width="800" height="800" src={post.images} />
                      ) : (
                        <Image
                          src={documentPlaceholder}
                          width="350"
                          height="350"
                          alt="Flyer placeholder"
                          loading="eager"
                          placeholder="blur"
                        />
                      )}
                    </div>
                    <CldUploadWidget
                      uploadPreset="Flyers"
                      onSuccess={(results) => {
                        setPost({ ...post, images: results.info.public_id });
                      }}
                    >
                      {({ open }) => {
                        return (
                          <button
                            onClick={() => open()}
                            className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
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
                            Sube un Flyer
                          </button>
                        );
                      }}
                    </CldUploadWidget>
                  </div>

                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mt-4 ">Requisitos</h3>
                    <textarea
                      className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none resize-none"
                      value={post.requirements}
                      onChange={(e) =>
                        setPost({ ...post, requirements: e.target.value })
                      }
                      rows="4"
                    />

                    <h3 className="text-xl font-bold ">Beneficios</h3>
                    <textarea
                      className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none resize-none"
                      value={post.benefits}
                      onChange={(e) =>
                        setPost({ ...post, benefits: e.target.value })
                      }
                      rows="4"
                    />

                    <h3 className="text-xl font-bold ">Ubicación</h3>
                    <input
                      className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                      value={post.location}
                      onChange={(e) =>
                        setPost({ ...post, location: e.target.value })
                      }
                    />

                    <h3 className="text-xl font-bold ">Tipo de contrato</h3>
                    <input
                      className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                      value={post.contract_type}
                      onChange={(e) =>
                        setPost({ ...post, contract_type: e.target.value })
                      }
                    />

                    <h3 className="text-xl font-bold ">Salario</h3>
                    <input
                      className="mb-4 w-1/2 bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                      value={post.salary}
                      onChange={(e) =>
                        setPost({ ...post, salary: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-x-0">
                  <div className="w-full sm:w-1/2">
                    <h3 className="text-xl font-bold ">Fecha de inicio</h3>
                    <input
                      type="date"
                      className="mb-4 w-1/2 bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                      value={post.start_date}
                      onChange={(e) =>
                        setPost({ ...post, start_date: e.target.value })
                      }
                    />

                  </div>

                  <div className="w-full sm:w-1/2">
                    <h3 className="text-xl font-bold ">
                      Fecha límite de solicitud
                    </h3>
                    <input
                      type="date"
                      className="mb-4 w-1/2 bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                      value={post.application_deadline}
                      onChange={(e) =>
                        setPost({
                          ...post,
                          application_deadline: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>


                <div className="flex flex-col sm:flex-row items-center space-x-0">
                  <div className="w-full sm:w-1/2">
                    <h3 className="text-xl font-bold">
                      Información de contacto
                    </h3>
                    <div className="flex flex-col lg:flex-row items-center w-full">
                      <label className="font-bold w-full lg:w-1/4">Nombre</label>
                      <input
                        className="ml-2 w-full lg:w-2/4 bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                        value={post?.contact_information?.contact_name || ""}
                        onChange={(e) =>
                          setPost({
                            ...post,
                            contact_information: {
                              ...post.contact_information,
                              contact_name: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center w-full">
                      <label className="font-bold w-full lg:w-1/4">Correo</label>
                      <input
                        className="ml-2 w-full lg:w-2/4 bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                        value={post?.contact_information?.contact_email || ""}
                        onChange={(e) =>
                          setPost({
                            ...post,
                            contact_information: {
                              ...post.contact_information,
                              contact_email: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center w-full">
                      <label className="font-bold w-full lg:w-1/4">Telefono</label>
                      <input
                        className="ml-2 w-full lg:w-2/4 bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                        value={post?.contact_information?.contact_phone || ""}
                        onChange={(e) =>
                          setPost({
                            ...post,
                            contact_information: {
                              ...post.contact_information,
                              contact_phone: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2 p-2 mt-6">

                    <h3 className="text-xl font-bold ">Método de solicitud</h3>
                    <textarea
                      className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none resize-none"
                      value={post.application_method}
                      onChange={(e) =>
                        setPost({ ...post, application_method: e.target.value })
                      }
                    />{" "}
                    <label className="font-bold ">Aplicable en linea? </label>
                    <input
                      type="checkbox"
                      checked={post.aplicable}
                      onChange={(e) =>
                        setPost({ ...post, aplicable: e.target.checked })
                      }
                    />
                  </div>

                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-green-400 text-white rounded-md"
                  onClick={() => guardar()}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
};

export default Job;
