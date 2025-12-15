import AssetTable from '@/components/AssetTable';

export default function AssetsPage() {
    const assets = [
        { id: 1, name: 'S&P 500 ETF', symbol: 'SP500', price: 450.20, quantity: 25, avgBuyPrice: 380.00, type: 'Stock' },
        { id: 2, name: 'Bitcoin', symbol: 'BTC', price: 42500, quantity: 0.15, avgBuyPrice: 30000, type: 'Crypto' },
        { id: 3, name: 'Ethereum', symbol: 'ETH', price: 2250, quantity: 1.5, avgBuyPrice: 1800, type: 'Crypto' },
        { id: 4, name: 'LVMH', symbol: 'MC.PA', price: 720.50, quantity: 8, avgBuyPrice: 650.00, type: 'Stock' },
    ];

    return (
        <div className="container" style={{ maxWidth: '1000px', marginLeft: 0 }}>
            {/* Header */}
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Assets & Investments</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Real-time market tracking.
                        <span style={{ marginLeft: '1rem', color: 'var(--success)', fontSize: '0.8rem', border: '1px solid var(--success)', padding: '2px 8px', borderRadius: '4px' }}>
                            ● Market Open
                        </span>
                    </p>
                </div>
                <button style={{
                    background: 'var(--accent-primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 600
                }}>
                    + Add Asset
                </button>
            </header>

            {/* Portfolio Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Portfolio Value</span>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€26,358</p>
                    <span style={{ color: 'var(--success)' }}>+€4,500 (+20.5%) All time</span>
                </div>
                <div className="card">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Allocation</span>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <div>
                            <div style={{ height: '8px', width: '100px', background: '#3b82f6', borderRadius: '4px' }}></div>
                            <span style={{ fontSize: '0.8rem' }}>Stocks (65%)</span>
                        </div>
                        <div>
                            <div style={{ height: '8px', width: '60px', background: '#8b5cf6', borderRadius: '4px' }}></div>
                            <span style={{ fontSize: '0.8rem' }}>Crypto (35%)</span>
                        </div>
                    </div>
                </div>
            </div>

            <AssetTable assets={assets} />
        </div>
    );
}
