"use client";
import DashboardCard from '@/components/DashboardCard';
import { useFinance } from '@/context/FinanceContext';

export default function Home() {
  const { totalIncome, totalExpenses, savingsRate, totalAssetValue, isLoaded } = useFinance();

  // Net Worth = Assets + Cash (Income - Expenses this month, conceptually) 
  // For simplicity, let's just say Net Worth = Total Assets + (Total Income - Total Expenses) * 1 (current cash)
  // Or just Total Assets for now if we assume budget resets monthly.
  // Let's define Net Worth as Total Assets + Monthly Savings for this view.
  const monthlySavings = totalIncome - totalExpenses;
  const netWorth = totalAssetValue + monthlySavings;

  if (!isLoaded) return <div className="container">Loading...</div>;

  return (
    <div className="container" style={{ maxWidth: '1400px', marginLeft: 0 }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Overview</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, let's grow your wealth.</p>
        </div>
        <button style={{
          background: 'var(--accent-primary)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontWeight: 600
        }}>
          + Add Transaction
        </button>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div className="animate-enter delay-1"><DashboardCard
          title="Net Worth"
          value={`€${netWorth.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          trend={2.4}
        /></div>
        <div className="animate-enter delay-2"><DashboardCard
          title="Monthly Income"
          value={`€${totalIncome.toLocaleString()}`}
          trend={0.5}
          trendLabel="vs avg"
        /></div>
        <div className="animate-enter delay-3"><DashboardCard
          title="Monthly Expenses"
          value={`€${totalExpenses.toLocaleString()}`}
          trend={-5.2}
          trendLabel="below budget"
        /></div>
        <div className="animate-enter delay-4"><DashboardCard
          title="Investments"
          value={`€${totalAssetValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          trend={12.8}
        /></div>
      </div>

      <section className="animate-enter delay-4">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Asset Allocation</h2>
        <div className="card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          [Chart Placeholder - Allocation based on {totalAssetValue.toLocaleString()} assets]
        </div>
      </section>
    </div>
  );
}
