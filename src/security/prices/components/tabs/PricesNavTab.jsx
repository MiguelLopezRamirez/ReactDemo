import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const rolesTabs = ["ROLES", "PROCESOS", "PRIVILEGIOS"]; // Nombres de las pestañas relevantes para la página Roles

const RolesNavTab = ({ setCurrentTabInPrincipalTab }) => { // Cambiado aquí
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        const selectedTabName = rolesTabs[newValue].toUpperCase();
        setCurrentTabInPrincipalTab(selectedTabName); // Cambiado aquí
        setCurrentTabIndex(newValue);
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currentTabIndex}
                variant="fullWidth"
                onChange={handleChange}
                aria-label="Tabs de navegación de roles"
                textColor="primary"
            >
                {rolesTabs.map((tab, index) => (
                    <Tab key={index} label={tab} />
                ))}
            </Tabs>
        </Box>
    );
};

export default RolesNavTab;
