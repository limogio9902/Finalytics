export default function BudgetTable({ title, items, type = 'expense' }) {
    const total = items.reduce((acc, item) => acc + item.amount, 0);
    const isIncome = type === 'income';

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>{title}</h3>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: isIncome ? 'var(--success)' : 'white' }}>
                    {isIncome ? '+' : '-'}€{total.toLocaleString()}
                </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <th style={{ paddingBottom: '1rem' }}>Name</th>
                        <th style={{ paddingBottom: '1rem' }}>Category</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right' }}>Amount</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} style={{ borderTop: '1px solid #333' }}>
                            <td style={{ padding: '1rem 0' }}>{item.name}</td>
                            <td style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>{item.category}</td>
                            <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 500 }}>
                                €{item.amount.toLocaleString()}
                            </td>
                            <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                <button style={{ background: 'none', border: 'none', color: '#666' }}>✏️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button style={{
                width: '100%',
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px dashed #444',
                borderRadius: '8px',
                color: 'var(--text-secondary)'
            }}>
                + Add {type === 'income' ? 'Income' : 'Expense'}
            </button>
        </div>
    );
}
