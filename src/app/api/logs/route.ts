import { NextResponse } from "next/server";
import { RoverService } from "../../../../server/services/RoverService";

export async function POST(
    req: Request,
  ) {
  try {
    const { plateauSize, userId } = await req.json()

    const result = await RoverService.getAll(plateauSize, userId)

    return NextResponse.json({result}, { status: 200 })
  } catch (error) {
    console.log(error);
  }
}