"use client";

import {
  Megaphone,
  Users,
  BookOpenCheck,
  Building2,
  UserCog,
  Sparkles,
} from "lucide-react";
import React from "react";

/* =========================================================
   Types
========================================================= */
type ShortcutItem = {
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

type PrimaryCardItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge: string;
  badgeClass: string;
};

/* =========================================================
   Data
========================================================= */
const quickLinks: ShortcutItem[] = [
  {
    label: "Create announcement",
    description: "Share important updates with the entire campus.",
    href: "/dashboard/announcements/new",
    icon: Megaphone,
  },
  {
    label: "Add student",
    description: "Enroll a new learner and assign an advisor.",
    href: "/dashboard/students/new",
    icon: Users,
  },
  {
    label: "Add course",
    description: "Publish a course with schedules and instructors.",
    href: "/dashboard/courses/new",
    icon: BookOpenCheck,
  },
  {
    label: "Create department",
    description: "Organize programs, chairs, and faculty.",
    href: "/dashboard/departments/new",
    icon: Building2,
  },
  {
    label: "Invite user",
    description: "Provision staff or faculty access to systems.",
    href: "/dashboard/users/new",
    icon: UserCog,
  },
];

const nextUpdates = [
  "Add spring announcements to keep everyone aligned.",
  "Review pending student admissions by Friday.",
  "Verify department budgets before next term.",
];

const featuredCards: PrimaryCardItem[] = [
  {
    title: "Manage students",
    href: "/dashboard/students",
    description: "Track enrollment, retention, and advising across cohorts.",
    icon: Users,
    badge: "2 pending",
    badgeClass: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  },
  {
    title: "Departments overview",
    href: "/dashboard/departments",
    description: "See program health, chair updates, and faculty staffing.",
    icon: Building2,
    badge: "5 programs",
    badgeClass: "bg-amber-50 text-amber-800 ring-amber-200",
  },
];

/* =========================================================
   Main Component
========================================================= */
export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <DashboardSection
            title="Quick links"
            description="Jump directly into important actions."
          >
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {quickLinks.map((item) => (
                <LinkCard key={item.label} {...item} />
              ))}
            </div>
          </DashboardSection>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredCards.map((card) => (
              <FeaturedCard key={card.title} {...card} />
            ))}
          </div>

          <DashboardSection
            title="What's next"
            description="Stay ahead of weekly goals."
            action="Updated daily"
          >
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {nextUpdates.map((update) => (
                <li
                  key={update}
                  className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                  {update}
                </li>
              ))}
            </ul>
          </DashboardSection>
        </div>

        <SidebarPanel />
      </section>
    </div>
  );
}

/* =========================================================
   Components
========================================================= */

function DashboardHeader() {
  return (
    <header className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">
            Welcome back, admin
          </p>

          <div className="flex items-center gap-2 text-3xl font-semibold">
            <Sparkles className="h-6 w-6 text-amber-300" />
            <h1>University dashboard</h1>
          </div>

          <p className="max-w-2xl text-sm text-slate-300">
            Manage announcements, users, courses, departments all in one place.
          </p>
        </div>

        <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold ring-1 ring-white/20">
          All systems operational
        </span>
      </div>
    </header>
  );
}

function DashboardSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        {action && (
          <span className="text-xs font-semibold text-indigo-600">{action}</span>
        )}
      </div>

      {children}
    </div>
  );
}

function LinkCard({ label, description, href, icon: Icon }: ShortcutItem) {
  return (
    <a
      href={href}
      className="group flex gap-3 rounded-xl border border-slate-100 p-4 hover:-translate-y-[1px] hover:border-indigo-100 hover:shadow-sm transition"
    >
      <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600 ring-1 ring-indigo-100">
        <Icon className="h-5 w-5" />
      </span>

      <div>
        <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
          {label}
        </p>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
    </a>
  );
}

function FeaturedCard({
  title,
  description,
  href,
  icon: Icon,
  badge,
  badgeClass,
}: PrimaryCardItem) {
  return (
    <a
      href={href}
      className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 hover:-translate-y-[2px] hover:ring-indigo-100 transition"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-slate-50 p-2 text-slate-700 ring-1 ring-slate-200">
          <Icon className="h-5 w-5" />
        </span>

        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-600">{description}</p>
        </div>
      </div>

      <span
        className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${badgeClass}`}
      >
        {badge}
      </span>
    </a>
  );
}

function SidebarPanel() {
  return (
    <aside className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-semibold text-slate-900">Need a hand?</h2>

      <p className="text-sm text-slate-600">
        Check office hours, schedule time with advisors, or reach support anytime.
      </p>

      <SidebarInfo text="📅 Advisor: 2:00 PM–4:00 PM" color="indigo" />
      <SidebarInfo text="✅ No financial holds" color="emerald" />
      <SidebarInfo text="⏳ Tuition due in 10 days" color="amber" />

      <a
        href="mailto:helpdesk@university.edu"
        className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
      >
        Contact support
      </a>
    </aside>
  );
}

function SidebarInfo({ text, color }: { text: string; color: string }) {
  return (
    <div className={`rounded-lg bg-${color}-50 p-3 text-${color}-800 ring-1 ring-${color}-200`}>
      {text}
    </div>
  );
}
