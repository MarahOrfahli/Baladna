import { Outlet } from "react-router-dom";
import AppHeader from "../components/header/Header";
const AdminLayout = () => {
    return ( 
        <>
        <AppHeader>
            this is header
        </AppHeader>
        <main>
            <Outlet/>
        </main>
        </>
     );
}
 
export default AdminLayout;