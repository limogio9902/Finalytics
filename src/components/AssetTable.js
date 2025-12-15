"use client";
import { useState } from 'react';

import AnimatedNumber from './AnimatedNumber';

export default function AssetTable({ assets, onAdd, onUpdate, onDelete }) {
    // ... hooks ...

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Portfolio Holdings</h3>
                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                    €<AnimatedNumber value={totalValue} />
                </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
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
                                        <td style={{ padding: '0.5rem' }}>
                                            <input name="symbol" value={editFormData.symbol} onChange={handleEditChange} placeholder="Symbol" style={{ ...inputStyle, width: '70px', textTransform: 'uppercase' }} />
                                            <input name="name" value={editFormData.name} onChange={handleEditChange} placeholder="Name" style={{ ...inputStyle, marginTop: '4px', fontSize: '0.8rem' }} />
                                        </td>
                                        <td style={{ padding: '0.5rem' }}><input name="price" type="number" value={editFormData.price} onChange={handleEditChange} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                                        <td style={{ padding: '0.5rem' }}><input name="quantity" type="number" value={editFormData.quantity} onChange={handleEditChange} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                                        <td style={{ padding: '0.5rem' }}><input name="avgBuyPrice" type="number" value={editFormData.avgBuyPrice} onChange={handleEditChange} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                                        <td style={{ padding: '0.5rem' }}>-</td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button onClick={handleSaveClick} className="btn-success" style={{ padding: '8px' }}>✓</button>
                                                <button onClick={() => setEditingId(null)} className="btn-danger" style={{ padding: '8px' }}>✕</button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={{ padding: '1rem 0.5rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{asset.symbol}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{asset.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>
                                            €{Number(asset.price).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <span style={{ fontWeight: 700 }}>{asset.quantity}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem', textAlign: 'right', fontWeight: 600, color: '#999' }}>
                                            €{Number(asset.avgBuyPrice).toLocaleString()}
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <span style={{ color: isPositive ? 'var(--color-green)' : 'var(--color-red)', fontWeight: 800 }}>
                                                    {isPositive ? '+' : ''}€{pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                                </span>
                                                <span style={{ fontSize: '0.85rem', color: isPositive ? 'var(--color-green)' : 'var(--color-red)', fontWeight: 600, background: isPositive ? '#e6fffa' : '#ffe6e6', padding: '2px 6px', borderRadius: '6px', marginTop: '4px' }}>
                                                    {isPositive ? '+' : ''}{pnlPercent.toFixed(2)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
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
                            <td style={{ padding: '0.5rem' }}>
                                <input name="symbol" value={newFormData.symbol} onChange={handleAddChange} placeholder="Symbol" style={{ ...inputStyle, width: '70px', textTransform: 'uppercase' }} />
                                <input name="name" value={newFormData.name} onChange={handleAddChange} placeholder="Name" style={{ ...inputStyle, marginTop: '4px', fontSize: '0.8rem' }} />
                            </td>
                            <td style={{ padding: '0.5rem' }}><input name="price" type="number" placeholder="Price" value={newFormData.price} onChange={handleAddChange} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                            <td style={{ padding: '0.5rem' }}><input name="quantity" type="number" placeholder="Qty" value={newFormData.quantity} onChange={handleAddChange} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                            <td style={{ padding: '0.5rem' }}><input name="avgBuyPrice" type="number" placeholder="Avg" value={newFormData.avgBuyPrice} onChange={handleAddChange} style={{ ...inputStyle, textAlign: 'right' }} /></td>
                            <td style={{ padding: '0.5rem' }}></td>
                            <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <button onClick={handleAddSubmit} className="btn-success" style={{ padding: '8px' }}>✓</button>
                                    <button onClick={() => setIsAdding(false)} className="btn-danger" style={{ padding: '8px' }}>✕</button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ padding: '1rem 0.5rem' }}>
                                <button
                                    onClick={() => setIsAdding(true)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: '#f7f7f7',
                                        border: '2px dashed #e5e5e5',
                                        borderRadius: '16px',
                                        color: '#999',
                                        fontWeight: 700,
                                        fontSize: '0.9rem'
                                    }}>
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
