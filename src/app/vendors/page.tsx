"use client";

import useSWR from "swr";
import Link from "next/link";
import Button from "../ui/Button";
import type { Vendor } from "@/types/vendor";
import { deleteVendor } from "../_actions/vendor";
import { useTransition } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function VendorsList() {
  const { data: vendors = [], mutate } = useSWR<Vendor[]>("/api/vendors", fetcher);
  const [isPending, startTransition] = useTransition();

  async function handleDelete(id: string) {
    startTransition(async () => {
      await deleteVendor(id);
      mutate();
    });
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-gray-800">Vendors</h2>
        <Link href="/vendors/add">
          <Button>Add Vendor</Button>
        </Link>
      </div>

      <div className="space-y-3 mt-4">
        {vendors.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No vendors found.</div>
        ) : (
          vendors.map((vendor) => (
            <div key={vendor.id}>
              <div className="flex justify-between items-center p-3 bg-white border rounded">
                <div>

                  <div className="font-medium text-gray-800">{vendor.vendorName}</div>
                  <div className="text-sm text-gray-600">
                    {vendor.bankName} · {vendor.bankAccountNo}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/vendors/${vendor.id}`}>
                    <Button type="button">Edit</Button>
                  </Link>
                  <Button
                    type="button"
                    variant="red"
                    disabled={isPending}
                    onClick={() => handleDelete(vendor.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
