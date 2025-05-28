import useModalStore from "@/store/modal";
import React from "react";

const Modal = () => {

    const { state, onClose } = useModalStore();

    if (!state) return null; 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-center border-b px-4 py-2">
                    <h2 className="text-lg font-semibold">{state}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold focus:outline-none"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                {/* Only 2 states available so if not AI Chatbot, it must be AI Grader */}
                <div className="p-4">{state === "AI Chatbot" ? "AI CHATBOT" : "AI GRADER"}</div>
            </div>
        </div>
    );
};

export default Modal;