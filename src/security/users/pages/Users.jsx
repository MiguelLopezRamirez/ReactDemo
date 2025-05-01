import { Box } from "@mui/material";
import { useState } from "react";
import UserNavTab from "../components/tabs/UsersNavTab";
//import ProductsTab from "../components/tabs/ProductsTab";
//import CategoriesTab from "../components/tabs/CategoriesTab";

const Users = () => {
    const [currentTabInMain, setCurrentTabInMain] = useState("USUARIOS");

    return (
        <Box>
            <UserNavTab setCurrentTabInMain={setCurrentTabInMain} />
        </Box>
    );
};

export default Users;
