import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const task = await db.task.findUnique({
      where: {
        id: params.taskId,
      },
    });

    if (!task) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedTask = await db.task.delete({
      where: {
        id: params.taskId,
      },
    });

    return NextResponse.json(deletedTask);
  } catch (error) {
    console.log("[TASK_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    const values = await req.json();

    console.log(">>> ", values);

    const task = await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("[TASK_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
