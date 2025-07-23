import { getVendors } from "@/app/_actions/vendor";
import { NextResponse } from "next/server";

export async function GET() {
  const vendors = await getVendors();
  return NextResponse.json(vendors);
} 