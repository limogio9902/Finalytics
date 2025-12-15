"use client";
import { useEffect, useState, useRef } from 'react';

const easeOutExpo = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export default function AnimatedNumber({ value, format = (v) => v.toLocaleString() }) {
    const [displayValue, setDisplayValue] = useState(value);
    const startTime = useRef(null);
    const startValue = useRef(value);
    const endValue = useRef(value);
    const animationFrame = useRef(null);
    const duration = 1000; // ms

    useEffect(() => {
        if (value === endValue.current) return;

        startValue.current = displayValue;
        endValue.current = value;
        startTime.current = null;

        const animate = (timestamp) => {
            if (!startTime.current) startTime.current = timestamp;
            const progress = timestamp - startTime.current;
            const t = Math.min(progress / duration, 1);
            const ease = easeOutExpo(t);

            const current = startValue.current + (endValue.current - startValue.current) * ease;

            setDisplayValue(current);

            if (t < 1) {
                animationFrame.current = requestAnimationFrame(animate);
            } else {
                setDisplayValue(endValue.current);
            }
        };

        animationFrame.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, [value]);

    return <span suppressHydrationWarning>{format(Math.round(displayValue))}</span>;
}
