import { useEffect, useState } from 'react';

function HomeAdView() {
  const [users, setUsers] = useState([]);
  const apiUrl = 'https://localhost:7199/api/Usu_Usuarios';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Estado</th>
            <th>Tipo de cuenta</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id_usuario}>
              <td>{user.id_usuario}</td>
              <td>{user.nom_usuario}</td>
              <td>{user.contrasena}</td>
              <td>{user.idusucatestado}</td>
              <td>{user.idusucattipousuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomeAdView;
