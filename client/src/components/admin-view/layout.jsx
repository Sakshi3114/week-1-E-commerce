import { Outlet } from "react-router";
import AdminHeader from "./header";
import AdminSideBar from "./side-bar";
import { useState } from "react";


function AdminLayout() {
    const[openSidebar, setOpenSidebar] = useState(false);
    return(
        <div className="flex min-h-screen w-full ">
            <AdminSideBar open= {openSidebar} setOpen= {setOpenSidebar} />
            <div className="flex flex-1 flex-col ">
                <AdminHeader setOpen={setOpenSidebar}/>
                <main className="flex flex-col flex-1 bg-muted/40 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;