import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import StoreProvider from "@/app/StoreProvider";
import GetAllCategories from "@/lib/GetAllDetails/GetAllCategories";
import GetAllProducts from "@/lib/GetAllDetails/GetAllProducts";
import GetAllAttributes from "@/lib/GetAllDetails/GetAllAttributes";
import GetUser from "@/lib/GetAllDetails/GetUser";
import GetAllPages from "@/lib/GetAllDetails/GetAllPages";
import { GetAllAdminUsers } from "@/lib/GetAllDetails/GetAllAdminUsers";

const JWT_SECRET =
  process.env.JWT_SECRET || "default_jwt_secret_change_me_in_prod";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  let user: any;

  let isAuthenticated = false;

  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      isAuthenticated = true;
      user = jwt.decode(token);
    } catch (e) {}
  }

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <StoreProvider>
      <GetAllCategories />
      <GetAllProducts />
      <GetAllAttributes />
      <GetUser user={user} />
      <GetAllPages />
      <GetAllAdminUsers />
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full flex-1 flex flex-col bg-luxury-ivory relative min-h-screen font-poppins antialiased text-luxury-black">
          <header className="flex h-20 shrink-0 items-center gap-2 border-b border-luxury-gold/10 bg-white/70 backdrop-blur-xl px-8 transition-all sticky top-0 z-[9999] shadow-sm">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 text-luxury-gold hover:bg-luxury-gold/10 rounded-xl transition-colors" />
              <Separator
                orientation="vertical"
                className="mr-2 h-4 bg-luxury-gold/20"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      href="/admin"
                      className="font-black text-[10px] uppercase tracking-[0.3em] text-luxury-black/40 hover:text-luxury-gold transition-colors"
                    >
                      Imperial Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block opacity-40 text-luxury-gold" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-black text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
                      Vault Overview
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex-1 p-8 md:p-12 max-w-[1800px] mx-auto w-full animate-in fade-in duration-1000">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </StoreProvider>
  );
}
