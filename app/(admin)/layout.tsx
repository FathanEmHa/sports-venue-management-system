import AdminSidebar from "@/components/admin/sidebar/sidebar";
import AdminNavbar from "@/components/admin/navbar/navbar";

import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <AdminSidebar />
            </div>

            <div className="flex flex-1 flex-col">
                {/* Mobile Header */}
                <div className="border-b p-4 md:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <Menu />
                        </SheetTrigger>

                        <SheetContent
                            side="left"
                            className="p-0"
                        >
                            <AdminSidebar />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Navbar */}
                <AdminNavbar />

                <main
                    className="
                        flex-1
                        bg-muted/30
                        p-6
                    "
                >
                    {children}
                </main>
            </div>
        </div>
    );
}