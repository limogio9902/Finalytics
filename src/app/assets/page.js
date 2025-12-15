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
                <div className="card animate-enter delay-1" style={{ background: 'linear-gradient(135deg, var(--color-blue) 0%, #1899d6 100%)', color: 'white', border: 'none' }}>
                    <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Portfolio Value</span>
                    <p style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0' }}>€{totalAssetValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '8px', fontSize: '0.85rem' }}>+12.5% this month</span>
                </div>
                <div className="card animate-enter delay-2">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Allocation</span>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <div>
                            <div style={{ height: '12px', width: '100px', background: 'var(--color-blue)', borderRadius: '6px' }}></div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Stocks (65%)</span>
                        </div>
                        <div>
                            <div style={{ height: '12px', width: '60px', background: 'var(--color-purple)', borderRadius: '6px' }}></div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Crypto (35%)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="animate-enter delay-3">
                <AssetTable
                    assets={assets}
                    onAdd={addAsset}
                    onUpdate={updateAsset}
                    onDelete={deleteAsset}
                />
            </div>
        </div>
    );
}
