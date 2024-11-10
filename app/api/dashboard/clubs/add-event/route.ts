import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Event from "@/lib/models/Event";
import Club from "@/lib/models/Club";
import User from "@/lib/models/User";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: Request) => {
	try {
		await connectToDB();
		const { sessionClaims, userId } = await auth();
		if (!sessionClaims) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		if (
			sessionClaims.metadata.role !== "president" &&
			sessionClaims.metadata.role !== "vicepresident" &&
			sessionClaims.metadata.role !== "generalsecretary" &&
			sessionClaims.metadata.role !== "treasurer" &&
			sessionClaims.metadata.role !== "instructor" &&
			sessionClaims.metadata.role !== "oca"
		) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const user = await User.findOne({ clerkID: userId });

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		const clubID = user.clubID;

		if (!clubID) {
			return NextResponse.json(
				{ message: "User is not a member of any club" },
				{ status: 404 }
			);
		}

		const club = await Club.findOne({ _id: clubID });

		if (!club) {
			return NextResponse.json(
				{ message: "Club not found" },
				{ status: 404 }
			);
		}

		const { event } = await req.json();
		if (!event) {
			return NextResponse.json(
				{ message: "Event not found" },
				{ status: 404 }
			);
		}

		if (!event.rooms.length) {
			return NextResponse.json(
				{ message: "Please add a room" },
				{ status: 400 }
			);
		}

		const newEvent = new Event({
			...event,
			club: club._id,
		});

		await newEvent.save();
		return NextResponse.json({ message: "Event added successfully" });
	} catch (err) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
};

export const GET = async (req: Request) => {
	try {
		await connectToDB();
		const { sessionClaims, userId } = await auth();
		if (!sessionClaims) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		if (
			sessionClaims.metadata.role !== "president" &&
			sessionClaims.metadata.role !== "vicepresident" &&
			sessionClaims.metadata.role !== "generalsecretary" &&
			sessionClaims.metadata.role !== "treasurer" &&
			sessionClaims.metadata.role !== "instructor" &&
			sessionClaims.metadata.role !== "oca"
		) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const user = await User.findOne({ clerkID: userId });

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		const clubID = user.clubID;

		if (!clubID) {
			return NextResponse.json(
				{ message: "User is not a member of any club" },
				{ status: 404 }
			);
		}

		const club = await Club.findOne({ _id: clubID });

		if (!club) {
			return NextResponse.json(
				{ message: "Club not found" },
				{ status: 404 }
			);
		}

		const events = await Event.find({ club: club._id }).sort({
			endDate: 1,
		});

        console.log(events);

		return NextResponse.json({ events });
	} catch (err) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
};

export const PUT = async (req: Request) => {
	try {
		await connectToDB();
		const { sessionClaims } = await auth();
		if (!sessionClaims) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		if (
			sessionClaims.metadata.role !== "president" &&
			sessionClaims.metadata.role !== "vicepresident" &&
			sessionClaims.metadata.role !== "generalsecretary" &&
			sessionClaims.metadata.role !== "treasurer" &&
			sessionClaims.metadata.role !== "oca" &&
			sessionClaims.metadata.role !== "instructor"
		) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const { budget, eventId } = await req.json();

		if (!budget || !eventId) {
			return NextResponse.json(
				{ message: "Budget not found" },
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

		const updatedBudget = event.budget.map((b: any) => {
			if (b._id.toString() === budget._id) {
				return {
					...b,
					...budget,
				};
			}
			return b;
		});

		event.budget = updatedBudget;

		await event.save();

		return NextResponse.json({
			message: "Budget updated successfully",
			event,
		});
	} catch (err) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
};
