import React from 'react';
import IGehrProvider from '../Interface/IGehrProvider';

const GehrContext = React.createContext<IGehrProvider>(null);

export default GehrContext;