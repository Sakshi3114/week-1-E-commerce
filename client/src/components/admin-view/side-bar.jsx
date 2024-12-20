import { Fragment } from "react";
import { ShieldEllipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBasket, BadgeDollarSign} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path : '/admin/dashboard',
        icons: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path : '/admin/product',
        icons: <ShoppingBasket />
    },
    {
        id: 'orders',
        label: 'Orders',
        path : '/admin/orders',
        icons : <BadgeDollarSign />
    }

]

function MenuItems({setOpen}) {
    const navigate = useNavigate();
    return (
        <nav className="mt-8 flex-col flex gap-2 ">
            {
                adminSidebarMenuItems.map(menuItem => (
                    <div key = {menuItem.id} 
                    onClick = {()=> 
                        {
                            navigate(menuItem.path);
                            setOpen ? setOpen(false) : null;
                        }
                        }
                     className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground text-xl">
                        { menuItem.icons }
                        <span>{menuItem.label}</span>
                    </div>
                ))
            }
        </nav>
    )
}

function AdminSideBar({open, setOpen}) {

    const navigate = useNavigate() ;

    return(
        <Fragment>
            <Sheet open= {open} onOpenChange={setOpen}>
                <SheetContent side='left' className= 'w-64' >
                    <div className="flex-col flex h-full">
                        <SheetHeader className= "border-b">
                        <ShieldEllipsis size={30}/>
                            <SheetTitle>Admin Panel</SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen}/>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={()=> navigate('/admin/dashboard')} className="flex cursor-pointer items-center gap-2 ">
                <ShieldEllipsis size={30}/>
                    <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    );
}

export default AdminSideBar;