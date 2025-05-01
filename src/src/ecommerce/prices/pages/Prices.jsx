import { Box } from "@mui/material";
import { useState } from "react";
import PricesNavTab from "../components/tabs/PricesNavTab";
import PricesTab from "../components/tabs/PricesTab";
import HistoryTab from "../components/tabs/HistoryTab";
import OffersTab from "../components/tabs/OffersTab";

const Prices = () => {
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("PRICES");

    return (
      <Box>
      <PricesNavTab setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab} />
        <div>
            {currentTabInPrincipalTab === "PRICES" && <PricesTab />}
            {currentTabInPrincipalTab === "HISTORY" && <HistoryTab />}
            {currentTabInPrincipalTab === "OFFERS" && <OffersTab />}
        </div>
  </Box>
    );
};

export default Prices;
