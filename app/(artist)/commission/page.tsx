import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ToggleRight } from "lucide-react";

const requests = [
  {
    name: "Mia Santos",
    type: "OC Portrait",
    date: "Apr 28",
    status: "Pending",
  },
  {
    name: "Kai Rivera",
    type: "Couple Art",
    date: "Apr 27",
    status: "Accepted",
  },
  {
    name: "Nora Lee",
    type: "Character Sheet",
    date: "Apr 25",
    status: "In Progress",
  },
  { name: "Theo Cruz", type: "Gift Portrait", date: "Apr 22", status: "Done" },
];

const statusClass: Record<string, string> = {
  Pending: "bg-slate-100 text-slate-600",
  Accepted: "bg-sky-100 text-sky-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Done: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function CommissionSection() {
    return(
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.4fr]">
            <Card className="rounded-[2rem] border-sky-100 bg-white shadow-lg shadow-sky-100/60">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">
                  Commission Settings
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Control availability, pricing, terms, and process.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between rounded-2xl bg-green-50 p-2">
                  <div>
                    <p className="font-semibold text-slate-800">Availability</p>
                    <p className="text-sm text-green-700">
                      Open for commissions
                    </p>
                  </div>
                  <ToggleRight className="h-9 w-9 text-sky-500" />
                </div>

                {[
                  ["Pricing", "Bust: $35\nHalf Body: $55\nFull Body: $80"],
                  [
                    "Terms",
                    "Payment upfront. Personal use only unless discussed.",
                  ],
                  [
                    "Process",
                    "Submit request → Review → Payment → Sketch → Final art",
                  ],
                ].map(([label, value]) => (
                  <label key={label} className="block">
                    <span className="text-sm font-medium text-slate-600">
                      {label}
                    </span>
                    <textarea
                      className="mt-2 min-h-24 w-full rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                      defaultValue={value}
                    />
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-sky-100 bg-white shadow-lg shadow-sky-100/60">
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-800">
                    Commission Requests
                  </CardTitle>
                  <p className="mt-1 text-sm text-slate-500">
                    Review incoming client requests and update their status.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-2xl border-sky-100 bg-white text-slate-600 hover:bg-sky-50"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-[1.5rem] border border-sky-100">
                  <div className="hidden grid-cols-4 bg-sky-50 px-5 py-3 text-sm font-semibold text-slate-600 md:grid">
                    <span>Client</span>
                    <span>Type</span>
                    <span>Date</span>
                    <span>Status</span>
                  </div>
                  {requests.map((request) => (
                    <div
                      key={request.name}
                      className="grid gap-3 border-t border-sky-100 px-5 py-4 transition hover:bg-sky-50/70 md:grid-cols-4 md:items-center"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">
                          {request.name}
                        </p>
                        <p className="text-sm text-slate-500 md:hidden">
                          {request.type} · {request.date}
                        </p>
                      </div>
                      <p className="hidden text-sm text-slate-600 md:block">
                        {request.type}
                      </p>
                      <p className="hidden text-sm text-slate-500 md:block">
                        {request.date}
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[request.status]}`}
                        >
                          {request.status}
                        </span>
                        {request.status === "Done" && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
    );
}
