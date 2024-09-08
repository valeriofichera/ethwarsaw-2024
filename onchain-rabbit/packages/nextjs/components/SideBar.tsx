import Link from "next/link"
import {
  Bell,
  Droplets,
  Home,
  LifeBuoy,
  LineChart,
  ListCollapse,
  LogOut,
  Menu,
  Package,
  Send,
  Settings,
  ShoppingCart,
  Store,
  Tractor,
  UserRound,
  Users,
} from "lucide-react"

import { Badge } from "~~/components/ui/badge"
import { Button } from "~~/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~~/components/ui/sheet"

import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import { usePathname } from 'next/navigation';
import { useContext } from "react";
import { FunnyContext } from "~~/services/funny/funnyContext";

export function SideBar() {
  const context = useContext(FunnyContext);

  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    return pathname === href
      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };

  return (
    <div className="sticky top-0 grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="" className="flex ml-2 items-center gap-2 font-semibold">
              <span className="h-6">[⛓,🐰]</span>
              <span className="">onchain rabbit</span>
            </Link>
          </div>
          <div className="flex h-14 items-center border-b px-6 p-12">
            <div className="flex flex-col gap-1 pt-4 pl-7 mb-5 items-center">
              <RainbowKitCustomConnectButton />
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link href="/" className={getLinkClass("/")}>
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link href="/market" className={getLinkClass("/market")}>
                <Store className="h-4 w-4" />
                Marketplace
              </Link>
            </nav>
          </div>
          <div className="p-4 mb-12">
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link onClick={() => context?.setLogoutPopUp(true)} href="" className={getLinkClass("")}>
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden m-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="h-6">[🤡,💸]</span>
                <span className="">funny.money</span>
              </Link>
              <Link href="#" className={getLinkClass("#")}>
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link href="#" className={getLinkClass("#")}>
                <ShoppingCart className="h-5 w-5" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  mobile
                </Badge>
              </Link>
              <Link href="#" className={getLinkClass("#")}>
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link href="#" className={getLinkClass("#")}>
                <Users className="h-5 w-5" />
                Customers
              </Link>
              <Link href="#" className={getLinkClass("#")}>
                <LineChart className="h-5 w-5" />
                Analytics
              </Link>
            </nav>
            <div className="mt-auto mb-12">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="#" className={getLinkClass("#")}>
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link href="#" className={getLinkClass("#")}>
                  <Package className="h-5 w-5" />
                  Products
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
