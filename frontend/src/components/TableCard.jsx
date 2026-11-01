import React from 'react'

const TableCard = ({name, rows, status}) => {
  return (
    <div style={{border: '1px solid #555', padding: '10px', margin: '10px'}}>
      <h3>{name}</h3>
      <p>{rows} rows</p>
      <span style={{color: status === 'OK' ? 'green' : 'red'}}>{status}</span>
    </div>
  )
}

export default TableCard