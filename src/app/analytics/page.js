export default function AnalyticsPage() {
    return (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Analytics & Projections</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Visualize your path to financial freedom.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>

                {/* Wealth Projection */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Net Worth Projection (10 Years)</h2>
                    <div style={{ height: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', padding: '1rem', gap: '5px' }}>
                        {/* Mock Chart Bars */}
                        {Array.from({ length: 20 }).map((_, i) => {
                            const height = 20 + (i * 4) + Math.random() * 5;
                            return (
                                <div key={i} style={{
                                    height: `${height}%`,
                                    flex: 1,
                                    background: 'linear-gradient(0deg, var(--accent-primary), transparent)',
                                    borderRadius: '2px 2px 0 0',
                                    opacity: 0.8
                                }}></div>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
                        <span>2024</span>
                        <span>2029</span>
                        <span>2034</span>
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div className="card">
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Top Expenses</h2>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #333' }}>
                            <span>Housing</span>
                            <span style={{ fontWeight: 600 }}>€1,200</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #333' }}>
                            <span>Food</span>
                            <span style={{ fontWeight: 600 }}>€550</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #333' }}>
                            <span>Transport</span>
                            <span style={{ fontWeight: 600 }}>€80</span>
                        </li>
                    </ul>
                </div>

                {/* Savings Rate Trend */}
                <div className="card">
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Savings Rate</h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px' }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(var(--success) 48%, #333 0)' }}>
                            <div style={{ position: 'absolute', inset: '10px', background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>48%</span>
                            </div>
                        </div>
                    </div>
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '0.5rem' }}>Target: 50%</p>
                </div>

            </div>
        </div>
    );
}
