import useModalStore from "@/store/modal";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import AIChatbot from "./AIChatbot";
import AIGrader from "./AIGrader";

const Modal = () => {
    const { state, onClose } = useModalStore();

    // Close modal on Escape key press
    useEffect(() => {
        interface EscapeEvent extends KeyboardEvent {
            key: string;
        }

        const handleEscape = (e: EscapeEvent) => {
            if (e.key === "Escape" && state) {
            onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [state, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (state) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [state]);

    if (!state) return null;

    // Close modal when clicking backdrop
    interface BackdropClickEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {}

    const handleBackdropClick = (e: BackdropClickEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const renderContent = () => {
        switch (state) {
            case "AI Chatbot":
                return (
                    <AIChatbot />
            );
            case "AI Grader":
                return (
                   <AIGrader />
            );
            default:
                // Fallback content if state doesn't match any case
                console.error(`No content defined for modal state: ${state}`);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center backdrop-blur-sm transition-opacity duration-200"
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-white rounded-xl shadow-2xl w-full mx-4 transform transition-all duration-200 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-purple-900">Mentora</h2>
                    <button
                        onClick={onClose}
                        className="flex p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 py-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Modal;