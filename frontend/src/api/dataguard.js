export const API = {
  getTables: async () => [
    {name: 'customers', rows: 12450, status: 'OK'},
    {name: 'orders', rows: 89320, status: 'TAMPERED'}
  ],
  getEvents: async () => [
    {id: 1, table_name: 'customers', severity: 'CRITICAL', status: 'OPEN'}
  ]
}