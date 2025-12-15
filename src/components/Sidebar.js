import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    const menuItems = [
        { name: 'Dashboard', href: '/', icon: '📊' },
        { name: 'Budget', href: '/budget', icon: '💰' },
        { name: 'Assets', href: '/assets', icon: '📈' },
        { name: 'Analytics', href: '/analytics', icon: '🧠' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <h1 className="gradient-text" style={{ fontSize: '1.5rem', margin: 0 }}>Finalytics</h1>
            </div>

            <nav>
                <ul className={styles.nav}>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href} className={styles.link}>
                                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                                <span style={{ fontWeight: 500 }}>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.footer}>
                <p>v0.1.0 Beta</p>
            </div>
        </aside>
    );
}
