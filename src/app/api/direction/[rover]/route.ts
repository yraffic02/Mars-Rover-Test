import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { RoverService } from "../../../../../server/services/RoverService";

export async function GET(
  req: NextRequest,
  { params }: { params: { rover: string } }
) {
  try {
    const searchParams = req.nextUrl.searchParams
    const plateauSize = searchParams.get('plateauSize') ?? ''
    const rover = params.rover;

    const result = await RoverService.getByRoverDirections(`Rover ${rover}`, plateauSize)

    return NextResponse.json({result}, { status: 200 })
  } catch (error) {
    console.log(error);
  }
}