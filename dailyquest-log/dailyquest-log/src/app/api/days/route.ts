import { NextResponse } from "next/server";
import { getAllDays, createDay } from "../../../lib/utils";
import { Day } from "@/types/Day";

export async function GET() {
  return NextResponse.json(getAllDays());
}

export async function POST(req: Request) {
  const body = await req.json();

  const newDay: Day = {
    id: Date.now(),
    images: [],
    ...body
  };

  createDay(newDay);

  return NextResponse.json(newDay, { status: 201 });
}
