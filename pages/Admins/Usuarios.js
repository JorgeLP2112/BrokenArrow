import { useEffect, useState, useCallback } from 'react';
import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from 'next/link'

const Main = () => {

    const { data: session, status } = useSession();
    const [users, setUsers] = useState([]);
    const router = useRouter();
    const loading = status === 'loading';

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('/api/Admin/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }, []);


    const handleInputChange = useCallback((index, field, value) => {
        setUsers(users.map((user, i) => {
            if (i === index) {
                if (field === 'roles') {
                    let roles = value.split(',').map(role => role.trim());
                    let orderedRoles = [];

                    if (roles.includes('Admin')) {
                        orderedRoles.push('Admin');
                    } else if (roles.includes('user')) {
                        orderedRoles.push('user');
                        if (roles.includes('Empresa')) {
                            orderedRoles.push('Empresa');
                        } else if (roles.includes('Estudiante')) {
                            orderedRoles.push('Estudiante');
                        }
                    }

                    value = orderedRoles;
                }
                return { ...user, [field]: value };
            }
            return user;
        }));
    }, [users]);

    const handleEditClick = useCallback((index) => {
        setUsers(users.map((user, i) => {
            if (i === index) {
                if (user.isEditing) {
                    modifyUser(user._id, user.name, user.email, user.roles);
                }
                return { ...user, isEditing: !user.isEditing };
            }
            return user;
        }));
    }, [users]);

    const modifyUser = async (id, name, email, roles) => {
        try {
            const response = await fetch('/api/Admin/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, email, rol: roles[0] }),
            });
            if (!response.ok) {
                throw new Error('Failed to modify user');
            }
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch('/api/Admin/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            fetchUsers();
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
                fetchUsers();
            }
        }
    }, [session, router, loading]);

    return (
        <BaseLayout>
            <div className="bg-gray-200 min-h-screen ">
                <div className="flex flex-col  justify-center min-h-screen">

                    <div className="mx-auto w-10/12  bg-white shadow-md p-4 rounded-md">
                        <h1 className="text-2xl font-bold mb-4">Administradores</h1>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-4 px-6">Nombre</th>
                                    <th className="py-4 px-6">Correo</th>
                                    <th className="py-4 px-6">Tipo</th>
                                    <th className="py-4 px-6">Modificar</th>
                                    <th className="py-4 px-6">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    user.roles[0] === 'Admin' && (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <input
                                                    type="text"
                                                    value={user.name}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <input
                                                    type="text"
                                                    value={user.email}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <input
                                                    type="text"
                                                    value={user.roles[0]}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'roles', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <button
                                                    onClick={() => handleEditClick(index)}
                                                    className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700"
                                                >
                                                    {user.isEditing ? 'Guardar' : 'Modificar'}
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <button
                                                    onClick={() => deleteUser(user._id)}
                                                    className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mx-auto w-10/12  bg-white shadow-md p-4 rounded-md">
                        <h1 className="text-2xl font-bold mb-4">Estudiantes</h1>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-4 px-6">Nombre</th>
                                    <th className="py-4 px-6">Perfil</th>
                                    <th className="py-4 px-6">Correo</th>
                                    <th className="py-4 px-6">Tipo</th>
                                    <th className="py-4 px-6">Modificar</th>
                                    <th className="py-4 px-6">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    user.roles[0] === 'user' && user.roles[1] == 'Estudiante' && (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <input
                                                    type="text"
                                                    value={user.name}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <Link href={'/Users/' + user._id}>
                                                    Visitar perfil
                                                </Link>
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <input
                                                    type="text"
                                                    value={user.email}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <input
                                                    type="text"
                                                    value={user.roles[0]}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'roles', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <input
                                                    type="text"
                                                    value={user.roles[1]}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'roles', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <button
                                                    onClick={() => handleEditClick(index)}
                                                    className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700"
                                                >
                                                    {user.isEditing ? 'Guardar' : 'Modificar'}
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <button
                                                    onClick={() => deleteUser(user._id)}
                                                    className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mx-auto w-10/12  bg-white shadow-md p-4 rounded-md">
                        <h1 className="text-2xl font-bold mb-4">Empresas</h1>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-4 px-6">Nombre</th>
                                    <th className="py-4 px-6">Perfil</th>
                                    <th className="py-4 px-6">Correo</th>
                                    <th className="py-4 px-6">Tipo</th>
                                    <th className="py-4 px-6">Modificar</th>
                                    <th className="py-4 px-6">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    user.roles[0] === 'user' && user.roles[1] == 'Empresa' && (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <input
                                                    type="text"
                                                    value={user.name}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <Link href={'/Users/' + user._id}>
                                                    Visitar perfil
                                                </Link>
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <input
                                                    type="text"
                                                    value={user.email}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <input
                                                    type="text"
                                                    value={user.roles[0]}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'roles', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <input
                                                    type="text"
                                                    value={user.roles[1]}
                                                    disabled={!user.isEditing}
                                                    onChange={(e) => handleInputChange(index, 'roles', e.target.value)}
                                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <button
                                                    onClick={() => handleEditClick(index)}
                                                    className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700"
                                                >
                                                    {user.isEditing ? 'Guardar' : 'Modificar'}
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <button
                                                    onClick={() => deleteUser(user._id)}
                                                    className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </BaseLayout >
    );
};

export default Main;
