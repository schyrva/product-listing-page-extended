"use client";

import dynamic from "next/dynamic";

// Dynamically import the ChatWidget on the client side only
const ChatWidget = dynamic(() => import("./ChatWidget"), {
  ssr: false,
});

export default function ChatWidgetWrapper() {
  return <ChatWidget />;
}
