import React from 'react'
const SecurityEvents = () => {
  const events = [
    {id: 1, type: 'TAMPER_DETECTED', table: 'customers', row_id: '101', severity: 'CRITICAL', status: 'OPEN', time: '2 min ago', old_hash: 'a1b2...', new_hash: 'x9y8...', user: 'unknown'},
    {id: 2, type: 'HASH_MISMATCH', table: 'orders', row_id: '5521', severity: 'HIGH', status: 'OPEN', time: '15 min ago', old_hash: 'm4n5...', new_hash: 'p0o9...', user: 'luked'},
    {id: 3, type: 'UNAUTHORIZED_UPDATE', table: 'customers', row_id: '203', severity: 'MEDIUM', status: 'OPEN', time: '1 hour ago', old_hash: 'q1w2...', new_hash: 'z9x8...', user: 'postgres'},
  ]
  const getSeverityColor = (s) => s === 'CRITICAL' ? '#ff4444' : s === 'HIGH' ? '#ffaa00' : '#ffcc00'
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h1>Security Events (3 OPEN)</h1>
        <div style={{display: 'flex', gap: '10px'}}>
          <span style={{background: '#ff444420', color: '#ff4444', padding: '6px 12px', borderRadius: '4px', fontSize: '12px'}}>CRITICAL: 2</span>
          <span style={{background: '#ffaa0020', color: '#ffaa00', padding: '6px 12px', borderRadius: '4px', fontSize: '12px'}}>HIGH: 1</span>
        </div>
      </div>
      <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden'}}>
        <table style={{width: '100%', fontSize: '13px', borderCollapse: 'collapse'}}>
          <thead><tr style={{background: '#232629', color: '#888', textAlign: 'left'}}><th style={{padding: '12px'}}>ID</th><th>Type</th><th>Table / Row</th><th>Severity</th><th>Time</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id} style={{borderTop: '1px solid #333'}}>
                <td style={{padding: '12px', fontFamily: 'monospace', color: '#00ff87'}}>#{e.id}</td>
                <td style={{padding: '12px'}}><span style={{fontFamily: 'monospace', fontSize: '11px'}}>{e.type}</span><div style={{fontSize: '10px', color: '#888'}}>by {e.user}</div></td>
                <td style={{padding: '12px'}}><span style={{color: '#00ff87', fontFamily: 'monospace'}}>{e.table}</span> / {e.row_id}<div style={{fontSize: '10px', color: '#888', fontFamily: 'monospace'}}>{e.old_hash} → {e.new_hash}</div></td>
                <td style={{padding: '12px'}}><span style={{background: `${getSeverityColor(e.severity)}20`, color: getSeverityColor(e.severity), padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold'}}>{e.severity}</span></td>
                <td style={{padding: '12px', color: '#888'}}>{e.time}</td>
                <td style={{padding: '12px'}}><span style={{background: '#ff4444', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold'}}>{e.status}</span></td>
                <td style={{padding: '12px'}}><button style={{background: '#ff4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}>Heal</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default SecurityEvents
