import ListingForm from "@/components/admin/ListingForm";
import { readJSON } from "@/lib/data";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Listing" };

interface Listing { id: string; [key: string]: unknown }

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listings = readJSON<Listing[]>("listings.json");
  const listing = listings.find((l) => l.id === id);
  if (!listing) notFound();
  return <ListingForm mode="edit" initial={listing as Parameters<typeof ListingForm>[0]["initial"]} />;
}
