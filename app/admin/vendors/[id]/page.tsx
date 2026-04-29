import VendorForm from "@/components/admin/VendorForm";
import { readJSON } from "@/lib/data";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Vendor" };

interface Vendor { id: string; [key: string]: unknown }

export default async function EditVendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vendors = readJSON<Vendor[]>("vendors.json");
  const vendor = vendors.find((v) => v.id === id);
  if (!vendor) notFound();
  return <VendorForm mode="edit" initial={vendor as Parameters<typeof VendorForm>[0]["initial"]} />;
}
