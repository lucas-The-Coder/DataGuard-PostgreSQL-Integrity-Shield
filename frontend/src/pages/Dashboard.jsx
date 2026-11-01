import React from 'react'

const Dashboard = () => {
  const tables = [
    {name: 'customers', rows: 12450, status: 'OK'},
    {name: 'orders', rows: 89320, status: 'TAMPERED'},
    {name: 'products', rows: 5230, status: 'OK'},
    {name: 'databasechangelog', rows: 45, status: 'OK'}
  ]

  const events = [
    {id: 1, type: 'TAMPER_DETECTED', table: 'customers', row: '101', severity: 'CRITICAL', status: 'OPEN'},
    {id: 2, type: 'HASH_MISMATCH', table: 'orders', row: '5521', severity: 'HIGH', status: 'OPEN'},
    {id: 3, type: 'UNAUTHORIZED_UPDATE', table: 'customers', row: '203', severity: 'MEDIUM', status: 'OPEN'}
  ]

  const ledger = [
    {table: 'customers', row_id: '101', hash: 'a1b2c3d4e5f6...', prev: '000000...', op: 'U', time: '14:02:11'},
    {table: 'orders', row_id: '5521', hash: 'x9y8z7w6v5...', prev: 'a1b2c3...', op: 'U', time: '14:01:33'},
    {table: 'customers', row_id: '203', hash: 'm4n5o6p7q8...', prev: 'a1b2c3...', op: 'U', time: '13:58:02'}
  ]

  return (
    <div style={{color: '#fff'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
        <h1>Dashboard</h1>
        <span style={{color: '#888', fontSize: '14px'}}>Last scan: 2 min ago | PROD :5432 | RECOVERY :5433</span>
      </div>

      {/* Top Row: Score + Stats */}
      <div style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
        <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '20px', width: '200px', textAlign: 'center'}}>
          <div style={{width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #00ff87', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#00ff87', fontWeight: 'bold'}}>87</div>
          <div style={{marginTop: '10px', color: '#00ff87'}}>Integrity Score</div>
          <div style={{fontSize: '12px', color: '#888'}}>/ 100 - GOOD</div>
        </div>

        <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
          <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '15px'}}>
            <div style={{color: '#888', fontSize: '12px'}}>Tables Monitored</div>
            <div style={{fontSize: '24px', fontWeight: 'bold'}}>12</div>
          </div>
          <div style={{background: '#1a1d1f', border: '1px solid #ff4444', borderRadius: '8px', padding: '15px'}}>
            <div style={{color: '#ff4444', fontSize: '12px'}}>Events OPEN</div>
            <div style={{fontSize: '24px', fontWeight: 'bold', color: '#ff4444'}}>3</div>
          </div>
          <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '15px'}}>
            <div style={{color: '#888', fontSize: '12px'}}>Patches Applied</div>
            <div style={{fontSize: '24px', fontWeight: 'bold', color: '#00ff87'}}>15</div>
          </div>
          <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '15px'}}>
            <div style={{color: '#888', fontSize: '12px'}}>Merkle Root</div>
            <div style={{fontSize: '12px', fontFamily: 'monospace', color: '#00ff87'}}>a1b2c3...def456</div>
            <button style={{marginTop: '5px', background: '#00ff87', color: '#000', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px'}}>Verify</button>
          </div>
        </div>
      </div>

      {/* Middle Row: Tables + Events */}
      <div style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
        <div style={{flex: 1, background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '15px'}}>
          <h3>Tables Status</h3>
          {tables.map(t => (
            <div key={t.name} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #333'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: t.status === 'OK' ? '#00ff87' : '#ff4444'}}></div>
                <span style={{fontFamily: 'monospace'}}>{t.name}</span>
              </div>
              <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                <span style={{fontSize: '12px', color: '#888'}}>{t.rows.toLocaleString()} rows</span>
                <span style={{fontSize: '11px', padding: '2px 6px', borderRadius: '3px', background: t.status === 'OK' ? '#00ff8720' : '#ff444420', color: t.status === 'OK' ? '#00ff87' : '#ff4444'}}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{flex: 1, background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '15px'}}>
          <h3>Recent Security Events</h3>
          {events.map(e => (
            <div key={e.id} style={{padding: '10px', borderLeft: `3px solid ${e.severity === 'CRITICAL' ? '#ff4444' : e.severity === 'HIGH' ? '#ffaa00' : '#ffcc00'}`, background: '#232629', marginBottom: '8px', borderRadius: '4px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{fontSize: '12px', fontWeight: 'bold', color: e.severity === 'CRITICAL' ? '#ff4444' : '#ffaa00'}}>{e.severity}: {e.type}</span>
                <span style={{fontSize: '10px', background: '#ff4444', color: '#fff', padding: '2px 6px', borderRadius: '3px'}}>{e.status}</span>
              </div>
              <div style={{fontSize: '12px', color: '#888', marginTop: '4px'}}>{e.table} row {e.row}</div>
              <button style={{marginTop: '6px', background: '#ff4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px'}}>Heal from 5433</button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Ledger Preview */}
      <div style={{background: '#1a1d1f', border: '1px solid #333', borderRadius: '8px', padding: '15px'}}>
        <h3>Integrity Ledger (WORM) - Last 3 Entries</h3>
        <table style={{width: '100%', fontSize: '12px', fontFamily: 'monospace', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{color: '#888', textAlign: 'left', borderBottom: '1px solid #333'}}>
              <th style={{padding: '8px'}}>table</th>
              <th>row_id</th>
              <th>hash</th>
              <th>prev_hash</th>
              <th>op</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((l, i) => (
              <tr key={i} style={{borderBottom: '1px solid #2a2d2f'}}>
                <td style={{padding: '8px', color: '#00ff87'}}>{l.table}</td>
                <td>{l.row_id}</td>
                <td>{l.hash}</td>
                <td style={{color: '#888'}}>{l.prev}</td>
                <td><span style={{background: '#00ff8720', color: '#00ff87', padding: '2px 6px', borderRadius: '3px'}}>{l.op}</span></td>
                <td style={{color: '#888'}}>{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard