import React from 'react'

const Patches = () => {
  const patches = [
    {id: 1, check_id: 'CIS-3.1', name: 'No trust auth in pg_hba.conf', severity: 'CRITICAL', old_val: 'host all all 0.0.0.0/0 trust', new_val: 'host all all 0.0.0.0/0 md5', patched_at: '2 hours ago', status: 'PATCHED', popia: 'Sec 19'},
    {id: 2, check_id: 'CIS-3.2', name: 'No public schema writable', severity: 'HIGH', old_val: 'GRANT ALL ON SCHEMA public TO PUBLIC', new_val: 'REVOKE ALL ON SCHEMA public FROM PUBLIC', patched_at: '2 hours ago', status: 'PATCHED', popia: 'Sec 19'},
    {id: 3, check_id: 'CIS-4.5', name: 'log_connections enabled', severity: 'MEDIUM', old_val: 'log_connections = off', new_val: 'log_connections = on', patched_at: '3 hours ago', status: 'PATCHED', popia: 'Sec 17'},
    {id: 4, check_id: 'CIS-5.1', name: 'No superuser with weak password', severity: 'CRITICAL', old_val: 'postgres: postgres', new_val: 'Requires manual fix', patched_at: 'Pending', status: 'OPEN', popia: 'Sec 19'},
  ]

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h1>Patches (15 Applied, 1 OPEN)</h1>
        <button style={{background: '#00ff87', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'}}>Run CIS Scan</button>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px'}}>
        <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '15px'}}><div style={{color: '#888', fontSize: '12px'}}>CIS Score</div><div style={{fontSize: '28px', fontWeight: 'bold', color: '#00ff87'}}>87/100</div><div style={{fontSize: '11px', color: '#888'}}>Good - 1 critical open</div></div>
        <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '15px'}}><div style={{color: '#888', fontSize: '12px'}}>Auto-Patched</div><div style={{fontSize: '28px', fontWeight: 'bold'}}>15</div><div style={{fontSize: '11px', color: '#888'}}>Last 24h: 3 patches</div></div>
        <div style={{background: '#1a1d1f', border: '1px solid #ff4444', borderRadius: '8px', padding: '15px'}}><div style={{color: '#ff4444', fontSize: '12px'}}>OPEN</div><div style={{fontSize: '28px', fontWeight: 'bold', color: '#ff4444'}}>1</div><div style={{fontSize: '11px', color: '#888'}}>Requires manual fix</div></div>
      </div>
      <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden'}}>
        <table style={{width: '100%', fontSize: '12px', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{background: '#232629', color: '#888', textAlign: 'left'}}>
              <th style={{padding: '12px'}}>Check ID</th>
              <th>Name</th>
              <th>Severity</th>
              <th>Old → New</th>
              <th>Patched</th>
              <th>Status</th>
              <th>POPIA</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patches.map(p => (
              <tr key={p.id} style={{borderTop: '1px solid #333'}}>
                <td style={{padding: '12px', fontFamily: 'monospace', color: '#00ff87'}}>{p.check_id}</td>
                <td style={{padding: '12px'}}>{p.name}</td>
                <td style={{padding: '12px'}}><span style={{background: p.severity === 'CRITICAL' ? '#ff444420' : p.severity === 'HIGH' ? '#ffaa0020' : '#ffcc0020', color: p.severity === 'CRITICAL' ? '#ff4444' : p.severity === 'HIGH' ? '#ffaa00' : '#ffcc00', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold'}}>{p.severity}</span></td>
                <td style={{padding: '12px', fontFamily: 'monospace', fontSize: '10px'}}><div style={{color: '#ff4444'}}>{p.old_val}</div><div style={{color: '#00ff87'}}>→ {p.new_val}</div></td>
                <td style={{padding: '12px', color: '#888'}}>{p.patched_at}</td>
                <td style={{padding: '12px'}}><span style={{background: p.status === 'PATCHED' ? '#00ff87' : '#ff4444', color: p.status === 'PATCHED' ? '#000' : '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold'}}>{p.status}</span></td>
                <td style={{padding: '12px', fontSize: '11px', color: '#888'}}>{p.popia}</td>
                <td style={{padding: '12px'}}>{p.status === 'OPEN' ? <button style={{background: '#00ff87', color: '#000', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px'}}>Fix</button> : <button style={{background: '#232629', color: '#fff', border: '1px solid #333', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px'}}>Rollback</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Patches