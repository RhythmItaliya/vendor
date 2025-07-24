'use client';

import useSWR from 'swr';
import Link from 'next/link';
import Button from '../ui/Button';
import type { Vendor } from '@/types/vendor';
import { deleteVendor } from '../_actions/vendor';
import { useState } from 'react';
import Skeleton from '../ui/Skeleton';
import Pagination from '../ui/Pagination';
import ConfirmDialog from '../ui/ConfirmDialog';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function VendorsList() {
     const [page, setPage] = useState(1);

     const pageSize = 5;

     const [confirm, setConfirm] = useState(false);
     const [pendingId, setPendingId] = useState<string | null>(null);
     const [deleteId, setDeleteId] = useState<string | null>(null);

     const { data, mutate } = useSWR<{ vendors: Vendor[]; total: number }>(
          `/api/vendors?page=${page}&pageSize=${pageSize}`,
          fetcher,
     );
     const vendors = data?.vendors || [];

     const total = data?.total || 0;
     const totalP = Math.ceil(total / pageSize);

     const start = total === 0 ? 0 : (page - 1) * pageSize;
     const end = total === 0 ? 0 : Math.min(start + vendors.length, total);

     async function handleDelete(id: string) {
          setPendingId(id);
          setConfirm(true);
     }

     async function confirmDelete() {
          if (pendingId) {
               setDeleteId(pendingId);
               await deleteVendor(pendingId);
               setDeleteId(null);
               setConfirm(false);
               setPendingId(null);
               mutate();
          }
     }

     function cancelDelete() {
          if (!deleteId) {
               setConfirm(false);
               setPendingId(null);
          }
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
                         {typeof data === 'undefined' ? (
                              Array.from({ length: 5 }).map((_, i) => (
                                   <div key={i}>
                                        <div className="flex justify-between items-center p-3 bg-white border rounded">
                                             <div>
                                                  <Skeleton className="h-5 w-32 mb-2" />
                                                  <Skeleton className="h-4 w-48" />
                                             </div>
                                             <div className="flex gap-2">
                                                  <Skeleton className="h-8 w-16" />
                                                  <Skeleton className="h-8 w-16" />
                                             </div>
                                        </div>
                                   </div>
                              ))
                         ) : total === 0 ? (
                              <div className="text-center py-10 text-gray-500">
                                   No vendors found.
                              </div>
                         ) : (
                              vendors.map((vendor) => (
                                   <div key={vendor.id}>
                                        <div className="flex justify-between items-center p-3 bg-white border rounded">
                                             <div>
                                                  <div className="font-medium text-gray-800">
                                                       {vendor.vendorName}
                                                  </div>
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
                                                       disabled={deleteId === vendor.id}
                                                       aria-busy={deleteId === vendor.id}
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
                              {total === 0 ? '0 of 0' : `${start + 1}-${end} of ${total}`}
                         </div>
                         <Pagination
                              page={page}
                              totalPages={totalP}
                              onPageChange={setPage}
                              disabled={typeof data === 'undefined'}
                         />
                    </div>
               </div>
               <ConfirmDialog
                    open={confirm}
                    title="Delete Vendor"
                    message="Are you sure you want to delete this vendor?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    confirmText="Delete"
                    cancelText="Cancel"
                    loading={!!deleteId}
               />
          </main>
     );
}
