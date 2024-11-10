// cometChatConfig.ts
import { CometChat } from "@cometchat-pro/chat";

const appID = "26682945cfe5d862";
const region = "in";

export const initializeCometChat = () => {
	return CometChat.init(
		appID,
		new CometChat.AppSettingsBuilder()
			.subscribePresenceForAllUsers()
			.setRegion(region)
			.build()
	)
		.then(() => {
			console.log("CometChat initialized successfully");
		})
		.catch((error: any) => {
			console.error("CometChat initialization failed", error);
		});
};
