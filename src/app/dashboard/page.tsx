import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/status-badge";
import type { DealActivity } from "@/types/dashboard";

export const metadata: Metadata = { title: "Dashboard" };

const queueSnapshot = [
  { label: "Pending deals", value: "24", helper: "6 awaiting review today" },
  { label: "Reviewed this week", value: "142", helper: "12 completed since Monday" },
  { label: "Orders today", value: "386", helper: "+8.4% from yesterday" },
];

const recentActivity: DealActivity[] = [
  { title: "Weekend Coffee Bundle", partner: "Northstar Roasters", status: "approved" as const, time: "10 min ago" },
  { title: "Summer Studio Pass", partner: "Form & Flow", status: "pending" as const, time: "32 min ago" },
  { title: "Neighborhood Dinner for Two", partner: "Table Eleven", status: "rejected" as const, time: "1 hr ago" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Monday, June 15</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Operations overview
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Monitor deal reviews, order activity, and revenue across the
            marketplace.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-100 sm:self-auto">
          <span className="size-2 rounded-full bg-emerald-500" />
          Updated just now
        </div>
      </div>

      <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.9fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-slate-900">Queue snapshot</h2>
                <p className="mt-1 text-sm text-slate-500">
                  The queue is moving, but the first review still needs attention.
                </p>
              </div>
              <Link
                href="/dashboard/deals"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Review queue
              </Link>
            </div>

            <dl className="mt-6 grid gap-0 sm:grid-cols-3">
              {queueSnapshot.map((item) => (
                <div
                  key={item.label}
                  className="border-t border-slate-100 pt-5 first:border-t-0 first:pt-0 sm:border-t-0 sm:border-l sm:border-slate-100 sm:px-5 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
                >
                  <dt className="text-sm font-medium text-slate-500">
                    {item.label}
                  </dt>
                  <dd className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                    {item.value}
                  </dd>
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    {item.helper}
                  </p>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <h2 className="font-bold text-slate-900">
                  Recent deal activity
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Latest operator decisions
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-400">Today</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {recentActivity.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.partner} · {item.time}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="relative overflow-hidden rounded-2xl bg-[#13231b] p-6 text-white shadow-[0_16px_32px_rgba(19,35,27,0.18)]">
          <div
            aria-hidden="true"
            className="absolute -right-14 -top-14 size-44 rounded-full border-[28px] border-emerald-300/10"
          />
          <p className="text-xs font-semibold tracking-[0.08em] text-emerald-300">
            Queue priority
          </p>
          <h2 className="mt-4 max-w-sm text-2xl font-bold leading-tight">
            Keep the review queue moving.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-emerald-50/70">
            Six new submissions are waiting for an operator decision. The oldest
            has been pending for 3 hours.
          </p>
          <div className="mt-7 flex items-end justify-between border-t border-white/10 pt-5">
            <div>
              <p className="text-3xl font-bold">75%</p>
              <p className="mt-1 text-xs text-emerald-100/60">
                Daily review target
              </p>
            </div>
            <Link
              href="/dashboard/deals"
              aria-label="Open review queue"
              className="grid size-12 place-items-center rounded-full bg-emerald-400 text-xl text-[#13231b] transition-transform hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              →
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
