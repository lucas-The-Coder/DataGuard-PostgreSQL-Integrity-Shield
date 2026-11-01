import React from 'react'
const Sidebar = ({currentPage, setCurrentPage}) => {
  const menu = [
    {id: 'dashboard', label: 'Dashboard'},
    {id: 'tables', label: 'Tables (12)'},
    {id: 'events', label: 'Security Events (3)'},
    {id: 'ledger', label: 'Integrity Ledger'},
    {id: 'patches', label: 'Patches (15)'},
    {id: 'merkle', label: 'Merkle Roots'}
  ]
  return (
    <div style={{width: '220px', background: '#1a1d1f', padding: '20px', minHeight: '100vh', borderRight: '1px solid #333'}}>
      <h2 style={{color: '#00ff87', margin: '0 0 5px 0'}}>DataGuard</h2>
      <div style={{fontSize: '10px', color: '#666', marginBottom: '20px'}}>PROD :5432 | REC :5433</div>
      {menu.map(item => (
        <div key={item.id} onClick={() => setCurrentPage(item.id)}
          style={{padding: '12px', cursor: 'pointer', background: currentPage === item.id ? '#00ff87' : 'transparent', color: currentPage === item.id ? '#000' : '#fff', marginBottom: '6px', borderRadius: '6px', fontSize: '14px', fontWeight: currentPage === item.id ? 'bold' : 'normal'}}>
          {item.label}
        </div>
      ))}
    </div>
  )
}
export default Sidebar
