import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Line } from "react-chartjs-2";

const HomeScreen = ({ match }) => {

  const wardrobeName = match.params.wardrobeName

  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)

  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: 'Visitors',
        data: data,
        borderWidth: 5,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  })

  useEffect(async () => {
    const res = await fetch("/api/counter")
    const graph_data = await res.json()

    console.log(graph_data)
    let totalCount = 0
    for (const date in graph_data) {
      setLabels(l => [...l, date])
      const c = graph_data[date]
      setData(d => [...d, graph_data[date]])
      totalCount += c
    }
    setCount(totalCount)
  }, [])

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: wardrobeName,
          data: data,
          borderWidth: 2,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        }
      ]
    })
  }, [labels, data])

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: 'Visits'
        }
      },
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time'
        }
      },
    }
  }

  return (
    <>
      <Button
        variant='success'
        className='btn-block'
        type='button'
        disabled={true}
      >
        <h3 style={{color:'white'}}>Visitors: {count}</h3>
      </Button>
      <div>
        <Line
          data={chartData}
          options={options}
        />
      </div>
    </>
  )
}

export default HomeScreen
