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

    // CRUD Handlers
    const addIncome = (item) => setIncomes([...incomes, { ...item, id: Date.now() }]);
    const updateIncome = (id, newItem) => setIncomes(incomes.map(i => i.id === id ? newItem : i));
    const deleteIncome = (id) => setIncomes(incomes.filter(i => i.id !== id));

    const addFixed = (item) => setFixedExpenses([...fixedExpenses, { ...item, id: Date.now() }]);
    const updateFixed = (id, newItem) => setFixedExpenses(fixedExpenses.map(i => i.id === id ? newItem : i));
    const deleteFixed = (id) => setFixedExpenses(fixedExpenses.filter(i => i.id !== id));

    const addVariable = (item) => setVariableExpenses([...variableExpenses, { ...item, id: Date.now() }]);
    const updateVariable = (id, newItem) => setVariableExpenses(variableExpenses.map(i => i.id === id ? newItem : i));
    const deleteVariable = (id) => setVariableExpenses(variableExpenses.filter(i => i.id !== id));

    const addAsset = (item) => setAssets([...assets, { ...item, id: Date.now() }]);
    const updateAsset = (id, newItem) => setAssets(assets.map(a => a.id === id ? newItem : a));
    const deleteAsset = (id) => setAssets(assets.filter(a => a.id !== id));

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
            isLoaded
        }}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    return useContext(FinanceContext);
}
