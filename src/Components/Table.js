import React from 'react'
import ReactTable from 'react-table'
import "react-table/react-table.css";

export default ({data}) => {
  return (
    <div id="table">
      <ReactTable
        data={data}
        columns={[
          {
            columns: [
              {
                Header: 'Primo Ministro',
                accessor: "nome",
                minWidth: 150
              },
              {
                Header: "Giorni in carica",
                id: 'durata',
                accessor: d => `${d.giorni} (~${Math.round(d.giorni / 365)} anni)`,
                sortMethod: (a, b) => {
                  return a.giorni-b.giorni
                },
                minWidth: 150,
                maxWidth: 200
              },
              {
                Header: 'Mandati',
                accessor: 'governi',
                maxWidth: 100
              },
              {
                Header: 'Partiti',
                accessor: 'partito',
                minWidth: 150         
              },
              {
                Header: 'Regione',
                id: 'regione',
                accessor: d => `${d.regione} (${d.provincia})`,
                minWidth: 200
              }
            ]
          }
        ]}
        showPagination={false}
        className="-striped"
      />
    </div>
  )
}