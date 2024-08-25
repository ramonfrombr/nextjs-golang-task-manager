import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, description, status, priority, dueDate } = await req.json();

    const task = await db.task.create({
      data: { name, description, status, priority, dueDate },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("[TASKS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
