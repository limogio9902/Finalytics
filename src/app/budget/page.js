import BudgetTable from '@/components/BudgetTable';

export default function BudgetPage() {
    const incomes = [
        { id: 1, name: 'Salary', category: 'Job', amount: 3200 },
        { id: 2, name: 'Freelance', category: 'Side Hustle', amount: 450 },
    ];

    const fixedExpenses = [
        { id: 1, name: 'Rent', category: 'Housing', amount: 1200 },
        { id: 2, name: 'Internet', category: 'Utilities', amount: 45 },
        { id: 3, name: 'Spotify', category: 'Subscription', amount: 10 },
    ];

    const variableExpenses = [
        { id: 1, name: 'Groceries', category: 'Food', amount: 400 },
        { id: 2, name: 'Restaurants', category: 'Food', amount: 150 },
        { id: 3, name: 'Transport', category: 'Transport', amount: 80 },
    ];

    return (
        <div className="container" style={{ maxWidth: '1000px', marginLeft: 0 }}>
            {/* Header */}
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Budget Planner</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Track your cashflow and optimize savings.</p>
            </header>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Income</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>€3,650</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Expenses</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>€1,885</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Savings Capacity</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>€1,765 (48%)</p>
                </div>
            </div>

            {/* Tables */}
            <BudgetTable title="Incomes" items={incomes} type="income" />
            <BudgetTable title="Fixed Expenses" items={fixedExpenses} type="expense" />
            <BudgetTable title="Variable Expenses" items={variableExpenses} type="expense" />
        </div>
    );
}
