import { NextResponse } from "next/server";
import { RoverService } from "../../../../server/services/RoverService";

export async function POST(
    req: Request,
  ) {
  try {
    const {rover, plateauSize, initialPosition, command } = await req.json()

    const result = await RoverService.calculateFinalPosition(rover, plateauSize, initialPosition, command)

    return NextResponse.json({result}, { status: 200 })
  } catch (error) {
    console.log(error);
  }
}