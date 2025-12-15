export default function DashboardCard({ title, value, trend, trendLabel }) {
    const isPositive = trend > 0;
    const trendColor = isPositive ? 'var(--success)' : 'var(--danger)';

    return (
        <div className="card">
            <h2 style={{
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '0.5rem',
                fontWeight: 600
            }}>
                {title}
            </h2>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
                {value}
            </p>
            {trend && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: trendColor, fontWeight: 500 }}>
                        {isPositive ? '+' : ''}{trend}%
                    </span>
                    <span style={{ color: '#666' }}>{trendLabel || 'vs last month'}</span>
                </div>
            )}
        </div>
    );
}
