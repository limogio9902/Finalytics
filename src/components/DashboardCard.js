import AnimatedNumber from './AnimatedNumber';

export default function DashboardCard({ title, value, prefix = '', trend, trendLabel }) {
    const isPositive = trend > 0;
    // Use new juicy vars
    const trendColor = isPositive ? 'var(--color-green)' : 'var(--color-red)';

    // Parse value if it comes as string (e.g. "€1,200") to raw number for animation
    // Ideally parent should pass raw number, but for compatibility we parse if needed
    const rawValue = typeof value === 'number' ? value : parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0;

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h2 style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                margin: 0,
                fontWeight: 800
            }}>
                {title}
            </h2>
            <p style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                margin: 0,
                color: 'var(--text-primary)',
                letterSpacing: '-1px'
            }}>
                {prefix}<AnimatedNumber value={rawValue} />
            </p>
            {trend && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
                    <span style={{ color: trendColor }}>
                        {isPositive ? '+' : ''}{trend}%
                    </span>
                    <span style={{ color: '#ccc' }}>{trendLabel || 'vs last month'}</span>
                </div>
            )}
        </div>
    );
}
