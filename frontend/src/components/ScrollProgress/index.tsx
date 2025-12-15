import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${scrollProgress}%`,
            height: '4px',
            background: 'linear-gradient(90deg, #00f2ea, #ff0050)',
            zIndex: 10000,
            transition: 'width 0.1s ease-out',
            boxShadow: '0 0 10px rgba(0, 242, 234, 0.7)'
        }} />
    );
};

export default ScrollProgress;
