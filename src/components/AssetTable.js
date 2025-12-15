"use client";
import { useState } from 'react';

export default function AssetTable({ assets, onAdd, onUpdate, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newFormData, setNewFormData] = useState({ symbol: '', name: '', price: '', quantity: '', avgBuyPrice: '', type: 'Stock' });

    const totalValue = assets.reduce((acc, asset) => acc + (Number(asset.price || 0) * Number(asset.quantity || 0)), 0);

    // --- Edit Handlers ---
    const handleEditClick = (asset) => {
        setEditingId(asset.id);
        setEditFormData(asset);
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleSaveClick = () => {
        onUpdate(editingId, {
            ...editFormData,
            price: Number(editFormData.price),
            quantity: Number(editFormData.quantity),
            avgBuyPrice: Number(editFormData.avgBuyPrice)
        });
        setEditingId(null);
    };

    // --- Add Handlers ---
    const handleAddChange = (e) => {
        setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = () => {
        if (!newFormData.symbol || !newFormData.quantity) return;
        onAdd({
            ...newFormData,
            price: Number(newFormData.price),
            quantity: Number(newFormData.quantity),
            avgBuyPrice: Number(newFormData.avgBuyPrice)
        });
        setNewFormData({ symbol: '', name: '', price: '', quantity: '', avgBuyPrice: '', type: 'Stock' });
        setIsAdding(false);
    };

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Portfolio Holdings</h3>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    €{totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <th style={{ paddingBottom: '1rem', width: '25%' }}>Asset</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right', width: '15%' }}>Price</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right', width: '15%' }}>Holdings</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right', width: '15%' }}>Avg Buy</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right', width: '20%' }}>P&L</th>
                        <th style={{ paddingBottom: '1rem', textAlign: 'right', width: '10%' }}>Actions</th>
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

                        return (
                            <tr key={asset.id} style={{ borderTop: '1px solid #333' }}>
                                {isEditing ? (
                                    <>
                                        <td style={{ padding: '1rem 0' }}>
                                            <input name="symbol" value={editFormData.symbol} onChange={handleEditChange} placeholder="Symbol" style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '60px', fontWeight: 'bold' }} />
                                            <input name="name" value={editFormData.name} onChange={handleEditChange} placeholder="Name" style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '100px', display: 'block', marginTop: '5px', fontSize: '0.8rem' }} />
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            <input name="price" type="number" value={editFormData.price} onChange={handleEditChange} style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '80px', textAlign: 'right' }} />
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            <input name="quantity" type="number" value={editFormData.quantity} onChange={handleEditChange} style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '80px', textAlign: 'right' }} />
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            <input name="avgBuyPrice" type="number" value={editFormData.avgBuyPrice} onChange={handleEditChange} style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '80px', textAlign: 'right' }} />
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            -
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
                                        <td style={{ padding: '1rem 0' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 600 }}>{asset.symbol}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{asset.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            €{Number(asset.price).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <span>{asset.quantity}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            €{Number(asset.avgBuyPrice).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <span style={{ color: isPositive ? 'var(--success)' : 'var(--danger)', fontWeight: 500 }}>
                                                    {isPositive ? '+' : ''}€{pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                                </span>
                                                <span style={{ fontSize: '0.8rem', color: isPositive ? 'var(--success)' : 'var(--danger)', opacity: 0.8 }}>
                                                    {isPositive ? '+' : ''}{pnlPercent.toFixed(2)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                                <button onClick={() => handleEditClick(asset)} style={{ background: 'none', border: 'none', color: '#666' }}>✏️</button>
                                                <button onClick={() => onDelete(asset.id)} style={{ background: 'none', border: 'none', color: '#666' }}>🗑️</button>
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
                                <input name="symbol" value={newFormData.symbol} onChange={handleAddChange} placeholder="SYM" style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '60px', fontWeight: 'bold' }} />
                                <input name="name" value={newFormData.name} onChange={handleAddChange} placeholder="Name" style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '100px', display: 'block', marginTop: '5px', fontSize: '0.8rem' }} />
                            </td>
                            <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                <input name="price" type="number" placeholder="Price" value={newFormData.price} onChange={handleAddChange} style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '80px', textAlign: 'right' }} />
                            </td>
                            <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                <input name="quantity" type="number" placeholder="Qty" value={newFormData.quantity} onChange={handleAddChange} style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '80px', textAlign: 'right' }} />
                            </td>
                            <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                <input name="avgBuyPrice" type="number" placeholder="Avg Buy" value={newFormData.avgBuyPrice} onChange={handleAddChange} style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px', width: '80px', textAlign: 'right' }} />
                            </td>
                            <td style={{ padding: '1rem 0' }}></td>
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
                    + Add Asset
                </button>
            )}
        </div>
    );
}
