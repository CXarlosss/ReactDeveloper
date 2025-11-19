import { NextResponse } from "next/server";
import { getDay, updateDay, deleteDay } from "../../../../lib/utils";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const day = getDay(id);
  return NextResponse.json(day);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const patch = await req.json();
  updateDay(id, patch);
  return NextResponse.json({ updated: true });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  deleteDay(id);
  return NextResponse.json({ deleted: true });
}
