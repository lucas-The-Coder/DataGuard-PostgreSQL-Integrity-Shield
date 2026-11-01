import React from 'react'

const TablesView = () => {
  const tables = [
    {name: 'customers', rows: 12450, status: 'OK', size: '2.4 MB', last_verified: '2 min ago', hash: 'a1b2c3d4...'},
    {name: 'orders', rows: 89320, status: 'TAMPERED', size: '12.8 MB', last_verified: '2 min ago', hash: 'x9y8z7w6...'},
    {name: 'products', rows: 5230, status: 'OK', size: '890 KB', last_verified: '5 min ago', hash: 'm4n5o6p7...'},
    {name: 'databasechangelog', rows: 45, status: 'OK', size: '32 KB', last_verified: '1 hour ago', hash: 'q1w2e3r4...'},
    {name: 'order_items', rows: 156000, status: 'OK', size: '24.1 MB', last_verified: '2 min ago', hash: 'z9x8c7v6...'},
    {name: 'payments', rows: 89320, status: 'OK', size: '8.3 MB', last_verified: '3 min ago', hash: 'p0o9i8u7...'}
  ]

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h1>Tables Monitored (12)</h1>
        <button style={{background: '#00ff87', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'}}>Verify All</button>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px'}}>
        {tables.map(t => (
          <div key={t.name} style={{background: '#1a1d1f', border: `1px solid ${t.status === 'OK' ? '#333' : '#ff4444'}`, borderRadius: '8px', padding: '16px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
              <h3 style={{margin: 0, fontFamily: 'monospace', color: '#00ff87', fontSize: '16px'}}>{t.name}</h3>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: t.status === 'OK' ? '#00ff87' : '#ff4444'}}></div>
                <span style={{fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: t.status === 'OK' ? '#00ff8720' : '#ff444420', color: t.status === 'OK' ? '#00ff87' : '#ff4444', fontWeight: 'bold'}}>{t.status}</span>
              </div>
            </div>
            <div style={{fontSize: '12px', color: '#888', lineHeight: '1.6'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Rows:</span><span style={{color: '#fff'}}>{t.rows.toLocaleString()}</span></div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Size:</span><span style={{color: '#fff'}}>{t.size}</span></div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Last Verified:</span><span style={{color: '#fff'}}>{t.last_verified}</span></div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Hash:</span><span style={{color: '#00ff87', fontFamily: 'monospace', fontSize: '10px'}}>{t.hash}</span></div>
            </div>
            <div style={{marginTop: '12px', display: 'flex', gap: '8px'}}>
              <button style={{flex: 1, background: '#232629', color: '#fff', border: '1px solid #333', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'}}>View Ledger</button>
              {t.status === 'TAMPERED' ? <button style={{flex: 1, background: '#ff4444', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold'}}>Heal from 5433</button> : <button style={{flex: 1, background: '#00ff87', color: '#000', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold'}}>Verify</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default TablesView