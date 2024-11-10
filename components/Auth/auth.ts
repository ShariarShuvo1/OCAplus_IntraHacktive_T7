import { CometChat } from "@cometchat-pro/chat";

export const loginUser = async (uid: string) => {
	try {
		const user = await CometChat.login(
			uid,
			"15f93f0e0cec672112b49ceb06688107f81a6a70"
		);
		console.log("Login successful:", user);
		return user;
	} catch (error) {
		console.error("Login failed", error);
	}
};
