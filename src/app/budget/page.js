"use client";
import BudgetTable from '@/components/BudgetTable';
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
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>€{totalIncome.toLocaleString()}</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Expenses</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>€{totalExpenses.toLocaleString()}</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Savings Capacity</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                        €{(totalIncome - totalExpenses).toLocaleString()} ({savingsRate.toFixed(0)}%)
                    </p>
                </div>
            </div>

            {/* Tables */}
            <BudgetTable
                title="Incomes"
                items={incomes}
                type="income"
                onAdd={addIncome}
                onUpdate={updateIncome}
                onDelete={deleteIncome}
            />
            <BudgetTable
                title="Fixed Expenses"
                items={fixedExpenses}
                type="expense"
                onAdd={addFixed}
                onUpdate={updateFixed}
                onDelete={deleteFixed}
            />
            <BudgetTable
                title="Variable Expenses"
                items={variableExpenses}
                type="expense"
                onAdd={addVariable}
                onUpdate={updateVariable}
                onDelete={deleteVariable}
            />
        </div>
    );
}
