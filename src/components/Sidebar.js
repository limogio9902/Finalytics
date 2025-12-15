"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar({ isCollapsed, toggleSidebar }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', href: '/', icon: '🏠' },
        { name: 'Budget', href: '/budget', icon: '💰' },
        { name: 'Assets', href: '/assets', icon: '💎' },
        { name: 'Analytics', href: '/analytics', icon: '📊' },
    ];

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.header}>
                <div className={styles.logoTitle}>
                    <h1 className="gradient-text" style={{ fontSize: '1.8rem', margin: 0, letterSpacing: '-1px' }}>Finalytics</h1>
                </div>
                <button className={styles.toggleBtn} onClick={toggleSidebar} title={isCollapsed ? "Expand" : "Collapse"}>
                    {isCollapsed ? '➡' : '⬅'}
                </button>
            </div>

            <nav>
                <ul className={styles.nav}>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={styles.link}
                                    data-active={isActive}
                                >
                                    <span className={styles.linkIcon}>{item.icon}</span>
                                    {!isCollapsed && <span className={styles.linkText}>{item.name}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className={styles.footer}>
                <p>v0.3.0</p>
            </div>
        </aside>
    );
}
