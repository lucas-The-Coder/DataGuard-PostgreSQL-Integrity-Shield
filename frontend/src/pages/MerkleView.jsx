import React from 'react'

const MerkleView = () => {
  const roots = [
    {id: 1, table: 'customers', root: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6', rows: 12450, created: '2 min ago', status: 'VERIFIED'},
    {id: 2, table: 'orders', root: 'x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4', rows: 89320, created: '2 min ago', status: 'MISMATCH'},
    {id: 3, table: 'products', root: 'm4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9', rows: 5230, created: '5 min ago', status: 'VERIFIED'},
  ]

  return (
    <div>
      <h1>Merkle Roots - Integrity Snapshots</h1>
      <p style={{color: '#888', fontSize: '13px'}}>Daily snapshot of entire table hash. If single row tampered, root hash changes completely.</p>
      <div style={{marginTop: '20px', background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '20px'}}>
        <h3 style={{color: '#00ff87'}}>How it works:</h3>
        <div style={{fontFamily: 'monospace', fontSize: '12px', color: '#888', lineHeight: '1.8', background: '#232629', padding: '15px', borderRadius: '6px'}}>
          customers row 101: hash(a1b2...) → <br/>
          customers row 102: hash(c3d4...) → <br/>
          customers row 103: hash(e5f6...) → <br/>
          Merkle Root = hash( hash(a1b2...) + hash(c3d4...) + hash(e5f6...) + ... ) = a1b2c3d4...<br/>
          <span style={{color: '#00ff87'}}>If row 101 tampered, root changes from a1b2c3... to x9y8z7... → detection in O(1)</span>
        </div>
      </div>
      <div style={{marginTop: '20px', background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden'}}>
        <table style={{width: '100%', fontSize: '12px', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{background: '#232629', color: '#888', textAlign: 'left'}}>
              <th style={{padding: '12px'}}>Table</th>
              <th>Root Hash</th>
              <th>Rows</th>
              <th>Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roots.map(r => (
              <tr key={r.id} style={{borderTop: '1px solid #333'}}>
                <td style={{padding: '12px', fontFamily: 'monospace', color: '#00ff87'}}>{r.table}</td>
                <td style={{padding: '12px', fontFamily: 'monospace', fontSize: '10px'}}>{r.root.substring(0, 24)}...</td>
                <td style={{padding: '12px'}}>{r.rows.toLocaleString()}</td>
                <td style={{padding: '12px', color: '#888'}}>{r.created}</td>
                <td style={{padding: '12px'}}><span style={{background: r.status === 'VERIFIED' ? '#00ff8720' : '#ff444420', color: r.status === 'VERIFIED' ? '#00ff87' : '#ff4444', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold'}}>{r.status}</span></td>
                <td style={{padding: '12px'}}><button style={{background: '#232629', color: '#fff', border: '1px solid #333', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px'}}>Verify</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default MerkleView