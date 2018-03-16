import React, {Component} from 'react'
import graphYears from './Graphs/years';
import graphNumber from './Graphs/number';

export default class Graphs extends Component {
  constructor (props) {
    super(props)

    this.yearsId = 'years';
    this.numbersId = 'numbers'
  }
  
  
  componentDidMount () {
    const {
      governments, 
      geo
    } = this.props

    graphYears(document.getElementById(this.yearsId), governments, geo)
    graphNumber(document.getElementById(this.numbersId), governments, geo)
  }

  render() {
    return (
      <div className="graphs">
        <canvas id={this.yearsId} width="800" height="800"></canvas>
        <canvas id={this.numbersId} width="800" height="800"></canvas>
      </div>
    )
  }
}