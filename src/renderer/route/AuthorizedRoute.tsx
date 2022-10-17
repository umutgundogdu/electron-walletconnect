import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthorizedRoute = ({ auth }: { auth: boolean }) =>
  auth ? <Outlet /> : <Navigate to="/login" />;
