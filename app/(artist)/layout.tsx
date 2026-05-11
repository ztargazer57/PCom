import { Button } from "@/components/ui/button";
import {
  Bell,
  Star,
  Inbox,
  Settings,
  User,
  Image,
  BoxIcon,
  LayoutGridIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", icon: LayoutGridIcon, url: "/dashboard" },
  { label: "Profile", icon: User, url: "/profile" },
  { label: "Site Content", icon: BoxIcon, url: "/site-content" },
  { label: "Commission", icon: Inbox, url: "/commission" },
];
export default function DasboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row bg-[#F7FBFF]">
      <aside className="border-b border-sky-100 bg-white/80 px-5 py-4 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
        <div className="flex items-center justify-between lg:block w-full">
          <a
            href="../"
            className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-800"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-200/80 shadow-sm">
              <Star className="h-5 w-5 fill-sky-100 text-sky-600" />
            </span>
            Lumi Studio
          </a>
          <Button
            size="icon"
            variant="outline"
            className="rounded-2xl border-sky-100 bg-sky-50 text-sky-600 lg:hidden"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.url}
                className={`flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  item.active
                    ? "bg-sky-100 text-sky-700 shadow-sm"
                    : "text-slate-500 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 hidden rounded-[1.5rem] bg-gradient-to-br from-sky-100 to-white p-5 shadow-sm lg:block">
          <p className="text-sm font-semibold text-slate-800">
            Commission Status
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Open
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            You are currently accepting new custom artwork requests.
          </p>
        </div>
      </aside>
      <main className="min-h-screen flex-1 text-slate-700 px-0 lg:mt-8 lg:px-5 md:px-4">
        {children}
      </main>
    </div>
  );
}
