import VendorForm from "@/components/admin/VendorForm";
export const metadata = { title: "Add Vendor" };
export default function NewVendorPage() {
  return <VendorForm mode="new" />;
}
