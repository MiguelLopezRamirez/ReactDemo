import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const UserTabs = ["Usuarios", "Roles"];

const UserNavTab = ({ setCurrentCategory }) => {
    // Estado para controlar la pestaña actual
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        const selectedTab = e.target.innerText.toUpperCase();
        setCurrentCategory(selectedTab); // Actualiza la categoría actual
        setCurrentTabIndex(selectedTab === "PRODUCTOS" ? 0 : 1);
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currentTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="User tabs"
                textColor="primary"
            >
                {UserTabs.map((tab) => (
                    <Tab key={tab} label={tab} />
                ))}
            </Tabs>
        </Box>
    );
};

export default UserNavTab;