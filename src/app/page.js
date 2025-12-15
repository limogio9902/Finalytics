import DashboardCard from '@/components/DashboardCard';

export default function Home() {
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
        <DashboardCard
          title="Net Worth"
          value="€124,500"
          trend={2.4}
        />
        <DashboardCard
          title="Monthly Income"
          value="€3,200"
          trend={0.5}
          trendLabel="vs avg"
        />
        <DashboardCard
          title="Monthly Expenses"
          value="€1,950"
          trend={-5.2}
          trendLabel="below budget"
        />
        <DashboardCard
          title="Investments"
          value="€20,300"
          trend={12.8}
        />
      </div>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Asset Allocation</h2>
        <div className="card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          [Chart Placeholder - Allocation]
        </div>
      </section>
    </div>
  );
}
