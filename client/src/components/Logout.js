import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function Logout() {
  // Perform logout actions here, such as clearing the user's session or token
  // Then redirect the user to the desired location
  // For example:
  // localStorage.removeItem('token');
  return <Navigate to="/" />;
}

export default function LogoutRoute() {
  return <Route path="/logout" element={<Logout />} />;
}
