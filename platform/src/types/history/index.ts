export interface HistoryItem {
    _id: string
    createdAt: string
    type: string
    prompt: string
    response: string
    email?: string
    fullPrompt?: string
    fullResponse?: string
}