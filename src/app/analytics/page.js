"use client";
import { useFinance } from '@/context/FinanceContext';
import CashFlowSankey from '@/components/CashFlowSankey';

export default function AnalyticsPage() {
    const { incomes, fixedExpenses, variableExpenses, totalIncome, totalExpenses, isLoaded } = useFinance();

    if (!isLoaded) return <div className="container">Loading...</div>;

    // --- Data Transformation for Sankey ---
    // Nodes: Income Sources, "Budget", Expense Categories, "Savings"
    const nodes = [];
    const links = [];

    // Helper to find or add node
    const getOrCreateNode = (name, color = null) => {
        let node = nodes.find(n => n.id === name);
        if (!node) {
            node = { id: name };
            if (color) node.nodeColor = color;
            nodes.push(node);
        }
        return node;
    };

    // 1. Income -> Budget
    // Aggregate incomes by name (or category, but name is detailed enough usually)
    incomes.forEach(inc => {
        const amount = Number(inc.amount);
        if (amount > 0) {
            getOrCreateNode(inc.name);
            getOrCreateNode("Budget", "#4f46e5"); // Central Node
            links.push({ source: inc.name, target: "Budget", value: amount });
        }
    });

    // 2. Budget -> Expenses (Grouped by Category)
    const allExpenses = [...fixedExpenses, ...variableExpenses];
    const expensesByCategory = allExpenses.reduce((acc, exp) => {
        const cat = exp.category || 'Other';
        acc[cat] = (acc[cat] || 0) + Number(exp.amount);
        return acc;
    }, {});

    Object.entries(expensesByCategory).forEach(([category, amount]) => {
        if (amount > 0) {
            getOrCreateNode(category);
            links.push({ source: "Budget", target: category, value: amount });
        }
    });

    // 3. Budget -> Savings
    // Only if Income > Expenses
    if (totalIncome > totalExpenses) {
        const savings = totalIncome - totalExpenses;
        getOrCreateNode("Savings", "#10b981");
        links.push({ source: "Budget", target: "Savings", value: savings });
    }

    const sankeyData = { nodes, links };


    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Analytics & Projections</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Visualize your path to financial freedom.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

                {/* Cash Flow Sankey */}
                <div className="card">
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Monthly Cash Flow</h2>
                    <div style={{ height: '500px', background: 'var(--bg-secondary)', borderRadius: '8px', padding: '1rem' }}>
                        <CashFlowSankey data={sankeyData} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    {/* Width 50% split for stats below diagram */}

                    {/* Expense Breakdown */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Top Expense Categories</h2>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {Object.entries(expensesByCategory)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 5)
                                .map(([cat, amount]) => (
                                    <li key={cat} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #eee' }}>
                                        <span>{cat}</span>
                                        <span style={{ fontWeight: 600 }}>€{amount.toLocaleString()}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Savings Rate Trend */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Savings Rate</h2>
                        {totalIncome > 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', background: `conic-gradient(var(--color-green) ${((totalIncome - totalExpenses) / totalIncome) * 100}%, #eee 0)` }}>
                                    <div style={{ position: 'absolute', inset: '10px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{(((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Add income to see savings rate.</p>
                        )}
                        <p style={{ textAlign: 'center', color: '#666', marginTop: '0.5rem' }}>Target: 50%</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
