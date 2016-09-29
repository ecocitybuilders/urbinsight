import React, { PropTypes } from 'react'
import c3 from 'c3'
import { Accordion, Panel, Well } from 'react-bootstrap'
import { surveyGeoJSONCompiler } from 'utils/mapUtils'
import { generateSurveyTotalsFC, surveyChart, questions, surveyTableGenerator } from 'utils/surveyUtils'
import turf from 'turf'

let chartObj = surveyChart

type Props = {
  surveys: PropTypes.array
}
class DashboardQualitative extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      totalData: [],
      chart: {},
      noData: true
    }
    this.handleResize = this.handleResize.bind(this)
  }
  handleResize (e) {
    let width = window.innerWidth < 777 ? window.innerWidth / 1.05 : window.innerWidth / 2.15
    this.state.chart.resize({'width': width})
  }

  componentDidMount () {
    chartObj.size = {width: window.innerWidth < 777 ? window.innerWidth / 1.05 : window.innerWidth / 2.15}
    let chart = c3.generate(chartObj)
    this.setState({
      chart: chart
    })
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }
  componentDidUpdate (pp, ps) {
    if (ps.chart.load && typeof pp.surveys !== 'undefined') {
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
    if (typeof np.surveys !== 'undefined' && np.viewport.extent) {
      let cellWidth = 0.1
      let units = 'miles'
      let squareGrid = turf.squareGrid(np.viewport.extent, cellWidth, units)
      let surveysCollection = surveyGeoJSONCompiler(np.surveys)
      let surveysInView = turf.within(surveysCollection, squareGrid)
      let totalData = generateSurveyTotalsFC(surveysInView)
      this.setState({
        totalData: totalData
      })
    }
  }

  render () {
    let questionsList = questions.map(function (question, index) {
      return (
        <Panel header={question.title} eventKey={index} key={index}>
          {question.description}
        </Panel>
      )
    })
    const { surveys } = this.props
    let surveyList = []
    if (typeof surveys !== 'undefined') {
      surveyList = surveys.map(function (survey, index) {
        // can add for custom styling bsClass='survey-list'
        return (
          <Panel header={'Survey #' + (index + 1)} eventKey={index} key={index} >
            {surveyTableGenerator(survey)}
          </Panel>
        )
      })
    }
    return (
      <div className='dashboard-qualitative'>
        <h3 className='dashboard-qualitative-heading'>
          Quality of Life - Average Response
        </h3>
        {!this.state.totalData.length && <div className='survey-data-message'><h3>No surveys in view</h3></div>}
        <div style={{ 'display': this.state.totalData.length ? 'inherit' : 'none' }} id='survey-results'></div>
        <div className='dashboard-survey-questions'>
          <h4 className='dashboard-survey-questions-header'>Questions</h4>
          <Accordion>
            {questionsList}
          </Accordion>
        </div>
      </div>
    )
  }
}

export default DashboardQualitative

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
