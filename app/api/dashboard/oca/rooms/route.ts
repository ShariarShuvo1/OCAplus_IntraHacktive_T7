import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Room from "@/lib/models/Room";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: Request) => {
	try {
		await connectToDB();
		const rooms = await Room.find();
		return NextResponse.json({ rooms: rooms }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
};

export const POST = async (req: Request) => {
	try {
		await connectToDB();
		const { sessionClaims } = await auth();
		if (!sessionClaims) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		if (sessionClaims.metadata.role !== "oca") {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const { roomNumber } = await req.json();
		// check if room already exists
		const roomExists = await Room.findOne({ roomNumber });
		if (roomExists) {
			return NextResponse.json(
				{ message: "Room already exists" },
				{ status: 400 }
			);
		}

		const room = new Room({ roomNumber });
		await room.save();
		return NextResponse.json(
			{ message: "Room added", room: room },
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
};
