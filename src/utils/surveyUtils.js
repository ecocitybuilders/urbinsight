import React from 'react'
import { capitalizeFirstLetter } from 'utils/generalUtils'
import { Table } from 'react-bootstrap'
import _ from 'lodash'

export function generateSurveyTotals (surveysArr) {
  let responsesPerQuestion = {}
  var results = {}
  surveysArr.forEach(function (survey) {
    _.forEach(survey, function (response, question) {
      if (['__v', '_id', 'geoCoordinates', 'user'].indexOf(question) < 0) {
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

export function generateSurveyTotalsFC (surveysFC) {
  let responsesPerQuestion = {}
  var results = {}
  surveysFC.features.forEach(function (survey) {
    _.forEach(survey.properties, function (response, question) {
      if (['__v', '_id', 'geoCoordinates', 'user'].indexOf(question) < 0) {
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

let colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
              '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
              '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
              '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']

export let surveyChart = {
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

export let questionIDs = ['employment', 'healthcare', 'family', 'stability',
                 'relationships', 'recreation', 'education', 'vacation',
                 'housing', 'environment', 'discrimination', 'religion',
                 'environment', 'discrimination', 'religion', 'mobility',
                 'movement', 'safety', 'governance']
export let questions = [
  {
    title: '1. How would you describe your level of access to adequate employment?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '2. How would you describe your level of access to healthcare and health services?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '3. How would you describe your ability to provide care for family members as needed?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '4. How would you describe stability in your daily life?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '5. How do you describes your level of access to opportunities to develop healthy social relations?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '6. How do you descrive your level of access to recreational opportunities and activities?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '7. How would you describe your level of access to knowledge for futhering your education?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '8. How would you describe your level of vacation(time-off) time you have?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '9. How would you describe your shelter/housing?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '10. How do you describe your living environment? (this includes access to natural resources)',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: `11. How would you describe the level of respect and non-discrimination
        you experience in your daily life?`,
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '12. How would you describe your level of freedom to practice your religion?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '13. How would you describe your level of access to mobility?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: '14. How do you describe your level of freedom of movement?',
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: `15. How do you describe your level of safety and
      the absence of physical violence or criminality in your daily life?`,
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  },
  {
    title: `16. How do you describe your ability to participate
      in your communitys political, governance-based and decision-making processes?`,
    description: 'Im a description that is a bit longer to understand what is happening with the questions'
  }
]

export function surveyTableGenerator (survey) {
  return (
    <Table striped bordered condensed fill>
      <thead>
        <tr>
          <th>Question</th>
          <th>Response</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Employment</td>
          <td>{survey.employment}</td>
        </tr>
        <tr>
          <td>Healthcare</td>
          <td>{survey.healthcare}</td>
        </tr>
        <tr>
          <td>Family</td>
          <td>{survey.family}</td>
        </tr>
        <tr>
          <td>Stability</td>
          <td>{survey.stability}</td>
        </tr>
        <tr>
          <td>Relationships</td>
          <td>{survey.relationships}</td>
        </tr>
        <tr>
          <td>Recreation</td>
          <td>{survey.recreation}</td>
        </tr>
        <tr>
          <td>Education</td>
          <td>{survey.education}</td>
        </tr>
        <tr>
          <td>Vacation</td>
          <td>{survey.vacation}</td>
        </tr>
        <tr>
          <td>Housing</td>
          <td>{survey.housing}</td>
        </tr>
        <tr>
          <td>Environment</td>
          <td>{survey.environment}</td>
        </tr>
        <tr>
          <td>Discrimination</td>
          <td>{survey.discrimination}</td>
        </tr>
        <tr>
          <td>Religion</td>
          <td>{survey.religion}</td>
        </tr>
        <tr>
          <td>Mobility</td>
          <td>{survey.mobility}</td>
        </tr>
        <tr>
          <td>Movement</td>
          <td>{survey.movement}</td>
        </tr>
        <tr>
          <td>Safety</td>
          <td>{survey.safety}</td>
        </tr>
        <tr>
          <td>Governance</td>
          <td>{survey.governance}</td>
        </tr>
      </tbody>
    </Table>
  )
}

// export let surveyQuestions = [
//   { label: '1. How would you describe your level of access to adequate employment?',
//     ref: 'employment',
//     defaultValue: this.props.fieldValues.employment
//   },
//   { label: '2. How would you describe your level of access to healthcare and health services?',
//     ref: 'healthcare',
//     defaultValue: this.props.fieldValues.healthcare
//   },
//   { label: '3. How would you describe your ability to provide care for family members as needed?',
//     ref: 'family',
//     defaultValue: this.props.fieldValues.family
//   },
//   { label: '4. How would you describe stability in your daily life?',
//     ref: 'stability',
//     defaultValue: this.props.fieldValues.stability
//   },
//   { label: '5. How do you describes your level of access to opportunities to develop healthy social relations?',
//     ref: 'relationships',
//     defaultValue: this.props.fieldValues.relationships
//   },
//   { label: '6. How do you descrive your level of access to recreational opportunities and activities?',
//     ref: 'recreation',
//     defaultValue: this.props.fieldValues.recreation
//   },
//   { label: '7. How would you describe your level of access to knowledge for futhering your education?',
//     ref: 'education',
//     defaultValue: this.props.fieldValues.education
//   },
//   { label: '8. How would you describe your level of vacation(time-off) time you have?',
//     ref: 'vacation',
//     defaultValue: this.props.fieldValues.vacation
//   },
//   { label: '9. How would you describe your shelter/housing?',
//     ref: 'housing',
//     defaultValue: this.props.fieldValues.housing
//   },
//   { label: '10. How do you describe your living environment? (this includes access to natural resources)',
//     ref: 'environment',
//     defaultValue: this.props.fieldValues.environment
//   },
//   { label: `11. How would you describe the level of respect and non-discrimination
//       you experience in your daily life?`,
//     ref: 'discrimination',
//     defaultValue: this.props.fieldValues.discrimination
//   },
//   { label: '12. How would you describe your level of freedom to practice your religion?',
//     ref: 'religion',
//     defaultValue: this.props.fieldValues.religion
//   },
//   { label: '13. How would you describe your level of access to mobility?',
//     ref: 'mobility',
//     defaultValue: this.props.fieldValues.mobility
//   },
//   { label: '14. How do you describe your level of freedom of movement?',
//     ref: 'movement',
//     defaultValue: this.props.fieldValues.movement
//   },
//   { label: `15. How do you describe your level of safety and
//     the absence of physical violence or criminality in your daily life?`,
//     ref: 'safety',
//     defaultValue: this.props.fieldValues.safety
//   },
//   { label: `16. How do you describe your ability to participate
//     in your communitys political, governance-based and decision-making processes?`,
//     ref: 'governance',
//     defaultValue: this.props.fieldValues.governance
//   }
// ]
