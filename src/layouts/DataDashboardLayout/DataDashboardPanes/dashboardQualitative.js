import React from 'react'
import c3 from 'c3'
import _ from 'lodash'
let colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
              '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
              '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
              '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
let chartObj = {
  bindto: '#survey-results',
  data: {
    json: [
      {name: 'Employment', value: 0},
      {name: 'Healthcare', value: 0},
      {name: 'Family', value: 0},
      {name: 'Stability', value: 0},
      {name: 'Relationships', value: 0},
      {name: 'Recreation', value: 0},
      {name: 'Education', value: 0},
      {name: 'Vacation', value: 0},
      {name: 'Housing', value: 0},
      {name: 'Environment', value: 0},
      {name: 'Discrimination', value: 0},
      {name: 'Religion', value: 0},
      {name: 'Mobility', value: 0},
      {name: 'Movement', value: 0},
      {name: 'Safety', value: 0},
      {name: 'Governance', value: 0}
    ],
    keys: {
      x: 'name',
      value: ['value']
    },
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
// switch (response) {
//   case 'excellent':
//     results[question] += 5
//     break
//   case 'good':
//     results[question] += 4
//     break
//   case 'adequate':
//     results[question] += 3
//     break
//   case 'insufficient':
//     results[question] += 2
//     break
//   case 'absent':
//     results[question] += 1
//     break
//   case 'unknown':
//     results[question] += 0
//     break
//   default:
// }
class DashboardQualitative extends React.Component {
  constructor () {
    super()
    this.state = {
      totalData: [],
      chart: {},
      noData: true
    }
  }

  generateSurveyTotals (surveysObj) {
    let surveys = surveysObj.surveys
    let responsesPerQuestion = {}
    var results = {}
    let capitalizeFirstLetter = function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
    surveys.forEach(function (survey) {
      _.forEach(survey, function (response, question) {
        if (['__v', '_id', 'geoCoordinates'].indexOf(question) < 0) {
          let value
          if (response === '') {
            value = 0
          } else {
            value = parseInt(response)
            responsesPerQuestion[question] = responsesPerQuestion[question] ? responsesPerQuestion[question] += 1 : 1
          }
          results[question] = results[question] ? results[question] += value : value
        }
      })
    })
    return Object.keys(results).map(function (key) {
      if (!responsesPerQuestion[key]) return {name: capitalizeFirstLetter(key), value: 0}
      return {name: capitalizeFirstLetter(key), value: results[key] / responsesPerQuestion[key]}
    })
  }
  componentDidMount () {
    chartObj.size = {width: (screen.width / 2.2)}
    let chart = c3.generate(chartObj)
    this.setState({
      chart: chart
    })
  }
  componentDidUpdate (pp, ps) {
    if (ps.chart.load && typeof pp.surveys !== 'undefined') {
      chartObj.data.json = ps.totalData
      ps.chart.load({
        json: ps.totalData,
        keys: {
          x: 'name',
          value: ['value']
        }
      })
    }
  }

  componentWillReceiveProps (np) {
    var newTotalData = []
    if (typeof np.surveys !== 'undefined') {
      newTotalData = this.generateSurveyTotals(np.surveys)
    }
    this.setState({
      totalData: newTotalData
    })
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
    // style='min-width: 400px max-width: 95% height: 275px margin: 20px 25px 25px 10px' ng-hide='showNoDataMessage'
    return (
      <div>
        <div id='survey-results'></div>
        {questionsList}
      </div>

    )
  }
}

export default DashboardQualitative
