"use client";
import { useState, useRef } from 'react';

import AnimatedNumber from './AnimatedNumber';

export default function AssetTable({ assets, onAdd, onUpdate, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newFormData, setNewFormData] = useState({ symbol: '', name: '', price: '', quantity: '', avgBuyPrice: '', type: 'Stock' });

    // Ref for rapid entry focus
    const symbolInputRef = useRef(null);

    const totalValue = assets.reduce((sum, asset) => sum + (Number(asset.price) || 0) * (Number(asset.quantity) || 0), 0);

    // --- Handlers (same logic) ---
    const handleEditClick = (asset) => { setEditingId(asset.id); setEditFormData(asset); };
    const handleEditChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    const handleSaveClick = () => {
        onUpdate(editingId, { ...editFormData, price: Number(editFormData.price), quantity: Number(editFormData.quantity), avgBuyPrice: Number(editFormData.avgBuyPrice) });
        setEditingId(null);
    };
    const handleAddChange = (e) => setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
    const handleAddSubmit = () => {
        if (!newFormData.symbol || !newFormData.quantity) return;
        onAdd({ ...newFormData, price: Number(newFormData.price), quantity: Number(newFormData.quantity), avgBuyPrice: Number(newFormData.avgBuyPrice) });
        setNewFormData({ symbol: '', name: '', price: '', quantity: '', avgBuyPrice: '', type: 'Stock' });
        // Rapid Entry: Keep isAdding true and refocus symbol
        setIsAdding(true);
        setTimeout(() => symbolInputRef.current?.focus(), 0);
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
        fontSize: '0.85rem',
        color: 'var(--text-primary)',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box'
    };

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Portfolio Holdings</h3>
                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                    €<AnimatedNumber value={totalValue} />
                </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.2rem' }}>
                <thead>
                    <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <th style={{ padding: '0.5rem', width: '25%' }}>Asset</th>
                        <th style={{ padding: '0.5rem', textAlign: 'right', width: '15%' }}>Price</th>
                        <th style={{ padding: '0.5rem', textAlign: 'right', width: '15%' }}>Holdings</th>
                        <th style={{ padding: '0.5rem', textAlign: 'right', width: '15%' }}>Avg Buy</th>
                        <th style={{ padding: '0.5rem', textAlign: 'right', width: '20%' }}>P&L</th>
                        <th style={{ padding: '0.5rem', textAlign: 'right', width: '10%' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => {
                        const isEditing = editingId === asset.id;
                        const currentValue = (Number(asset.price) || 0) * (Number(asset.quantity) || 0);
                        const costBasis = (Number(asset.avgBuyPrice) || 0) * (Number(asset.quantity) || 0);
                        const pnl = currentValue - costBasis;
                        const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;
                        const isPositive = pnl >= 0;

                        // Row styling
                        const rowStyle = { transition: 'background 0.2s' };

                        return (
                            <tr key={asset.id} style={rowStyle}>
                                {isEditing ? (
                                    <>
                                        <td style={{ padding: '0.2rem' }}>
                                            <input className="animate-pop" name="symbol" value={editFormData.symbol} onChange={handleEditChange} onKeyDown={handleEditKeyDown} placeholder="Symbol" style={{ ...inputStyle, width: '70px', textTransform: 'uppercase' }} />
                                            <input className="animate-pop" name="name" value={editFormData.name} onChange={handleEditChange} onKeyDown={handleEditKeyDown} placeholder="Name" style={{ ...inputStyle, marginTop: '4px', fontSize: '0.8rem' }} />
                                        </td>
                                        <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="price" type="number" value={editFormData.price} onChange={handleEditChange} onKeyDown={handleEditKeyDown} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                                        <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="quantity" type="number" value={editFormData.quantity} onChange={handleEditChange} onKeyDown={handleEditKeyDown} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                                        <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="avgBuyPrice" type="number" value={editFormData.avgBuyPrice} onChange={handleEditChange} onKeyDown={handleEditKeyDown} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                                        <td style={{ padding: '0.2rem' }}>-</td>
                                        <td style={{ padding: '0.2rem', textAlign: 'right' }}>
                                            <div className="animate-pop" style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                                                <button onClick={handleSaveClick} className="btn-success" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>✓</button>
                                                <button onClick={() => setEditingId(null)} className="btn-danger" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>✕</button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={{ padding: '0.5rem 0.5rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{asset.symbol}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{asset.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '0.5rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>
                                            €{Number(asset.price).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '0.5rem 0.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <span style={{ fontWeight: 700 }}>{asset.quantity}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '0.5rem 0.5rem', textAlign: 'right', fontWeight: 600, color: '#999' }}>
                                            €{Number(asset.avgBuyPrice).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '0.5rem 0.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <span style={{ color: isPositive ? 'var(--color-green)' : 'var(--color-red)', fontWeight: 800 }}>
                                                    {isPositive ? '+' : ''}€{pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                                </span>
                                                <span style={{ fontSize: '0.85rem', color: isPositive ? 'var(--color-green)' : 'var(--color-red)', fontWeight: 600, background: isPositive ? '#e6fffa' : '#ffe6e6', padding: '2px 6px', borderRadius: '6px', marginTop: '4px' }}>
                                                    {isPositive ? '+' : ''}{pnlPercent.toFixed(2)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '0.5rem 0.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button onClick={() => handleEditClick(asset)} style={{ background: '#f0f0f0', color: '#999', borderRadius: '8px', padding: '6px' }}>✎</button>
                                                <button onClick={() => onDelete(asset.id)} style={{ background: '#fff0f0', color: 'var(--color-red)', borderRadius: '8px', padding: '6px' }}>🗑</button>
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
                            <td style={{ padding: '0.2rem' }}>
                                <input ref={symbolInputRef} className="animate-pop" name="symbol" value={newFormData.symbol} onChange={handleAddChange} onKeyDown={handleAddKeyDown} placeholder="Symbol" style={{ ...inputStyle, width: '70px', textTransform: 'uppercase' }} />
                                <input className="animate-pop" name="name" value={newFormData.name} onChange={handleAddChange} onKeyDown={handleAddKeyDown} placeholder="Name" style={{ ...inputStyle, marginTop: '4px', fontSize: '0.8rem' }} />
                            </td>
                            <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="price" type="number" placeholder="Price" value={newFormData.price} onChange={handleAddChange} onKeyDown={handleAddKeyDown} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                            <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="quantity" type="number" placeholder="Qty" value={newFormData.quantity} onChange={handleAddChange} onKeyDown={handleAddKeyDown} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                            <td style={{ padding: '0.2rem' }}><input className="animate-pop" name="avgBuyPrice" type="number" placeholder="Avg" value={newFormData.avgBuyPrice} onChange={handleAddChange} onKeyDown={handleAddKeyDown} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                            <td style={{ padding: '0.2rem' }}></td>
                            <td style={{ padding: '0.2rem', textAlign: 'right' }}>
                                <div className="animate-pop" style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                                    <button onClick={handleAddSubmit} className="btn-success" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>✓</button>
                                    <button onClick={() => setIsAdding(false)} className="btn-danger" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>✕</button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ padding: '0.5rem' }}>
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
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = '#eee'; e.currentTarget.style.color = '#666'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = '#f7f7f7'; e.currentTarget.style.color = '#999'; }}
                                >
                                    + ADD ASSET
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
