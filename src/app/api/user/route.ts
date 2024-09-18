import { NextResponse } from "next/server";
import { UserService } from "../../../../server/services/UserService";

export async function POST(
    req: Request,
  ) {
  try {
    const { username } = await req.json()
    
    const newUser = await UserService.create(username)

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (error) {
    console.log(error);
  }
}