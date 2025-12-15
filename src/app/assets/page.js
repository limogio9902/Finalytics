"use client";
import AssetTable from '@/components/AssetTable';
import { useFinance } from '@/context/FinanceContext';

export default function AssetsPage() {
    const { assets, addAsset, updateAsset, deleteAsset, totalAssetValue, isLoaded } = useFinance();

    if (!isLoaded) return <div className="container">Loading...</div>;

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
            </header>

            {/* Portfolio Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Portfolio Value</span>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€{totalAssetValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <span style={{ color: 'var(--success)' }}>-- (Realized P&L TBD)</span>
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

            <AssetTable
                assets={assets}
                onAdd={addAsset}
                onUpdate={updateAsset}
                onDelete={deleteAsset}
            />
        </div>
    );
}
