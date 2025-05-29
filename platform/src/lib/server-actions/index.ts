"use server"

import { Chat } from "@/types/chat"
import { Preferences } from "@/types/preferences"
import { client, dbName } from "../mongo-client"
import { auth } from "../auth"
import { headers } from "next/headers"

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

export const handleGeneratePreferences = async () => {
    // generate with ai mircoservice

    try {
        return []
    } catch (error) {
        throw new Error("Failed to generate preferences")
    }
}

export const handleAuthflow = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const email = session?.user?.email

    const preferences: Preferences[] = await handleGeneratePreferences()

    try {
        await auth.api.signInSocial({
            body: {
                provider: "google"
            }
        })

        await client.connect()
        const db = client.db(dbName)

        const collection = db.collection("account")
        const user = await collection.findOne({
            email
        })
        
        if (!user?.preferences) {
        await collection.updateOne(
            { email },
            { $set: { preferences } },
            { upsert: true }
        )
        }
    } catch (error) {  
        throw new Error("Authentication failed")
    } finally { 
        await client.close()
    }   

}