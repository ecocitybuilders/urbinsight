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
      {name: 'employment', value: 3},
      {name: 'healthcare', value: 0},
      {name: 'family', value: 2},
      {name: 'stability', value: 3},
      {name: 'relationships', value: 4},
      {name: 'recreation', value: 1},
      {name: 'education', value: 2},
      {name: 'vacation', value: 3},
      {name: 'housing', value: 4},
      {name: 'environment', value: 2},
      {name: 'discrimination', value: 1},
      {name: 'religion', value: 2},
      {name: 'mobility', value: 4},
      {name: 'movement', value: 3},
      {name: 'safety', value: 1},
      {name: 'governance', value: 2}
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
      // debugger
      if (!responsesPerQuestion[key]) return {name: key, value: 0}
      return {name: key, value: results[key] / responsesPerQuestion[key]}
    })
    // let newObj = {}
    // a.forEach(function(obj){
    //   newObj[obj.name] = [obj.value]
    // })
    // console.log(a)
    // return a
  }
  componentDidMount () {
    chartObj.size = {width: (screen.width / 2.2)}
    // chartObj.data.json = this.state.totalData
    let chart = c3.generate(chartObj)
    // console.log(chart)
    this.setState({
      chart: chart
    })
  }
  componentDidUpdate (pp, ps) {
    if (ps.chart.load && typeof pp.surveys !== 'undefined') {
      // console.log(ps.totalData)
      chartObj.data.json = ps.totalData
      // console.log(chartObj)
      // c3.generate(chartObj)
      // ps.chart.load({json: ps.totalData})
      ps.chart.load({
        json: ps.totalData,
        // unload: true,
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
    // // let chartDataArray = ['Average Response']
    // // newTotalData.forEach(function (obj) {
    // //   chartDataArray.push(obj.value)
    // // })
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
