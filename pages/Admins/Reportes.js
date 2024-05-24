import { useEffect, useState, useCallback } from 'react';
import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from 'next/link'

const Main = () => {

    const { data: session, status } = useSession();
    const [reportes, setReportes] = useState([]);
    const [reporteType, setReporteType] = useState("Perfiles");
    const router = useRouter();
    const loading = status === 'loading';

    const fetchReportes = async (reporteType) => {
        try {
            const response = await fetch(`/api/Admin/reportes?type=${reporteType}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Reportes');
            }
            const data = await response.json();
            setReportes(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!loading) {
            if (!session) {
                router.push('../');
            } else if (!(session.user.roles && session.user.roles[0] === "Admin")) {
                router.push('../Users');
            } else {
                fetchReportes(reporteType);
            }
        }
    }, [session, router, loading, reporteType]);

    return (
        <BaseLayout>
            <div className="bg-gray-200 min-h-screen ">
                <div className="mx-auto w-10/12  bg-white shadow-md p-4 rounded-md">

                    <select
                        value={reporteType}
                        onChange={e => {
                            setReporteType(e.target.value); fetchReportes(e.target.value);
                        }}
                        className="bg-white p-2 mb-4 w-1/4"
                    >
                        <option value="Perfiles">Perfiles</option>
                        <option value="Ofertas">Ofertas</option>
                    </select>

                    <h1 className="text-2xl font-bold">Reportes de {reporteType === 'Perfiles' ? 'perfiles' : 'ofertas'}</h1>
                    {reportes.length === 0 ? (
                        <p className="text-center mt-4 text-xl text-gray-500">No hay reportes.</p>) : (
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">{reporteType === 'Perfiles' ? 'Perfil reportado' : 'Oferta reportada'}</th>                            <th className="px-4 py-2">Descripción del Reporte</th>
                                    <th className="px-4 py-2">Nombre del reportante</th>
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportes.map((reporte, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="border px-4 py-2">
                                            {reporteType === 'Perfiles' ?
                                                <Link href={`/Users/${reporte.reportedItemId}`} className="text-blue-500">
                                                    {reporte.reportedElement}
                                                </Link>
                                                : <Link href={`/Ofertas/${reporte.reportedItemId}`} className="text-blue-500">
                                                    {reporte.reportedElement}
                                                </Link>
                                            }
                                        </td>
                                        <td className="border px-4 py-2">{reporte.description}</td>
                                        <Link href={`/Users/${reporte.reporterId}`} className="text-blue-500">
                                            {reporte.reporterName}
                                        </Link>
                                        <td className="border px-4 py-2">
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Declinar Reporte</button>
                                            <button className="px-4 py-2 bg-red-500 text-white rounded-md">Eliminar Elemento</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </BaseLayout >
    );
};

export default Main;
