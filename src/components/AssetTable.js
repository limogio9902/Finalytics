export default function AssetTable({ assets }) {
    const totalValue = assets.reduce((acc, asset) => acc + (asset.price * asset.quantity), 0);

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Portfolio Holdings</h3>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    €{totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <th style={{ paddingBottom: '1rem' }}>Asset</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right' }}>Price</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right' }}>Holdings</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right' }}>Total Value</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right' }}>P&L (All Time)</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => {
                        const currentValue = asset.price * asset.quantity;
                        const costBasis = asset.avgBuyPrice * asset.quantity;
                        const pnl = currentValue - costBasis;
                        const pnlPercent = (pnl / costBasis) * 100;
                        const isPositive = pnl >= 0;

                        return (
                            <tr key={asset.id} style={{ borderTop: '1px solid #333' }}>
                                <td style={{ padding: '1rem 0' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: 600 }}>{asset.symbol}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{asset.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                    €{asset.price.toLocaleString()}
                                </td>
                                <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <span>{asset.quantity} {asset.symbol}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600 }}>
                                    €{currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </td>
                                <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <span style={{ color: isPositive ? 'var(--success)' : 'var(--danger)', fontWeight: 500 }}>
                                            {isPositive ? '+' : ''}€{pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: isPositive ? 'var(--success)' : 'var(--danger)', opacity: 0.8 }}>
                                            {isPositive ? '+' : ''}{pnlPercent.toFixed(2)}%
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
