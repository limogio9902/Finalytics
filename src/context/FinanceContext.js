"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
    // Initial State / Defaults
    const defaultIncomes = [
        { id: 1, name: 'Salary', category: 'Job', amount: 3200 },
        { id: 2, name: 'Freelance', category: 'Side Hustle', amount: 450 },
    ];

    const defaultFixed = [
        { id: 1, name: 'Rent', category: 'Housing', amount: 1200 },
        { id: 2, name: 'Internet', category: 'Utilities', amount: 45 },
        { id: 3, name: 'Spotify', category: 'Subscription', amount: 10 },
    ];

    const defaultVariable = [
        { id: 1, name: 'Groceries', category: 'Food', amount: 400 },
        { id: 2, name: 'Restaurants', category: 'Food', amount: 150 },
        { id: 3, name: 'Transport', category: 'Transport', amount: 80 },
    ];

    const defaultAssets = [
        { id: 1, name: 'S&P 500 ETF', symbol: 'SP500', price: 450.20, quantity: 25, avgBuyPrice: 380.00, type: 'Stock' },
        { id: 2, name: 'Bitcoin', symbol: 'BTC', price: 42500, quantity: 0.15, avgBuyPrice: 30000, type: 'Crypto' },
        { id: 3, name: 'Ethereum', symbol: 'ETH', price: 2250, quantity: 1.5, avgBuyPrice: 1800, type: 'Crypto' },
        { id: 4, name: 'LVMH', symbol: 'MC.PA', price: 720.50, quantity: 8, avgBuyPrice: 650.00, type: 'Stock' },
    ];

    const [incomes, setIncomes] = useState([]);
    const [fixedExpenses, setFixedExpenses] = useState([]);
    const [variableExpenses, setVariableExpenses] = useState([]);
    const [assets, setAssets] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const loadData = (key, setter, defaults) => {
            const saved = localStorage.getItem(key);
            if (saved) {
                setter(JSON.parse(saved));
            } else {
                setter(defaults);
            }
        };

        loadData('finalytics_incomes', setIncomes, defaultIncomes);
        loadData('finalytics_fixed', setFixedExpenses, defaultFixed);
        loadData('finalytics_variable', setVariableExpenses, defaultVariable);
        loadData('finalytics_assets', setAssets, defaultAssets);
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) localStorage.setItem('finalytics_incomes', JSON.stringify(incomes));
    }, [incomes, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem('finalytics_fixed', JSON.stringify(fixedExpenses));
    }, [fixedExpenses, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem('finalytics_variable', JSON.stringify(variableExpenses));
    }, [variableExpenses, isLoaded]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem('finalytics_assets', JSON.stringify(assets));
    }, [assets, isLoaded]);

    // History State
    const [history, setHistory] = useState({ past: [], future: [] });

    // Helper to Snapshot State
    const saveSnapshot = () => {
        const currentSnapshot = { incomes, fixedExpenses, variableExpenses, assets };
        setHistory(curr => ({
            past: [...curr.past, currentSnapshot],
            future: []
        }));
    };

    // Undo
    const undo = () => {
        if (history.past.length === 0) return;
        const previous = history.past[history.past.length - 1];
        const newPast = history.past.slice(0, -1);

        // Save current to future
        const currentSnapshot = { incomes, fixedExpenses, variableExpenses, assets };

        setHistory({
            past: newPast,
            future: [currentSnapshot, ...history.future]
        });

        // Restore State
        setIncomes(previous.incomes);
        setFixedExpenses(previous.fixedExpenses);
        setVariableExpenses(previous.variableExpenses);
        setAssets(previous.assets);
    };

    // Redo
    const redo = () => {
        if (history.future.length === 0) return;
        const next = history.future[0];
        const newFuture = history.future.slice(1);

        // Save current to past
        const currentSnapshot = { incomes, fixedExpenses, variableExpenses, assets };

        setHistory({
            past: [...history.past, currentSnapshot],
            future: newFuture
        });

        // Restore State
        setIncomes(next.incomes);
        setFixedExpenses(next.fixedExpenses);
        setVariableExpenses(next.variableExpenses);
        setAssets(next.assets);
    };

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                undo();
            }
            if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
                e.preventDefault();
                redo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [history, incomes, fixedExpenses, variableExpenses, assets]);

    // CRUD Handlers (Wrapped with History)
    const addIncome = (item) => { saveSnapshot(); setIncomes([...incomes, { ...item, id: Date.now() }]); };
    const updateIncome = (id, newItem) => { saveSnapshot(); setIncomes(incomes.map(i => i.id === id ? newItem : i)); };
    const deleteIncome = (id) => { saveSnapshot(); setIncomes(incomes.filter(i => i.id !== id)); };

    const addFixed = (item) => { saveSnapshot(); setFixedExpenses([...fixedExpenses, { ...item, id: Date.now() }]); };
    const updateFixed = (id, newItem) => { saveSnapshot(); setFixedExpenses(fixedExpenses.map(i => i.id === id ? newItem : i)); };
    const deleteFixed = (id) => { saveSnapshot(); setFixedExpenses(fixedExpenses.filter(i => i.id !== id)); };

    const addVariable = (item) => { saveSnapshot(); setVariableExpenses([...variableExpenses, { ...item, id: Date.now() }]); };
    const updateVariable = (id, newItem) => { saveSnapshot(); setVariableExpenses(variableExpenses.map(i => i.id === id ? newItem : i)); };
    const deleteVariable = (id) => { saveSnapshot(); setVariableExpenses(variableExpenses.filter(i => i.id !== id)); };

    const addAsset = (item) => { saveSnapshot(); setAssets([...assets, { ...item, id: Date.now() }]); };
    const updateAsset = (id, newItem) => { saveSnapshot(); setAssets(assets.map(a => a.id === id ? newItem : a)); };
    const deleteAsset = (id) => { saveSnapshot(); setAssets(assets.filter(a => a.id !== id)); };

    // Calculated Values
    const totalIncome = incomes.reduce((acc, i) => acc + (Number(i.amount) || 0), 0);
    const totalFixed = fixedExpenses.reduce((acc, i) => acc + (Number(i.amount) || 0), 0);
    const totalVariable = variableExpenses.reduce((acc, i) => acc + (Number(i.amount) || 0), 0);
    const totalExpenses = totalFixed + totalVariable;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    const totalAssetValue = assets.reduce((acc, a) => acc + ((Number(a.price) || 0) * (Number(a.quantity) || 0)), 0);

    return (
        <FinanceContext.Provider value={{
            incomes, addIncome, updateIncome, deleteIncome,
            fixedExpenses, addFixed, updateFixed, deleteFixed,
            variableExpenses, addVariable, updateVariable, deleteVariable,
            assets, addAsset, updateAsset, deleteAsset,
            totalIncome, totalExpenses, savingsRate, totalAssetValue,
            isLoaded, undo, redo // Export undo/redo if needed in UI buttons later
        }}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    return useContext(FinanceContext);
}
