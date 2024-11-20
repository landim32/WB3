import React from 'react';
import IAuthProvider from '../Interface/IAuthProvider';

const AuthContext = React.createContext<IAuthProvider>(null);

export default AuthContext;