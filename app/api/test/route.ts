
// app/api/test/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";

export async function GET() {
  await connectToDatabase();
  return NextResponse.json({ message: "DB Connected" });
}
