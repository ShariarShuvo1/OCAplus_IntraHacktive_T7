import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { CometChat } from "@cometchat-pro/chat";

export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	const headerPayload = await headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	const payload = await req.json();
	const data = payload.data;
	const body = JSON.stringify(payload);

	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", {
			status: 400,
		});
	}

	const eventType = evt.type;
	if (eventType === "user.created") {
		const clerkID = data.id;
		const email = data.email_addresses[0].email_address;
		const firstName = data.first_name;
		const lastName = data.last_name;
		connectToDB();
		const user = await User.findOne({ email });

		if (!user) {
			await User.create({
				clerkID,
				email,
				firstName,
				lastName,
				role: "oca",
			});
		} else {
			await user.updateOne({
				clerkID,
				firstName,
				lastName,
			});
		}

		const appSettings = new CometChat.AppSettingsBuilder()
			.setRegion(process.env.COMETCHAT_REGION)
			.build();

		try {
			await CometChat.init(process.env.COMETCHAT_APP_ID, appSettings);

			const chatUser = new CometChat.User(clerkID);
			chatUser.setName(`${firstName} ${lastName}`);

			await CometChat.createUser(
				chatUser,
				process.env.COMETCHAT_API_KEY as string
			);
		} catch (error) {
			console.error("Error creating user:", error);
		}
	}

	return new Response("", { status: 200 });
}
