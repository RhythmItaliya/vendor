"use server"

import db from "@/lib/db"
import { auth } from "@/auth"
import type { Vendor } from "@/types/vendor"

export async function addVendor(data: Omit<Vendor, "id" | "userId" | "createdAt" | "updatedAt">) {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error("Not authenticated")
  }
  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) throw new Error("User not found")

  const res = await db.vendor.create({
    data: {
      ...data,
      userId: user.id,
    },
  })

  return res
}

export async function getVendors() {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error("Not authenticated")
  }
  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) throw new Error("User not found")
  const res = await db.vendor.findMany({
    where: { userId: user.id },
  })

  return res
}

export async function updateVendor(
  id: string,
  data: Partial<Omit<Vendor, "id" | "userId" | "createdAt" | "updatedAt">>
) {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error("Not authenticated")
  }
  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) throw new Error("User not found")

  const vendor = await db.vendor.findUnique({
    where: { id },
  })
  if (!vendor || vendor.userId !== user.id) {
    throw new Error("Vendor not found or unauthorized")
  }
  const res = await db.vendor.update({
    where: { id },
    data,
  })

  return res
}

export async function deleteVendor(id: string) {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error("Not authenticated")
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) throw new Error("User not found")

  const vendor = await db.vendor.findUnique({
    where: { id },
  })
  if (!vendor || vendor.userId !== user.id) {
    throw new Error("Vendor not found or unauthorized")
  }

  const res = await db.vendor.delete({
    where: { id },
  })

  return res
}
