import { Box } from "@mui/material";
import { useState } from "react";
import RolesNavTab from "../components/tabs/PricesNavTab";
import RolesTab from "../components/tabs/RolesTab";
import ProcessTab from "../components/tabs/ProcessTab";
import PrivilegesTab from "../components/tabs/PrivilegesTab";

const Roles = () => {
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("ROLES");

    return (
      <Box>
      <RolesNavTab setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab} />
        <div>
            {currentTabInPrincipalTab === "ROLES" && <RolesTab />}
            {currentTabInPrincipalTab === "PROCESOS" && <ProcessTab />}
            {currentTabInPrincipalTab === "PRIVILEGIOS" && <PrivilegesTab />}
        </div>
  </Box>
    );
};

export default Roles;
