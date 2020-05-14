import Chart from 'chart.js'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class CustomChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 200,
    }
  }

  componentDidMount() {
    const { budgetCard } = this.props
    const { id, ceil, currentMoney } = budgetCard
    const { height } = this.state

    const ctx = document.getElementById(`budgetCard${id}`)
    ctx.style.height = `${height}px`
    ctx.style.width = `${height}px`
    ctx.style.maxHeight = `${height}px`
    ctx.style.maxWidth = `${height}px`

    const percentage = document.getElementById(`percentage${id}`)
    console.log(`${height / 2}`)
    percentage.style.textAlign = 'center'
    console.log(percentage.style.top)
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [`Progression`, `Reste`],
        datasets: [
          {
            data: [currentMoney, ceil - currentMoney],
            backgroundColor: ['#00ff4c', '#225d9b'],
            borderWidth: 0,
            hoverBorderColor: 'black',
            hoverBorderWidth: 1,
          },
        ],
      },
      options: {
        cutoutPercentage: 75,
        legend: {
          display: false,
        },
      },
    })
  }

  render() {
    const { budgetCard } = this.props
    const { id, currentMoney, ceil } = budgetCard
    return (
      <>
        <div className="chart-container">
          <div id={`percentage${id}`} className="percentage title-size">
            {(currentMoney / ceil) * 100}%
          </div>
          <canvas id={`budgetCard${id}`}></canvas>
        </div>
      </>
    )
  }
}

CustomChart.propTypes = {
  budgetCard: PropTypes.object,
  id: PropTypes.number,
  ceil: PropTypes.number,
  currentMoney: PropTypes.number,
}

export default CustomChart
