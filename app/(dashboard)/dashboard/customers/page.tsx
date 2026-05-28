export const dynamic = "force-dynamic";

import { CustomersPage } from "@/components/customers/customers-page";

export const metadata = { title: "Customers — ReviewPilot" };

export default function Page() {
  return (
    <div className="p-6 h-full">
      <CustomersPage />
    </div>
  );
}
