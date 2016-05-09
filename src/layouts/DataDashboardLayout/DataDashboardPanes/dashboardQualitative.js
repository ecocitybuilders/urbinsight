import React from 'react'
import c3 from 'c3'

let exampleData = {
  bindto: '#survey-results',
  data: {
    columns: [
      ['Average Response', 4, 5, 3, 1, 5, 0, 4, 4, 2, 3, 1, 3, 4, 4, 4, 4]
    ],
    type: 'bar',
    color: function (color, d) {
      return colors[d.index]
    }
  },
  bar: {
    width: {
      ratio: 1
    }
  },
  axis: {
    x: {
      type: 'category',
      categories: ['Employment', 'Healthcare', 'Family', 'Stability', 'Relationships',
                   'Recreation', 'Education', 'Vacation', 'Housing', 'Environment',
                   'Discrimination', 'Religion', 'Mobility', 'Movement', 'Safety', 'Governance' ],
      tick: {
        rotate: 75,
        multiline: false
      }
    },
    y: {
      max: 5.0,
      padding: {
        top: 0
      }
    }
  },
  legend: {
    show: false
  },
  transitions: {
    duration: 1000
  },
  tooltip: {
    format: {
      value: function (value) {
        return value.toFixed(2)
      }
    }
  }
}

let colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
              '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
              '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
              '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']

class DashboardQualitative extends React.Component {

  componentDidMount () {
    exampleData.size = {width: (screen.width / 2.2)}
    c3.generate(exampleData)
  }

  render () {
    let questions = [
      {
        title: 'Im a Question Title',
        description: 'Im a description that is a bit longer to understand what is happening with the questions'
      },
      {
        title: 'Im a Question Title',
        description: 'Im a description that is a bit longer to understand what is happening with the questions'
      },
      {
        title: 'Im a Question Title',
        description: 'Im a description that is a bit longer to understand what is happening with the questions'
      },
      {
        title: 'Im a Question Title',
        description: 'Im a description that is a bit longer to understand what is happening with the questions'
      },
      {
        title: 'Im a Question Title',
        description: 'Im a description that is a bit longer to understand what is happening with the questions'
      },
      {
        title: 'Im a Question Title',
        description: 'Im a description that is a bit longer to understand what is happening with the questions'
      },
      {
        title: 'Im a Question Title',
        description: 'Im a description that is a bit longer to understand what is happening with the questions'
      }
    ]

    let questionsList = questions.map(function (question, index) {
      return (
        <div key={index}>
          <h4>{question.title}</h4>
          <h5>{question.description}</h5>
        </div>
      )
    })
    // style='min-width: 400px; max-width: 95%; height: 275px; margin: 20px 25px 25px 10px;' ng-hide='showNoDataMessage'
    return (
      <div>
        <div id='survey-results' ></div>
        {questionsList}
      </div>

    )
  }
}

export default DashboardQualitative
