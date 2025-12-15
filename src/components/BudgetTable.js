"use client";
import { useState } from 'react';

import AnimatedNumber from './AnimatedNumber';

export default function BudgetTable({ title, items, type = 'expense', onAdd, onUpdate, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newFormData, setNewFormData] = useState({ name: '', category: '', amount: '' });

    const total = items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    const isIncome = type === 'income';

    // --- Handlers ---
    const handleEditClick = (item) => {
        setEditingId(item.id);
        setEditFormData(item);
    };
    const handleEditChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    const handleSaveClick = () => {
        onUpdate(editingId, { ...editFormData, amount: Number(editFormData.amount) });
        setEditingId(null);
    };
    const handleAddChange = (e) => setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
    const handleAddSubmit = () => {
        if (!newFormData.name || !newFormData.amount) return;
        onAdd({ ...newFormData, amount: Number(newFormData.amount) });
        setNewFormData({ name: '', category: '', amount: '' });
        setIsAdding(false);
    };

    const handleEditKeyDown = (e) => {
        if (e.key === 'Enter') handleSaveClick();
        if (e.key === 'Escape') setEditingId(null);
    };

    const handleAddKeyDown = (e) => {
        if (e.key === 'Enter') handleAddSubmit();
        if (e.key === 'Escape') setIsAdding(false);
    };

    const inputStyle = {
        background: '#f0f0f0',
        border: '2px solid #e5e5e5',
        borderRadius: '8px',
        padding: '4px 8px', /* Reduced padding */
        width: '100%',
        fontWeight: '600',
        fontSize: '0.85rem', /* Smaller font */
        color: 'var(--text-primary)',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box' /* Ensure padding doesn't overflow */
    };

    return (
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h3>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: isIncome ? 'var(--color-green)' : 'var(--text-primary)' }}>
                    {isIncome ? '+' : '-'}€<AnimatedNumber value={total} />
                </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.2rem' }}>
                <thead>
                    <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <th style={{ padding: '0.5rem', width: '55%' }}>Name</th>
                        <th style={{ padding: '0.5rem', textAlign: 'right', width: '30%' }}>Amount</th>
                        <th style={{ padding: '0.5rem', textAlign: 'right', width: '15%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                        const isEditing = editingId === item.id;
                        return (
                            <tr key={item.id} style={{ transition: 'background 0.2s' }}>
                                {isEditing ? (
                                    <>
                                        <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="name" value={editFormData.name} onChange={handleEditChange} onKeyDown={handleEditKeyDown} style={inputStyle} /></td>
                                        <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="amount" type="number" value={editFormData.amount} onChange={handleEditChange} onKeyDown={handleEditKeyDown} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                                        <td style={{ padding: '0.2rem', textAlign: 'right' }}>
                                            <div className="animate-pop" style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                                                <button onClick={handleSaveClick} className="btn-success" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>✓</button>
                                                <button onClick={() => setEditingId(null)} className="btn-danger" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>✕</button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={{ padding: '0.5rem 0.5rem', fontWeight: 700 }}>{item.name}</td>
                                        <td style={{ padding: '0.5rem 0.5rem', textAlign: 'right', fontWeight: 800, color: isIncome ? 'var(--color-green)' : 'var(--text-primary)' }}>
                                            €{Number(item.amount).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '0.5rem 0.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button onClick={() => handleEditClick(item)} style={{ background: '#f0f0f0', color: '#999', borderRadius: '8px', padding: '6px' }}>✎</button>
                                                <button onClick={() => onDelete(item.id)} style={{ background: '#fff0f0', color: 'var(--color-red)', borderRadius: '8px', padding: '6px' }}>🗑</button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        );
                    })}

                    {/* Add Row */}
                    {isAdding ? (
                        <tr>
                            <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="name" placeholder="Name" value={newFormData.name} onChange={handleAddChange} onKeyDown={handleAddKeyDown} autoFocus style={inputStyle} /></td>
                            <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="amount" type="number" placeholder="0" value={newFormData.amount} onChange={handleAddChange} onKeyDown={handleAddKeyDown} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                            <td style={{ padding: '0.2rem', textAlign: 'right' }}>
                                <div className="animate-pop" style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                                    <button onClick={handleAddSubmit} className="btn-success" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>✓</button>
                                    <button onClick={() => setIsAdding(false)} className="btn-danger" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>✕</button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={3} style={{ padding: '0.5rem' }}>
                                <button
                                    onClick={() => setIsAdding(true)}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: '#f7f7f7',
                                        border: '2px dashed #e5e5e5',
                                        borderRadius: '8px',
                                        color: '#999',
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = '#eee'; e.currentTarget.style.color = '#666'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = '#f7f7f7'; e.currentTarget.style.color = '#999'; }}
                                >
                                    + ADD {type === 'income' ? 'INCOME' : 'EXPENSE'}
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
