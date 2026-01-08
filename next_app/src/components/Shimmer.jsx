'use client';
import React from 'react';

const ShimmerCard = ({ height = '350px', width = '100%', borderRadius = '12px' }) => {
    return (
        <div
            className="shimmer"
            style={{
                height,
                width,
                borderRadius,
                display: 'block',
                marginBottom: '1rem'
            }}
        />
    );
};

export default ShimmerCard;
