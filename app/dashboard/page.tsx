import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
export default async function Home() {
	const { sessionClaims } = await auth();
	if (sessionClaims?.metadata.role === "oca") {
		redirect("/dashboard/oca");
	} else {
		redirect("/dashboard/clubs");
	}
}
