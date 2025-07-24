'use client';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { Vendor } from '@/types/vendor';

export default function VendorForm({
     initialValues = {},
     onSubmit,
     submitLabel = 'Submit',
}: {
     initialValues?: Partial<Vendor>;
     onSubmit: (values: Partial<Vendor>) => Promise<void>;
     submitLabel?: string;
}) {
     const [values, setValues] = useState<Partial<Vendor>>(initialValues);
     const [loading, setLoading] = useState(false);

     function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
          setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
     }

     async function handleSubmit(e: React.FormEvent) {
          e.preventDefault();
          setLoading(true);
          await onSubmit(values);
          setLoading(false);
     }

     return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
               <label htmlFor="vendorName" className="font-medium">
                    Vendor Name <span className="text-red-500">*</span>
               </label>
               <Input
                    id="vendorName"
                    name="vendorName"
                    value={values.vendorName || ''}
                    onChange={handleChange}
                    placeholder="Vendor Name"
                    required
               />

               <label htmlFor="bankAccountNo" className="font-medium">
                    Bank Account No <span className="text-red-500">*</span>
               </label>
               <Input
                    id="bankAccountNo"
                    name="bankAccountNo"
                    value={values.bankAccountNo || ''}
                    onChange={handleChange}
                    placeholder="Bank Account No"
                    required
               />

               <label htmlFor="bankName" className="font-medium">
                    Bank Name <span className="text-red-500">*</span>
               </label>
               <Input
                    id="bankName"
                    name="bankName"
                    value={values.bankName || ''}
                    onChange={handleChange}
                    placeholder="Bank Name"
                    required
               />

               <label htmlFor="addressLine1" className="font-medium">
                    Address Line 1
               </label>
               <Input
                    id="addressLine1"
                    name="addressLine1"
                    value={values.addressLine1 || ''}
                    onChange={handleChange}
                    placeholder="Address Line 1"
               />

               <label htmlFor="addressLine2" className="font-medium">
                    Address Line 2
               </label>
               <Input
                    id="addressLine2"
                    name="addressLine2"
                    value={values.addressLine2 || ''}
                    onChange={handleChange}
                    placeholder="Address Line 2"
               />

               <label htmlFor="city" className="font-medium">
                    City
               </label>
               <Input
                    id="city"
                    name="city"
                    value={values.city || ''}
                    onChange={handleChange}
                    placeholder="City"
               />

               <label htmlFor="country" className="font-medium">
                    Country
               </label>
               <Input
                    id="country"
                    name="country"
                    value={values.country || ''}
                    onChange={handleChange}
                    placeholder="Country"
               />

               <label htmlFor="zipCode" className="font-medium">
                    Zip Code
               </label>
               <Input
                    id="zipCode"
                    name="zipCode"
                    value={values.zipCode || ''}
                    onChange={handleChange}
                    placeholder="Zip Code"
               />
               <Button type="submit" disabled={loading} aria-busy={loading}>
                    {submitLabel}
               </Button>
          </form>
     );
}
