import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// HOC para proteger rutas
const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to="/" /> // Redirige al componente de inicio de sesión si no está autenticado
    )} />
  );
};

export default ProtectedRoute;
