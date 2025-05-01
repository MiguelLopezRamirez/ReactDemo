import React from 'react';
import RolesTable from '../tables/RolesTable';
import { RolesProvider } from '../../pages/RolesProvider'; // Importa el contexto

const RolesTab = () => {
    return (
        <RolesProvider>
            <div>
                <RolesTable />
            </div>
        </RolesProvider>
    );
};

export default RolesTab;
