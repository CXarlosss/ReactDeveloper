import { NextResponse } from "next/server";
import { getAllDays, createDay } from "../../../lib/utils";
import { Day } from "@/types/Day";

export async function GET() {
  const all = getAllDays();
  return NextResponse.json(all ?? []); // <-- extra seguro
}

export async function POST(req: Request) {
  const body = await req.json();

  const newDay: Day = {
    id: crypto.randomUUID(),
    ...body,
  };

  createDay(newDay);

  return NextResponse.json(newDay, { status: 201 });
}
