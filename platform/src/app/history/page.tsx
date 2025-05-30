import { Search } from 'lucide-react'
import React from 'react'

const historyData = [
    {
        date: '2024-06-10',
        type: '💬 Chat',
        query: 'How to improve productivity?',
        response: 'Try using the Pomodoro technique.',
    },
    {
        date: '2024-06-09',
        type: '📝 Grader',
        query: 'Grade essay on climate change',
        response: 'Score: 8/10. Good arguments, needs more data.',
    },
    {
        date: '2024-06-08',
        type: '💬 Chat',
        query: 'Explain TypeScript generics',
        response: 'Generics allow you to write flexible, reusable functions.',
    },
]

const History = () => {
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
                className="px-4 py-2 rounded-md border border-white/30 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-white text-purple-900"
                >
                <option value="all" className="text-purple-900">All</option>
                <option value="chat">💬 Chat</option>
                <option value="grader">📝 Grader</option>
                </select>
            </div>
            </div>
            <div className="relative overflow-x-auto mt-8 flex-1 px-6 pb-8">
            <table className="w-full text-sm text-left text-purple-900 bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="text-xs uppercase bg-purple-100 text-purple-700">
                <tr>
                    <th scope="col" className="px-6 py-3 font-semibold">
                    Date
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">
                    Type
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">
                    Query
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">
                    Response
                    </th>
                </tr>
                </thead>
                <tbody>
                {historyData.map((item, idx) => (
                    <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'}
                    >
                                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                                <td className="px-6 py-4">{item.type}</td>
                                <td className="px-6 py-4">{item.query}</td>
                                <td className="px-6 py-4">{item.response}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default History
