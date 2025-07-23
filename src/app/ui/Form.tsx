"use client";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { Vendor } from "@/types/vendor";

export default function VendorForm({
  initialValues = {},
  onSubmit,
  submitLabel = "Submit",
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
      <Input name="vendorName" value={values.vendorName || ""} onChange={handleChange} placeholder="Vendor Name" required />
      <Input name="bankAccountNo" value={values.bankAccountNo || ""} onChange={handleChange} placeholder="Bank Account No" required />
      <Input name="bankName" value={values.bankName || ""} onChange={handleChange} placeholder="Bank Name" required />
      <Input name="addressLine1" value={values.addressLine1 || ""} onChange={handleChange} placeholder="Address Line 1" />
      <Input name="addressLine2" value={values.addressLine2 || ""} onChange={handleChange} placeholder="Address Line 2" />
      <Input name="city" value={values.city || ""} onChange={handleChange} placeholder="City" />
      <Input name="country" value={values.country || ""} onChange={handleChange} placeholder="Country" />
      <Input name="zipCode" value={values.zipCode || ""} onChange={handleChange} placeholder="Zip Code" />
      <Button type="submit" disabled={loading} aria-busy={loading}>{submitLabel}</Button>
    </form>
  );
}