import React from 'react'

const IntegrityLedger = () => {
  const ledger = [
    {id: 1001, table: 'customers', row_id: '101', hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', prev_hash: '00000000000000000000000000000000', op: 'U', time: '2026-11-01 14:02:11', user: 'luked', txid: '78432'},
    {id: 1002, table: 'orders', row_id: '5521', hash: 'x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4', prev_hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', op: 'U', time: '2026-11-01 14:01:33', user: 'postgres', txid: '78431'},
    {id: 1003, table: 'customers', row_id: '203', hash: 'm4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9', prev_hash: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8', op: 'I', time: '2026-11-01 13:58:02', user: 'system', txid: '78430'},
    {id: 1004, table: 'products', row_id: '42', hash: 'q1w2e3r4t5y6u7i8o9p0a1s2d3f4g5h6', prev_hash: 'm4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9', op: 'U', time: '2026-11-01 13:45:11', user: 'luked', txid: '78429'},
  ]

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h1>Integrity Ledger (WORM)</h1>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          <span style={{fontSize: '12px', background: '#00ff8720', color: '#00ff87', padding: '6px 12px', borderRadius: '4px', border: '1px solid #00ff87'}}>WORM PROTECTED - No UPDATE/DELETE allowed</span>
          <span style={{fontSize: '12px', color: '#888'}}>1,247 entries</span>
        </div>
      </div>
      <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden'}}>
        <table style={{width: '100%', fontSize: '11px', fontFamily: 'monospace', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{background: '#232629', color: '#888', textAlign: 'left'}}>
              <th style={{padding: '10px'}}>ID</th>
              <th>Table</th>
              <th>Row ID</th>
              <th>Hash</th>
              <th>Prev Hash</th>
              <th>Op</th>
              <th>Time</th>
              <th>User</th>
              <th>TXID</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map(l => (
              <tr key={l.id} style={{borderTop: '1px solid #333'}}>
                <td style={{padding: '10px', color: '#00ff87'}}>#{l.id}</td>
                <td style={{padding: '10px', color: '#00ff87'}}>{l.table}</td>
                <td style={{padding: '10px'}}>{l.row_id}</td>
                <td style={{padding: '10px'}}><span title={l.hash} style={{color: '#fff'}}>{l.hash.substring(0, 16)}...</span></td>
                <td style={{padding: '10px', color: '#666'}}>{l.prev_hash.substring(0, 12)}...</td>
                <td style={{padding: '10px'}}><span style={{background: l.op === 'U' ? '#ffaa0020' : l.op === 'I' ? '#00ff8720' : '#ff444420', color: l.op === 'U' ? '#ffaa00' : l.op === 'I' ? '#00ff87' : '#ff4444', padding: '2px 6px', borderRadius: '3px', fontWeight: 'bold'}}>{l.op}</span></td>
                <td style={{padding: '10px', color: '#888'}}>{l.time}</td>
                <td style={{padding: '10px'}}>{l.user}</td>
                <td style={{padding: '10px', color: '#666'}}>{l.txid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{marginTop: '15px', background: '#232629', border: '1px solid #333', borderRadius: '6px', padding: '12px', fontSize: '11px', color: '#888'}}>
        <strong style={{color: '#00ff87'}}>WORM Protection:</strong> This table has trigger <code>prevent_ledger_tamper()</code> — any UPDATE/DELETE raises exception. Only INSERT allowed. Hash chain: each row's prev_hash = previous row's hash for same row_id.
      </div>
    </div>
  )
}
export default IntegrityLedger