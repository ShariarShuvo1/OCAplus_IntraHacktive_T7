import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import User from "@/lib/models/User";
import Club from "@/lib/models/Club";

export const POST = async (req: Request) => {
	try {
		await connectToDB();
		const { clubName, presidentEmail } = await req.json();
		if (!clubName || !presidentEmail) {
			return NextResponse.json(
				{ message: "Invalid club name or president email" },
				{ status: 400 }
			);
		}

		const clubExist = await Club.findOne({ clubName });
		if (clubExist) {
			return NextResponse.json(
				{ message: "Club already exists" },
				{ status: 400 }
			);
		}
		const club = await Club.create({ clubName });
		const president = await User.findOne({ email: presidentEmail });
		if (president) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 404 }
			);
		}

		const response = await fetch("https://api.clerk.com/v1/invitations", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email_address: presidentEmail,
				public_metadata: { role: "president" },
				expires_in_days: 30,
				ignore_existing: true,
			}),
		});

		if (!response.ok) {
			return NextResponse.json(
				{ message: "Failed to send invitation" },
				{ status: response.status }
			);
		}

		await User.create({
			email: presidentEmail,
			role: "president",
			clubID: club._id,
		});
		return NextResponse.json(
			{ message: "Club added successfully and sent an invitation" },
			{ status: 201 }
		);
	} catch (err) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
};
