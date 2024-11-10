"use client";
import { initializeCometChat } from "@/components/Auth/cometChatConfig";
import { useEffect } from "react";

export default function ChatLayout() {
	useEffect(() => {
		initializeCometChat();
	}, []);
	return <></>;
}
