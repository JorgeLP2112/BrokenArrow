import { useEffect, useState } from 'react';
import BaseLayout from "@/components/BaseLayout";

const Mails = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch('/api/users')
			.then(response => response.json())
			.then(data => setUsers(data));
	}, []);

	return (
		<BaseLayout>
			<h1>Usuarios activos: {users.length}</h1>
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Correo</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.name}</td>
							<td>{user.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</BaseLayout>
	);
};

export default Mails;