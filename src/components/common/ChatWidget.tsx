"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, you would send the message to a backend service
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-card rounded-xl shadow-2xl w-[350px] mb-4 overflow-hidden border"
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Chat with Us</h3>
              <button onClick={toggleChat}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 h-[300px] overflow-y-auto bg-secondary/20">
              <div className="mb-4">
                <div className="bg-primary/10 rounded-lg p-3 max-w-[80%] ml-auto mb-2">
                  <p className="text-sm">How can I help you today?</p>
                </div>
                <div className="bg-primary text-white rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">
                    Hi there! Have any questions about our products?
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon" disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChat}
        className={`rounded-full p-4 ${
          isOpen ? "bg-red-500" : "bg-primary"
        } text-white shadow-lg flex items-center justify-center`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={
          !isOpen
            ? {
                y: [0, -10, 0],
              }
            : {}
        }
        transition={
          !isOpen
            ? {
                repeat: Infinity,
                repeatType: "loop",
                duration: 2,
                repeatDelay: 5,
              }
            : {}
        }
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}
