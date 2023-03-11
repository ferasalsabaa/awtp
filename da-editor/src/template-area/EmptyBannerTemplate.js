import React from 'react';
import './EmptyBannerTemplate.css';

export const EmptyBannerTemplate = ({ template, bannerJSON}) => {
    const width = bannerJSON?.['banner-data']?.['generalInfo']?.['width'] || '60%';
    const height = bannerJSON?.['banner-data']?.['generalInfo']?.['height'] || '100px';
    const alignment = bannerJSON?.['banner-data']?.['generalInfo']?.['alignment'] || 'center';

    const alignmentStyles = alignment === 'center' ? {
        left: "50%",
        transform: "translateX(-50%)",
    } : alignment === 'left' ? {
        left: "10%",
    } : alignment === 'right' ? {
        right: "10%",
    } : {};

    if (template === 0) {
        return (
            <div className={`banner-standard`} style={{width, height, ...alignmentStyles}}></div>
        );
    }
    if (template === 1) {
        return (
            <>
                <div className={`banner-L-left`} style={{width, bottom: height}}></div>
                <div className={`banner-L-bottom`} style={{height}}></div>
            </>
        );
    }
    return null;
}