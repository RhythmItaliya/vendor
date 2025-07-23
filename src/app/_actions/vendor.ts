"use server"

import db from "@/lib/db"
import { auth } from "@/auth"
import type { Vendor } from "@/types/vendor"

export async function addVendor(data: Omit<Vendor, "id" | "userId" | "createdAt" | "updatedAt">) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Not authenticated")

  const user = await db.user.findUnique({ where: {
     email: session.user.email }
     })
  if (!user) throw new Error("User not found")

  return db.vendor.create({
    data: {
      ...data,
      userId: user.id,
    },
  })
}



export async function getVendors(page = 1, pageSize = 5) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Not authenticated")

  const user = await db.user.findUnique({ where: { 
    email: session.user.email } 
  })
  if (!user) throw new Error("User not found")

  const [vendors, total] = await Promise.all([
    db.vendor.findMany({
      where: { userId: user.id },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    db.vendor.count({ where: { userId: user.id } }),
  ])

  return { vendors, total }
}



export async function getVendorById(id: string) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Not authenticated")

  const user = await db.user.findUnique({ where: 
    { email: session.user.email }
   })
  if (!user) throw new Error("User not found")

  const vendor = await db.vendor.findUnique({ where: { id } })
  if (!vendor || vendor.userId !== user.id) return null

  return vendor
}



export async function updateVendor(
  id: string,
  data: Partial<Omit<Vendor, "id" | "userId" | "createdAt" | "updatedAt">>
) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Not authenticated")

  const user = await db.user.findUnique({ where: 
    { email: session.user.email }
   })

  if (!user) throw new Error("User not found")

  const vendor = await db.vendor.findUnique({ where: { id } })
  if (!vendor || vendor.userId !== user.id) throw new Error("Vendor not found or unauthorized")

  return db.vendor.update({
    where: {
       id
       },
    data,
  })
}


export async function deleteVendor(id: string) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Not authenticated")

  const user = await db.user.findUnique({ where: { 
    email: session.user.email 
  }
 })
  if (!user) throw new Error("User not found")

  const vendor = await db.vendor.findUnique({
     where: { id } 
    })
  if (!vendor || vendor.userId !== user.id) throw new Error("Vendor not found or unauthorized")

  return db.vendor.delete({ where: { id } })
}
