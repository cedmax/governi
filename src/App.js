import React, {Fragment} from 'react'
import Graphs from './Components/Graphs'
import Table from './Components/Table'

export default (props) => (
  <Fragment>
    <h1>Governi Italiani</h1>
    <Graphs {...props} />
    <Table data={props.governments} />
  </Fragment>
)