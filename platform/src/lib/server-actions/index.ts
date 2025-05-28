"use server"

import { Chat } from "@/types/chat"
import { Preferences } from "@/types/preferences"
import { client, dbName } from "../mongo-client"

export const handleStoreChatHistory = async (chatHistory: Chat) => {
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection("chat")
        await collection.insertOne(chatHistory)
    } finally {
        await client.close()
    }
}

export const handleStoreFeedbackHistory = async (feedbackHistory: string) => {
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection("feedback")
        await collection.insertOne({ feedback: feedbackHistory })
    } finally {
        await client.close()
    }
}

export const handleStorePreferences = async (preferences: Preferences[], email: string) => {
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection("account")
        await collection.updateOne(
            { email },
            { $set: { preferences } },
            { upsert: true }
        )
    } finally {
        await client.close()
    }
}
