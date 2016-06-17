import React, { PropTypes } from 'react'
import c3 from 'c3'
import { Accordion, Panel } from 'react-bootstrap'
import { generateSurveyTotals, surveyChart, questions, surveyTableGenerator } from 'utils/surveyUtils'

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
    // if (typeof np.surveys !== 'undefined' && np.surveys.length) {
    //   let rawBounds = np.map.getBounds().toArray()
    //   let boundsArr = [rawBounds[0][0], rawBounds[0][1], rawBounds[1][0], rawBounds[1][1]]
    //   // console.log(boundsArrayGenerator(np.map.getBounds()))
    //   // let boundsPolygon = turf.polygon(boundsArrayGenerator(np.map.getBounds()))
    //   let boundsPolygon = turf.bboxPolygon(boundsArr)
    //   let boundsFC = turf.featureCollection([boundsPolygon])
    //   let surveysCollection = surveyGeoJSONCompiler(np.surveys)
    //   // window.boundsFC = boundsFC
    //   // window.boundsPolygon = boundsPolygon
    //   // window.surveysCollection = surveysCollection
    //   let surveysInView = turf.within(surveysCollection, boundsFC)
    //   let newTotalData = generateSurveyTotalsFC(surveysInView)
    //   console.log('im newTotalData', newTotalData)
    //   this.setState({
    //     totalData: newTotalData
    //   })
    // }
    var newTotalData = []
    if (typeof np.surveys !== 'undefined') {
      newTotalData = generateSurveyTotals(np.surveys)
    }
    this.setState({
      totalData: newTotalData
    })
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
        return (
          <Panel header={'Survey #' + (index + 1)} eventKey={index} key={index}>
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
        {!this.state.totalData.length && <div className='survey-data-message'><h3>No Survey Data</h3></div>}
        <div style={{ 'display': this.state.totalData.length ? 'inherit' : 'none' }} id='survey-results'></div>
        <div className='dashboard-survey-surveys'>
          <h4 className='dashboard-survey-surveys-header'>Surveys</h4>
          {!this.state.totalData.length && <div className='survey-data-message'><h6>No Surveys in View</h6></div>}
          <Accordion>
            {surveyList}
          </Accordion>
        </div>
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
