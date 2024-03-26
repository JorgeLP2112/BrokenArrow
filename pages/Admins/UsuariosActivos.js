import { useEffect, useState, useCallback, useContext } from 'react';
import { SidebarContext } from '@/context/SidebarContext';
import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

const main = () => {

    const { isCollapsed } = useContext(SidebarContext);

    useEffect(() => {
        const layout = document.querySelector('.layout');
        const btn = document.querySelector('.btn');

        if (isCollapsed) {
            layout.style.marginLeft = 'var(--sidebar-collapsed-width)';
            btn.style.left = '4rem';
        } else {
            layout.style.marginLeft = 'var(--sidebar-width)';
            btn.style.left = '87%';
        }
    }, [isCollapsed]);

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
                    // Split the roles by comma and trim whitespace
                    value = value.split(',').map(role => role.trim());
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
            <h1>Usuarios activos: {users.length}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Tipo</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={user.name}
                                    disabled={!user.isEditing}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={user.email}
                                    disabled={!user.isEditing}
                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={user.roles[0]}
                                    disabled={!user.isEditing}
                                    onChange={(e) => handleInputChange(index, 'roles', e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleEditClick(index)}>
                                    {user.isEditing ? 'Guardar' : 'Modificar'}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => deleteUser(user._id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </BaseLayout>
    );
};

export default main;