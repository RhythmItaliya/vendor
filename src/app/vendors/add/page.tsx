import { addVendor } from '@/app/_actions/vendor';
import Button from '@/app/ui/Button';
import Link from 'next/link';
import Header from '@/app/ui/Header';
import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { Vendor } from '@/types/vendor';
import VendorForm from '@/app/ui/Form';

export default async function AddVendorPage() {
     const session = await auth();

     if (!session) return notFound();
     const userName = session.user.name || 'User';
     const userImage = session.user.image || 'https://ui-avatars.com/api/?name=User';

     async function handleAdd(values: Partial<Vendor>) {
          'use server';

          const { id, userId, ...addData } = values;

          await addVendor({
               vendorName: addData.vendorName || '',
               bankAccountNo: addData.bankAccountNo || '',
               bankName: addData.bankName || '',
               addressLine1: addData.addressLine1 || '',
               addressLine2: addData.addressLine2 || '',
               city: addData.city || '',
               country: addData.country || '',
               zipCode: addData.zipCode || '',
          });
          redirect('/');
     }

     return (
          <main className="max-w-3xl mx-auto p-6">
               <Header user={{ name: userName, image: userImage }} />
               <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add Vendor</h2>

                    <Link href="/">
                         <Button>Back</Button>
                    </Link>
               </div>

               <VendorForm onSubmit={handleAdd} submitLabel="Add" />
          </main>
     );
}
