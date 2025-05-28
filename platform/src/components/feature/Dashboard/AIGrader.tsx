import React from 'react';

const AIGrader = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Grader</h3>
                    <p className="text-sm text-gray-500">Automated assessment tool</p>
                </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
                Our AI Grader automatically evaluates assignments, tests, and submissions with consistent,
                objective scoring. It provides detailed feedback and suggestions for improvement.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                    <strong>Features:</strong> Automated scoring, detailed feedback, rubric-based evaluation
                </p>
            </div>
        </div>
    );
};

export default AIGrader;