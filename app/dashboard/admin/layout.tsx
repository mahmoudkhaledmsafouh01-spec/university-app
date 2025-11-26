"use client";

import "../../globals.css";
import { ReactNode, useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Building2,
  Megaphone,
  LogOut,
  Bell,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

// Sidebar links
const navItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
  { name: "Departments", href: "/dashboard/admin/departments", icon: Building2 },
  {
    name: "Announcements",
    href: "/dashboard/admin/announcements",
    icon: Megaphone,
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dark Mode Sync with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-900 transition-colors">

      {/* ---------- MOBILE OVERLAY ---------- */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ---------- SIDEBAR ---------- */}
      <aside
        className={`fixed z-40 lg:static top-0 left-0 h-full w-64
        bg-slate-900 dark:bg-slate-800 text-white p-6 flex flex-col gap-8
        transform ${mobileOpen ? "translate-x-0" : "-translate-x-64"}
        lg:translate-x-0 transition-transform`}
      >
        {/* Logo */}
        <div>
          <h1 className="text-xl font-bold">University Admin</h1>
          <p className="text-xs text-slate-400">Management Console</p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition 
                ${
                  active
                    ? "bg-slate-800 text-white font-semibold shadow"
                    : "text-slate-300 hover:bg-slate-800/40"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto">
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex gap-3 items-center px-3 py-2 text-sm text-slate-300 hover:bg-red-600/20 rounded-lg transition"
          >            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
        </aside>

      {/* ---------- MAIN CONTENT AREA ---------- */}
      <div className="flex-1 flex flex-col">

        {/* ---------- TOPBAR ---------- */}
        <header className="w-full px-6 py-4 border-b bg-white dark:bg-slate-800 dark:border-slate-700 flex items-center justify-between">
          
          {/* Left - Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="h-6 w-6 text-slate-700 dark:text-white" />
            </button>

            {/* Breadcrumb */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-300">Admin Panel</p>
              <h2 className="text-lg font-semibold capitalize text-slate-700 dark:text-white">
                {pathname.split("/").pop()?.replace("-", " ")}
              </h2>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {dark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              <Bell className="h-5 w-5 text-slate-700 dark:text-white" />
              <span className="absolute top-1 right-1 bg-red-500 text-[10px] text-white w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            {/* Admin Avatar */}
            <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center font-bold text-slate-700 dark:text-white">
              A
            </div>
          </div>
        </header>

        {/* ---------- PAGE CONTENT (with animation) ---------- */}
                <main className="p-8">

          {children}
        </main>
      </div>
    </div>
  );
}
