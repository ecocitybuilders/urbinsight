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
                          'mobility', 'movement', 'safety', 'governance']

export let questions = [
  {
    title: '1. Employment',
    description: `This question is asking if you believe there are enough job opportunities in your community.
      It addresses whether or not you feel that finding employment close by is difficult. `
  },
  {
    title: '2. Healthcare',
    description: `This question is asking if you think you are able to easily receive medical attention when necessary.
      Consider how quickly you are able to access health services and whether or not you can regularly afford them.
`
  },
  {
    title: '3. Family',
    description: `This question is asking how confident you are in your ability to provide your family members with
      their basic needs. These could include things like food, clothing, or medical care. `
  },
  {
    title: '4. Stability',
    description: `Consider how routine your life is in regards to work and your living conditions. Think about whether
      these factors change dramatically from a day-to-day basis or if you have a stable schedule. `
  },
  {
    title: '5. Friendships',
    description: `When answering this question, consider your relationships with family members, friends, coworkers,
      or other people in your community. Address whether or not you think it is easy to create and maintain social connections with them. `
  },
  {
    title: '6. Recreation',
    description: 'Think about how often and easily you are able to exercise or participate in sports. Consider whether your community offers a variety of recreational areas like gyms, swimming pools, and parks.'
  },
  {
    title: '7. Education',
    description: 'This question is asking if you know ways to receive more education and how to afford it. Also consider if you feel you truly understand the potential opportunities higher education can provide.'
  },
  {
    title: '8. Vacation',
    description: 'Consider both the amount of vacation time you’ve had recently as well as other free days you may have off. Reflect on whether you think it was enough time away as a reward for your work.'
  },
  {
    title: '9. Housing',
    description: 'Consider how well your home provides you with basic housing needs. Also think about the level of comfort you experience in your home and whether or not you have a strong desire to move elsewhere.'
  },
  {
    title: '10. Built Environment',
    description: 'This question is asking whether or not you struggle to maintain access to basic needs like running water and energy. As well as this, think about how your living situation either contributes to or helps reduce stress in your day-to-day life.'
  },
  {
    title: `11. Social Environment`,
    description: 'This question addresses whether you have ever felt restricted from opportunities because of your ethnicity, religion, gender, or other factors. Consider how others in your community treat you and if this treatment is appropriately respectful.'
  },
  {
    title: '12. Freedom of religion',
    description: 'Consider how members of your community, and perhaps your government, might limit your ability to practice your religion. Reflect on whether or not you feel restricted in your ability to worship as you please.'
  },
  {
    title: '13. Mobility',
    description: 'This question is asking how much available transportation you have at your disposal (including cars, trains, taxis, etc.). Think about how affordable your means of getting around is, and how quickly you are able to access it.'
  },
  {
    title: '14. Freedom of movement',
    description: 'Consider your ability to walk around your neighborhood without feeling unsafe or restricted. This question is meant to assess how comfortable you feel moving through your community.'
  },
  {
    title: `15. Safety`,
    description: 'When answering this question, think about how safe you feel on a day to day basis. Consider whether or not you’ve personally seen or experienced criminal activity, and if it is considered a regular occurrence in your community.'
  },
  {
    title: `16. Participation in decision making(governance)`,
    description: 'This question is asking how much you think your opinions and concerns are addressed by leaders in your community. Consider how much you think you and other people you know are able to influence and determine the progress of your community.'
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
