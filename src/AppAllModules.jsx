import { RouterProvider } from "react-router-dom";
import  EcommerceRouter from "./navigation/NaviRoutesCommerce";
import Footer from "./share/footer/components/Footer";
import { GET_DATA_START } from "./security/redux/thunks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";


export default function AppAllModules() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_DATA_START()).then(() => {
            console.log("<<END-DISPATCH>>: GET_DATA_START se ejecutó de forma correcta");
        });
    }, []);


    return (
        <>
            <div id='div-app'>
                {/*<h1>Main App - All Modules</h1>*/}
                <ToastContainer />
                <RouterProvider router={EcommerceRouter} />
                <div id='div-footer'>
                    <Footer />
                </div>
                
            </div>
        </> 
    );
}