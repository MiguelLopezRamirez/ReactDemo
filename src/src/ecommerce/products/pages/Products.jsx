import { Box } from "@mui/material";
import { useState } from "react";
import ProductsNavTab from "../components/tabs/ProductsNavTab";
//import ProductsTab from "../components/tabs/ProductsTab";
//import CategoriesTab from "../components/tabs/CategoriesTab";

const Products = () => {
    const [currentTabInMain, setCurrentTabInMain] = useState("PRODUCTOS");

    return (
        <Box>
            <ProductsNavTab setCurrentTabInMain={setCurrentTabInMain} />

            {/*{currentTabInMain === "PRODUCTOS" && <ProductsTab />}
            {currentTabInMain === "CATEGORÍAS" && <CategoriesTab />}*/}
        </Box>
    );
};

export default Products;
