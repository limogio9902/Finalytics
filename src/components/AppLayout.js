"use client";
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="layout-wrapper" style={{ display: 'flex' }}>
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

            <main
                className="main-content"
                style={{
                    flex: 1,
                    marginLeft: isCollapsed ? '90px' : '280px',
                    width: `calc(100% - ${isCollapsed ? '90px' : '280px'})`,
                    padding: '2rem',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                {children}
            </main>
        </div>
    );
}
