import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Swal from 'sweetalert2';
import Link from 'next/link';

const JobPosting = () => {
    const [post, setPost] = useState();
    const { data: session, status } = useSession();
    const router = useRouter();
    const isLoading = status === 'loading' || !post;
    const [isEditable, setIsEditable] = useState(false);
    const [editedPost, setEditedPost] = useState({ ...post });

    const aplicar = async () => {
        const idUser = session.user.id;

        const response = await fetch(`/api/Users/ofertas?aplicar=true&id=${router.query.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idUser: idUser })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        Swal.fire({
            icon: 'success',
            title: 'Solicitud hecha!',
            text: 'Has aplicado correctamente.',
        }).then(() => {
            location.reload();
        });

    }

    useEffect(() => {
        if (status !== 'loading') {
            if (!session) {
                router.push('../');
            } else if (session.user.isNewUser === true) {
                router.push('/ProfileForm/');
            }
        }
    }, [session, router, status]);

    useEffect(() => {
        setEditedPost({ ...post });
    }, [post]);

    const fetchPost = async () => {
        const response = await fetch(`/api/Users/ofertas?id=${router.query.id}`);
        if (response.ok) {
            const data = await response.json();
            setPost(data);
        } else {
            console.error('Failed to fetch user');
        }
    };

    async function eliminar() {

        const id = router.query.id;

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!'
        })

        if (result.isConfirmed) {
            const response = await fetch(`/api/Users/ofertas?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                Swal.fire(
                    'Eliminado!',
                    'Tu oferta ha sido eliminada.',
                    'success'
                ).then(() => {
                    router.push('/Posts/OfertasHechas');
                })
            }
        }
    }

    useEffect(() => {
        if (router.isReady) {
            fetchPost();
        }
    }, [router.isReady, router.query.id]);

    async function guardar() {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Estas a punto de modificar esta oferta de trabajo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, hazlo!'
        });

        if (result.isConfirmed) {
            const { profilePicture, ...restOfEditedPost } = editedPost;
            const response = await fetch(`/api/Users/ofertas?id=${router.query.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restOfEditedPost),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                fetchPost();
                setIsEditable(!isEditable);
            }
        }
    }

    function reportar() {
        Swal.fire({
            title: 'Reportar oferta',
            input: 'text',
            inputPlaceholder: 'Escribe aquí el motivo de tu reporte...',
            showCancelButton: true,
            confirmButtonText: 'Reportar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                const reportReason = result.value;
                console.log(reportReason, session.user.id, router.query.id, "Oferta");
                fetch('/api/report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ reason: reportReason, User: session.user.id, Post: router.query.id, type: "Oferta" }),
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Server response was not ok.');
                        }
                    })
                    .then(data => {
                        Swal.fire(
                            'Reporte enviado',
                            'Tu reporte ha sido enviado exitosamente',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        Swal.fire(
                            'Reporte fallido',
                            'Tu reporte no se ha hecho correctamente',
                            'error'
                        );
                    });
            }
        });
    }

    if (isLoading) {
        return <BaseLayout><div>Loading...</div></BaseLayout>;
    } else {
        return <BaseLayout>
            <div className="min-h-screen bg-gray-200 py-8">
                <div className="container mx-auto px-4 w-4/5">
                    <div className="bg-white rounded-lg shadow-md mb-6 p-6">

                        <div className="flex flex-col lg:p-8 w-full">

                            <div className="flex items-center">
                                <div className="h-14 w-14 overflow-hidden sm:rounded-full sm:relative sm:p-0 left-0 p-3">
                                    <CldImage width="200" height="200" src={post.profilePicture} />
                                </div>
                                <div className="flex-col flex-wrap flex-grow">
                                    {!isEditable ? (
                                        <h2 className="text-2xl font-bold ml-2 block">{post.job_title}</h2>
                                    ) : (
                                        <input type="text" className="text-2xl font-bold ml-2 block bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                                            defaultValue={editedPost.job_title}
                                            onChange={(e) => setEditedPost({ ...editedPost, job_title: e.target.value })}
                                        />
                                    )}
                                    <h3 className="text-xl font-bold ml-2 ">{post.company_name}</h3>
                                </div>
                            </div>

                            <div className="">
                                <div className="">
                                    <h3 className="text-xl font-bold mt-4">Descripción</h3>
                                    {!isEditable ? (
                                        <p className="mt-4">{post.job_description}</p>
                                    ) : (
                                        <textarea
                                            className="mt-4 min-w-full resize bg-gray-50 rounded-lg border border-blue-200 focus:outline-none"
                                            defaultValue={editedPost.job_description}
                                            onChange={(e) => setEditedPost({ ...editedPost, job_description: e.target.value })}
                                            rows="5"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center">

                                <div className="w-full sm:w-1/2">
                                    {!isEditable ? (<>
                                        <div className="mt-4 mr-3 mb-4">
                                            <CldImage width="800" height="800" src={post.images} />
                                        </div>
                                    </>) : (<>
                                        <div className="mt-4 mr-3 mb-4">
                                            <CldImage width="800" height="800" src={editedPost.images} />
                                        </div>
                                        <CldUploadWidget uploadPreset="Flyers"
                                            onSuccess={(results) => {
                                                setEditedPost({ ...editedPost, images: results.info.public_id });
                                            }}
                                        >
                                            {({ open }) => {
                                                return (
                                                    <button onClick={() => open()} className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                            className="w-5 h-5 mr-2">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z">
                                                            </path>
                                                        </svg>
                                                        Cambiar Flyer
                                                    </button>
                                                );
                                            }}
                                        </CldUploadWidget>
                                    </>)}
                                </div>
                                <div className="w-full sm:w-1/2 pl-8">

                                    {!isEditable ? (<>
                                        <h3 className="text-xl font-bold mt-4">Requisitos</h3>
                                        <p className="mb-4">{post.requirements}</p>
                                        <h3 className="text-xl font-bold ">Beneficios</h3>
                                        <p className="mb-4">{post.benefits}</p>
                                        <h3 className="text-xl font-bold ">Ubicación</h3>
                                        <p className="mb-4">{post.location}</p>
                                        <h3 className="text-xl font-bold ">Tipo de contrato</h3>
                                        <p className="mb-4">{post.contract_type}</p>
                                        <h3 className="text-xl font-bold ">Salario</h3>
                                        <p className="mb-4">{post.salary}</p>
                                        <h3 className="text-xl font-bold ">Fecha de inicio</h3>
                                        <p className="mb-4">{post.start_date}</p>
                                        <h3 className="text-xl font-bold ">Fecha límite de solicitud</h3>
                                        <p className="mb-4">{post.application_deadline}</p>
                                    </>) : (<>
                                        <h3 className="text-xl font-bold mt-4">Requisitos</h3>
                                        <textarea className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.requirements} onChange={(e) => setEditedPost({ ...editedPost, requirements: e.target.value })} rows="4" />

                                        <h3 className="text-xl font-bold ">Beneficios</h3>
                                        <textarea className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.benefits} onChange={(e) => setEditedPost({ ...editedPost, benefits: e.target.value })} rows="4" />

                                        <h3 className="text-xl font-bold ">Ubicación</h3>
                                        <input className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.location} onChange={(e) => setEditedPost({ ...editedPost, location: e.target.value })} />

                                        <h3 className="text-xl font-bold ">Tipo de contrato</h3>
                                        <input className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.contract_type} onChange={(e) => setEditedPost({ ...editedPost, contract_type: e.target.value })} />

                                        <h3 className="text-xl font-bold ">Salario</h3>
                                        <input className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.salary} onChange={(e) => setEditedPost({ ...editedPost, salary: e.target.value })} />

                                        <h3 className="text-xl font-bold ">Fecha de inicio</h3>
                                        <input type="date" className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.start_date} onChange={(e) => setEditedPost({ ...editedPost, start_date: e.target.value })} />

                                        <h3 className="text-xl font-bold ">Fecha límite de solicitud</h3>
                                        <input type="date" className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.application_deadline} onChange={(e) => setEditedPost({ ...editedPost, application_deadline: e.target.value })} />
                                    </>)}
                                </div>

                            </div>

                            <div className="flex flex-col sm:flex-row items-center">

                                <div className="w-full sm:w-1/2 flex-col flex-wrap mt-4 mb-4">
                                    <h3 className="text-xl font-bold">Información de contacto</h3>
                                    {!isEditable ? (<>
                                        <p className="ml-2">{post.contact_information.contact_name}</p>
                                        <p className="ml-2">{post.contact_information.contact_email}</p>
                                        <p className="ml-2 mb-4">{post.contact_information.contact_phone}</p>
                                    </>) : (<>
                                        <input className="ml-2 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.contact_information.contact_name} onChange={(e) => setEditedPost({ ...editedPost, contact_information: { ...editedPost.contact_information, contact_name: e.target.value } })} />
                                        <input className="ml-2 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.contact_information.contact_email} onChange={(e) => setEditedPost({ ...editedPost, contact_information: { ...editedPost.contact_information, contact_email: e.target.value } })} />
                                        <input className="ml-2 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.contact_information.contact_phone} onChange={(e) => setEditedPost({ ...editedPost, contact_information: { ...editedPost.contact_information, contact_phone: e.target.value } })} />
                                    </>)}

                                </div>

                                <div className="w-full sm:w-1/2 pl-0 sm:pl-8 flex-col flex-wrap mt-4 mb-4">
                                    <h3 className="text-xl font-bold ">Método de solicitud</h3>
                                    {!isEditable ? (<>
                                        <p className="mb-4">{post.application_method}</p>
                                        {post.aplicable ? (
                                            <p>Ó puedes aplicar con la pagina</p>
                                        ) : (null)}
                                    </>) : (<>
                                        <textarea className="mb-4 w-full bg-gray-50 rounded-lg border border-blue-200 focus:outline-none" defaultValue={editedPost.application_method} onChange={(e) => setEditedPost({ ...editedPost, application_method: e.target.value })} />
                                        <label className="font-bold ">Aplicable en linea </label>
                                        <input type="checkbox" checked={editedPost.aplicable} onChange={(e) => setEditedPost({ ...editedPost, aplicable: e.target.checked })} />
                                    </>)}
                                </div>

                            </div>

                        </div>

                        <div className="flex justify-between">

                            { /*
                            <div className="flex justify-start">
                                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 focus:outline-none" onClick={() => { reportar() }}>
                                    Reportar oferta
                                </button>
                                    </div>*/}

                            <div className="flex justify-end">
                                {session.user.id === post.company_id ? (
                                    <>
                                        {isEditable ? (
                                            <>
                                                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 focus:outline-none" onClick={() => { setIsEditable(!isEditable); setEditedPost({ ...post }) }}>Cancelar</button>
                                                <button className="px-4 py-2 ml-1 bg-green-400 text-white rounded-md hover:bg-green-500 active:bg-green-600 focus:outline-none" onClick={() => guardar()}>Guardar</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 focus:outline-none" onClick={() => eliminar()}>Eliminar</button>
                                                <button className="px-4 py-2 ml-1 bg-slate-500 text-white rounded-md hover:bg-slate-600 active:bg-slate-700 focus:outline-none" onClick={() => { setIsEditable(!isEditable); setEditedPost({ ...post }) }}>Editar</button>
                                            </>
                                        )}
                                    </>
                                ) : <>
                                    {session.user.roles && session.user.roles[1] === "Estudiante" && post.aplicable ? (
                                        <>
                                            <button
                                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                                                onClick={() => { aplicar() }}
                                                disabled={post?.aplicantes?.includes(session.user.id)}
                                            >
                                                {post?.aplicantes?.includes(session.user.id) ? "Ya has aplicado" : "Aplicar"}
                                            </button>
                                        </>
                                    ) : (null)}
                                </>
                                }

                            </div>

                        </div>

                    </div>
                    {session.user.id === post.company_id ? (<>
                        <div className="bg-white rounded-lg shadow-md mb-6 p-6">
                            {post.aplicantes ? (
                                <table className="w-full text-left table-auto">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="px-4 py-2">Nombre</th>
                                            <th className="px-4 py-2">CV</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {post.aplicantes.map((aplicante, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                                <td className="px-4 py-2">
                                                    <Link href={`/Users/${aplicante.id}`} className="text-blue-500 hover:underline">
                                                        {aplicante.Nombre}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-2">
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center text-gray-500 text-xl">Todavía no se han registrado aplicantes</p>
                            )}
                        </div>
                    </>) : (
                        null
                    )}
                </div>
            </div>
        </BaseLayout >;
    }
};

export default JobPosting;