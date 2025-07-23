import { addVendor } from "@/app/_actions/vendor";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import Link from "next/link";
import Header from "@/app/ui/Header";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

export default async function AddVendorPage() {
  const session = await auth();

  if (!session) return notFound();
  const userName = session.user.name || "User";
  const userImage = session.user.image || "https://ui-avatars.com/api/?name=User";

  async function handleAddVendor(formData: FormData) {

    "use server";
    await addVendor({
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
        <h2 className="text-2xl font-bold text-gray-800">Add Vendor</h2>
        <Link href="/">
          <Button>Back</Button>
        </Link>
      </div>
      <form
        action={handleAddVendor}
        className="flex flex-col gap-3"
      >
        <Input name="vendorName" placeholder="Vendor Name" required />
        <Input name="bankAccountNo" placeholder="Bank Account No" required />
        <Input name="bankName" placeholder="Bank Name" required />
        <Input name="addressLine1" placeholder="Address Line 1" />
        <Input name="addressLine2" placeholder="Address Line 2" />
        <Input name="city" placeholder="City" />
        <Input name="country" placeholder="Country" />
        <Input name="zipCode" placeholder="Zip Code" />
        <Button type="submit">Add</Button>
      </form>
    </main>
  );
} 