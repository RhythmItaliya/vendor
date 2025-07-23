"use client";

import useSWR from "swr";
import Link from "next/link";
import Button from "../ui/Button";
import type { Vendor } from "@/types/vendor";
import { deleteVendor } from "../_actions/vendor";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function VendorsList() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [deletingId, setDeletingId] = useState<string | null>(null);


  const { data, mutate } = useSWR<{ vendors: Vendor[]; total: number }>(`/api/vendors?page=${page}&pageSize=${pageSize}`, fetcher);
  const vendors = data?.vendors || [];
  const total = data?.total || 0;
  const totalP = Math.ceil(total / pageSize);
  const start = total === 0 ? 0 : (page - 1) * pageSize;
  const end = total === 0 ? 0 : Math.min(start + vendors.length, total);

  async function handleDelete(id: string) {
    setDeletingId(id);
    await deleteVendor(id);
    setDeletingId(null);
    mutate();
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-gray-800">Vendors</h2>
        
        <Link href="/vendors/add">
          <Button>Add Vendor</Button>
        </Link>
      </div>


      <div className="border rounded p-4 bg-gray-50">
        <div className="space-y-3 mt-2">
          {total === 0 ? (
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
                      disabled={deletingId === vendor.id}
                      aria-busy={deletingId === vendor.id}
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

        
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-600">
            {total === 0 ? "0 of 0" : `${start + 1}-${end} of ${total}`}
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              disabled={page === 1}
              aria-busy={false}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </Button>
            {Array.from({ length: totalP }, (_, i) => (
              <button
                key={i}
                className={`px-2 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
                onClick={() => setPage(i + 1)}
                disabled={page === i + 1}
              >
                {i + 1}
              </button>
            ))}
            <Button
              type="button"
              disabled={page === totalP || total === 0}
              aria-busy={false}
              onClick={() => setPage((p) => Math.min(totalP, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
