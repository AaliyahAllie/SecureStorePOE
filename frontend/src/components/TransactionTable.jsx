import React, { useState } from 'react';
import employeeApi from '../services/employeeApi';

export default function TransactionTable({ transactions = [], onReload }) {
  const [loading, setLoading] = useState({});

  const handleVerify = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, [id]: true }));
      await employeeApi.put(`/employee/payments/${id}/verify`);
      onReload?.();
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSubmitToSwift = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, [id]: true }));
      await employeeApi.put(`/employee/payments/${id}/swift`);
      onReload?.();
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'verified':
        return 'verified';
      case 'submitted':
        return 'submitted';
      default:
        return '';
    }
  };

  return (
    <div className="card">
      <div className="table-container">
        <table className="table" role="table" aria-label="Transaction records">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>SWIFT Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx._id}>
                  <td>{tx.customerName || tx.payeeName || '—'}</td>
                  <td>{tx.accountNumber || tx.payeeAccountNumber || '—'}</td>
                  <td>{tx.amount ? `${tx.amount.toFixed(2)}` : '—'}</td>
                  <td>{tx.currency || '—'}</td>
                  <td>{tx.swiftCode || tx.swift || '—'}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(tx.status)}`}>
                      {tx.status || 'Unknown'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      {tx.status?.toLowerCase() === 'pending' && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleVerify(tx._id)}
                          disabled={loading[tx._id]}
                          title="Verify this transaction"
                        >
                          {loading[tx._id] ? '...' : 'Verify'}
                        </button>
                      )}

                      {tx.status?.toLowerCase() === 'verified' && (
                        <button
                          className="btn btn-accent btn-sm"
                          onClick={() => handleSubmitToSwift(tx._id)}
                          disabled={loading[tx._id]}
                          title="Submit transaction to SWIFT network"
                        >
                          {loading[tx._id] ? '...' : 'Submit to SWIFT'}
                        </button>
                      )}

                      {!['pending', 'verified'].includes(tx.status?.toLowerCase()) && (
                        <span style={{ fontSize: 'var(--font-size-sm)', opacity: 0.6 }}>
                          No actions available
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
