"use client"
import { Search, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Spinner from '@/components/ui/Spinner'
import { HistoryItem } from '@/types/history'

const History = () => {
    const [historyData, setHistoryData] = useState<HistoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
    const [filterType, setFilterType] = useState<'all' | 'chat' | 'grader'>('all')

    const truncateText = (text: string, maxLength: number = 100) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
    }

    const fetchHistory = (type: string) => {
        setLoading(true)
        const query = type === 'all' ? '' : `?type=${type}`
        fetch(`/api/history${query}`)
            .then(res => res.json())
            .then(data => {
                const processedData = data.map((item: HistoryItem) => ({
                    ...item,
                    fullPrompt: item.prompt,
                    fullResponse: item.response,
                    prompt: truncateText(item.prompt),
                    response: truncateText(item.response)
                }))
                setHistoryData(processedData)
                setLoading(false)
            })
            .catch(() => {
                alert('Failed to load history. Please try again later.')
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchHistory(filterType)
    }, [filterType])

    const toggleRow = (index: number) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev)
            if (newSet.has(index)) {
                newSet.delete(index)
            } else {
                newSet.add(index)
            }
            return newSet
        })
    }

    const handleDeleteHistory = async (id: string) => {
        try {
            const response = await fetch('/api/history', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })

            if (!response.ok) {
                throw new Error('Failed to delete history')
            }

            setHistoryData(prev => prev.filter(item => item._id !== id))
        } catch (error) {
            alert('Failed to delete history. Please try again later.')
        }
    }

    const handleFilterHistory = (type: 'all' | 'chat' | 'grader') => {
        setFilterType(type)
    }

    return (
        <div className="min-h-screen w-full flex flex-col">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-6 py-6 rounded-none">
                <div className="relative w-full md:w-1/2">
                    <input
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white/95 text-purple-900 placeholder:text-purple-400 shadow-sm transition-all"
                        placeholder="Search history..."
                        type="text"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" size={20} />
                </div>
                <div className="flex items-center md:ml-4">
                    <label className="text-white text-base font-semibold mr-2" htmlFor="historyType">
                        History Type
                    </label>
                    <select
                        id="historyType"
                        value={filterType}
                        onChange={(e) => handleFilterHistory(e.target.value as 'all' | 'chat' | 'grader')}
                        className="px-4 py-2 rounded-md border border-white/30 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-white text-purple-900"
                    >
                        <option value="all">All</option>
                        <option value="chat">💬 Chat</option>
                        <option value="grader">📝 Grader</option>
                    </select>
                </div>
            </div>

            <div className="relative overflow-x-auto mt-8 flex-1 px-6 pb-8">
                <table className="w-full text-sm text-left text-purple-900 bg-white rounded-lg shadow-lg overflow-hidden">
                    <thead className="text-xs uppercase bg-purple-100 text-purple-700">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Date</th>
                            <th className="px-6 py-3 font-semibold">Type</th>
                            <th className="px-6 py-3 font-semibold">Query</th>
                            <th className="px-6 py-3 font-semibold">Response</th>
                            <th className="px-6 py-3 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center">
                                    <Spinner />
                                </td>
                            </tr>
                        ) : historyData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center">No history found.</td>
                            </tr>
                        ) : (
                            historyData.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className={idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.type === 'chat' ? '💬 Chat' : item.type === 'grader' ? '📝 Grader' : item.type}
                                    </td>
                                    <td
                                        className="px-6 py-4 cursor-pointer hover:underline"
                                        onClick={() => toggleRow(idx)}
                                    >
                                        {expandedRows.has(idx) ? item.fullPrompt : item.prompt}
                                    </td>
                                    <td
                                        className="px-6 py-4 cursor-pointer hover:underline"
                                        onClick={() => toggleRow(idx)}
                                    >
                                        {expandedRows.has(idx) ? item.fullResponse : item.response}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDeleteHistory(item._id)}
                                            className="cursor-pointer text-red-600 hover:text-red-800 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default History
