'use client'
import CartesianPlane from "@/components/CartesianPlane/CartesianPlane";
import { FormRoverCommand } from "@/components/FormRoverCommand/FormRoverCommand";
import { LogsTable } from "@/components/Tables/LogsTable/LogsTable";

export default function Home() {
  return (
    <main className="h-screen flex flex-col gap-2  p-9">
      <div className="w-full flex gap-2">
        <FormRoverCommand />
        <CartesianPlane />
      </div>
      <LogsTable />
    </main>
  );
}
