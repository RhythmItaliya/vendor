import { getVendors } from "@/app/_actions/vendor";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);
  const { vendors, total } = await getVendors(page, pageSize);
  return NextResponse.json({ vendors, total });
} 