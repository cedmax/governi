import React from 'react'
import ReactTable from 'react-table'
import "react-table/react-table.css";

const jarh = (x) => {
	const y = 365;
	const y2 = 31;
	const remainder = x % y;
	const casio = remainder % y2;
	const year = (x - remainder) / y;
	const month = (remainder - casio) / y2;

  return `${year}y${month?` ${month}m`:''}`;
}

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
                accessor: d => `${d.giorni} - ${jarh(d.giorni)}`,
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
        pageSize={data.length}
        showPagination={false}
        className="-striped"
      />
    </div>
  )
}