"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    href: string;
    icon: string;
    label: string;
}

const navItems: NavItem[] = [
    { href: "/", icon: "home", label: "Home" },
    { href: "/library", icon: "library_music", label: "Library" },
    { href: "/profile", icon: "person", label: "Profile" },
];

export default function BottomNavigation() {
    const pathname = usePathname();

    return (
        <nav className="h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex justify-around items-center px-4 pb-4">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        className="flex flex-col items-center gap-1 group transition-all"
                        href={item.href}
                    >
                        <div
                            className={`p-1 rounded-xl transition-colors ${isActive
                                    ? "bg-[#137fec]/10 text-[#137fec]"
                                    : "text-slate-400 dark:text-slate-500 group-hover:text-[#137fec]"
                                }`}
                        >
                            <span
                                className={`material-symbols-outlined text-2xl ${isActive ? "filled" : ""
                                    }`}
                            >
                                {item.icon}
                            </span>
                        </div>
                        <span
                            className={`text-[10px] font-bold uppercase tracking-tighter ${isActive
                                    ? "text-[#137fec]"
                                    : "text-slate-400 dark:text-slate-500"
                                }`}
                        >
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
