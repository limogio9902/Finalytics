"use client";
import BudgetTable from '@/components/BudgetTable';
import AnimatedNumber from '@/components/AnimatedNumber';
import { useFinance } from '@/context/FinanceContext';

export default function BudgetPage() {
    const {
        incomes, addIncome, updateIncome, deleteIncome,
        fixedExpenses, addFixed, updateFixed, deleteFixed,
        variableExpenses, addVariable, updateVariable, deleteVariable,
        totalIncome, totalExpenses, savingsRate, isLoaded
    } = useFinance();

    if (!isLoaded) return <div className="container">Loading...</div>;

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Budget Planner</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Track your cashflow and optimize savings.</p>
            </header>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card animate-enter delay-1" style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Total Income</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-green)' }}>
                        €<AnimatedNumber value={totalIncome} />
                    </p>
                </div>
                <div className="card animate-enter delay-2" style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Total Expenses</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)' }}>
                        €<AnimatedNumber value={totalExpenses} />
                    </p>
                </div>
                <div className="card animate-enter delay-3" style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Savings Capacity</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-blue)' }}>
                        €<AnimatedNumber value={totalIncome - totalExpenses} />
                        <span style={{ fontSize: '1rem', opacity: 0.7, marginLeft: '0.5rem' }}>
                            ({savingsRate.toFixed(0)}%)
                        </span>
                    </p>
                </div>
            </div>

            {/* Tables Grid */}
            <div className="animate-enter delay-4 text-sm" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '1.5rem',
                alignItems: 'start'
            }}>
                <div style={{ minWidth: 0 }}>
                    <BudgetTable title="Incomes" items={incomes} type="income" onAdd={addIncome} onUpdate={updateIncome} onDelete={deleteIncome} />
                </div>
                <div style={{ minWidth: 0 }}>
                    <BudgetTable title="Fixed Expenses" items={fixedExpenses} type="expense" onAdd={addFixed} onUpdate={updateFixed} onDelete={deleteFixed} />
                </div>
                <div style={{ minWidth: 0 }}>
                    <BudgetTable title="Variable Expenses" items={variableExpenses} type="expense" onAdd={addVariable} onUpdate={updateVariable} onDelete={deleteVariable} />
                </div>
            </div>
        </div>
    );
}
