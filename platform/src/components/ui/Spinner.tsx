import React from 'react';

const Spinner = () => (
    <div
        style={{
            display: 'inline-block',
            width: 24, // smaller size
            height: 24,
            fontSize: '0.875rem', // text-sm (14px)
        }}
    >
        <svg
            width="24"
            height="24"
            viewBox="0 0 40 40"
            style={{ display: 'block' }}
        >
            <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#fff" 
                strokeWidth="4"
                fill="none"
                strokeDasharray="80"
                strokeDashoffset="60"
                strokeLinecap="round"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    </div>
);

export default Spinner;