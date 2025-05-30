import { Search } from 'lucide-react'
import React from 'react'

const History = () => {
    return (
        <div className="mt-5">
            <div className="flex justify-between items-center mb-12 px-4 py-2">
                <div className="relative w-1/2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search history..."
                        type="text"
                    />
                </div>
                <div className="flex items-center ml-4">
                    <p className="text-gray-500 text-lg font-bold mr-2">History Type</p>
                    <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-150 text-gray-700">
                        <option value="chat">💬 Chat</option>
                        <option value="grader">📝 Grader</option>
                    </select>
                </div>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Query
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Response
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-gray-200">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Laptop</td>
                            <td className="px-6 py-4">$2999</td>
                        </tr>
                        <tr className="bg-white border-b border-gray-200">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">White</td>
                            <td className="px-6 py-4">Laptop PC</td>
                            <td className="px-6 py-4">$1999</td>
                        </tr>
                        <tr className="bg-white">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">Black</td>
                            <td className="px-6 py-4">Accessories</td>
                            <td className="px-6 py-4">$99</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default History
