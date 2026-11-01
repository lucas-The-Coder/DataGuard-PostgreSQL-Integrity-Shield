import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import TablesView from './pages/TablesView'
import SecurityEvents from './pages/SecurityEvents'
import IntegrityLedger from './pages/IntegrityLedger'
import Patches from './pages/Patches'
import MerkleView from './pages/MerkleView'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <Dashboard />
      case 'tables': return <TablesView />
      case 'events': return <SecurityEvents />
      case 'ledger': return <IntegrityLedger />
      case 'patches': return <Patches />
      case 'merkle': return <MerkleView />
      default: return <Dashboard />
    }
  }
  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#232629', color: '#fff'}}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{flex: 1, padding: '20px', overflowY: 'auto'}}>
        {renderPage()}
      </main>
    </div>
  )
}
export default App
