import { NextResponse } from "next/server";
import { RoverService } from "../../../../server/services/RoverService";

export async function POST(
    req: Request,
  ) {
  try {
    const { plateauSize } = await req.json()

    const result = await RoverService.getAll(plateauSize)

    return NextResponse.json({result}, { status: 200 })
  } catch (error) {
    console.log(error);
  }
}