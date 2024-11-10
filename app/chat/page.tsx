"use client";
import { useEffect } from "react";
import { CometChatMessages, CometChatUsers } from "@cometchat/chat-uikit-react";
import { loginUser } from "@/components/Auth/auth";
import { useUser } from "@clerk/nextjs";

const ChatPage = () => {
	const { user } = useUser();

	useEffect(() => {
		if (user?.id) {
			loginUser(user.id);
		}
	}, [user]);

	return (
		<div className="chat-container">
			<div className="user-list">
				<CometChatUsers />
			</div>
			<div className="messages">
				<CometChatMessages />
			</div>
		</div>
	);
};

export default ChatPage;
