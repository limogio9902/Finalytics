"use client";
import { useState } from 'react';

export default function BudgetTable({ title, items, type = 'expense', onAdd, onUpdate, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newFormData, setNewFormData] = useState({ name: '', category: '', amount: '' });

    const total = items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    const isIncome = type === 'income';

    // --- Edit Handlers ---
    const handleEditClick = (item) => {
        setEditingId(item.id);
        setEditFormData(item);
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleSaveClick = () => {
        onUpdate(editingId, { ...editFormData, amount: Number(editFormData.amount) });
        setEditingId(null);
    };

    // --- Add Handlers ---
    const handleAddChange = (e) => {
        setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = () => {
        if (!newFormData.name || !newFormData.amount) return;
        onAdd({ ...newFormData, amount: Number(newFormData.amount) });
        setNewFormData({ name: '', category: '', amount: '' });
        setIsAdding(false);
    };

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
                        <th style={{ paddingBottom: '1rem', width: '40%' }}>Name</th>
                        <th style={{ paddingBottom: '1rem', width: '30%' }}>Category</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right', width: '20%' }}>Amount</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right', width: '10%' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                        const isEditing = editingId === item.id;
                        return (
                            <tr key={item.id} style={{ borderTop: '1px solid #333' }}>
                                {isEditing ? (
                                    <>
                                        <td style={{ padding: '1rem 0' }}>
                                            <input
                                                name="name"
                                                value={editFormData.name}
                                                onChange={handleEditChange}
                                                style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '90%' }}
                                            />
                                        </td>
                                        <td style={{ padding: '1rem 0' }}>
                                            <input
                                                name="category"
                                                value={editFormData.category}
                                                onChange={handleEditChange}
                                                style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '90%' }}
                                            />
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            <input
                                                name="amount"
                                                type="number"
                                                value={editFormData.amount}
                                                onChange={handleEditChange}
                                                style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '80px', textAlign: 'right' }}
                                            />
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
                                                <button onClick={handleSaveClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✅</button>
                                                <button onClick={() => setEditingId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>❌</button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={{ padding: '1rem 0' }}>{item.name}</td>
                                        <td style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>{item.category}</td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 500 }}>
                                            €{Number(item.amount).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                                <button onClick={() => handleEditClick(item)} style={{ background: 'none', border: 'none', color: '#666' }}>✏️</button>
                                                <button onClick={() => onDelete(item.id)} style={{ background: 'none', border: 'none', color: '#666' }}>🗑️</button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        );
                    })}

                    {/* Add Row */}
                    {isAdding && (
                        <tr style={{ borderTop: '1px solid #333' }}>
                            <td style={{ padding: '1rem 0' }}>
                                <input name="name" placeholder="Name" value={newFormData.name} onChange={handleAddChange} autoFocus style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '90%' }} />
                            </td>
                            <td style={{ padding: '1rem 0' }}>
                                <input name="category" placeholder="Category" value={newFormData.category} onChange={handleAddChange} style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '90%' }} />
                            </td>
                            <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                <input name="amount" type="number" placeholder="0" value={newFormData.amount} onChange={handleAddChange} style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '80px', textAlign: 'right' }} />
                            </td>
                            <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
                                    <button onClick={handleAddSubmit} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✅</button>
                                    <button onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>❌</button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {!isAdding && (
                <button
                    onClick={() => setIsAdding(true)}
                    style={{
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
            )}
        </div>
    );
}
