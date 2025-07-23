import { getVendors, updateVendor } from "@/app/_actions/vendor";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import Link from "next/link";
import Header from "@/app/ui/Header";

import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

export default async function EditVendorPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return notFound();
  const userName = session.user.name || "User";
  const userImage = session.user.image || "https://ui-avatars.com/api/?name=User";

  const vendors = await getVendors();

  const vendor = vendors.find(v => v.id === params.id);

  if (!vendor) return notFound();

  async function handleEditVendor(formData: FormData) {
    "use server";

    await updateVendor(params.id, {
      vendorName: formData.get("vendorName") as string,
      bankAccountNo: formData.get("bankAccountNo") as string,
      bankName: formData.get("bankName") as string,
      addressLine1: formData.get("addressLine1") as string,
      addressLine2: formData.get("addressLine2") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      zipCode: formData.get("zipCode") as string,
    });

    redirect("/");
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Header user={{ name: userName, image: userImage }} />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Vendor</h2>
        <Link href="/">
          <Button>Back</Button>
        </Link>
      </div>

      <form action={handleEditVendor} className="flex flex-col gap-3">
        <Input name="vendorName" defaultValue={vendor.vendorName} placeholder="Vendor Name" required />
        <Input name="bankAccountNo" defaultValue={vendor.bankAccountNo} placeholder="Bank Account No" required />
        <Input name="bankName" defaultValue={vendor.bankName} placeholder="Bank Name" required />
        <Input name="addressLine1" defaultValue={vendor.addressLine1 || ""} placeholder="Address Line 1" />
        <Input name="addressLine2" defaultValue={vendor.addressLine2 || ""} placeholder="Address Line 2" />
        <Input name="city" defaultValue={vendor.city || ""} placeholder="City" />
        <Input name="country" defaultValue={vendor.country || ""} placeholder="Country" />
        <Input name="zipCode" defaultValue={vendor.zipCode || ""} placeholder="Zip Code" />

        <Button type="submit">Update</Button>
      </form>
    </main>
  );
}
