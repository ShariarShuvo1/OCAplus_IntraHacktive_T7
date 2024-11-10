import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Event from "@/lib/models/Event";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: Request) => {
	try {
		await connectToDB();

		const { sessionClaims } = await auth();
		if (!sessionClaims) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		if (sessionClaims.metadata.role !== "instructor") {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const url = new URL(req.url);
		const eventId = url.pathname.split("/").pop();
		if (!eventId) {
			return NextResponse.json(
				{ message: "Event not found" },
				{ status: 404 }
			);
		}

		const event = await Event.findOne({ _id: eventId });
		if (!event) {
			return NextResponse.json(
				{ message: "Event not found" },
				{ status: 404 }
			);
		}

		event.instructorApproval = true;

		await event.save();

		return NextResponse.json({ event }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
};