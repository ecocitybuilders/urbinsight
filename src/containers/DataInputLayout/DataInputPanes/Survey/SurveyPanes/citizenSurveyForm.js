import React, { PropTypes } from 'react'
import { Button, Input, Row, Col } from 'react-bootstrap'
import { questionIDs } from 'utils/surveyUtils'

type Props = {
  surveySubmit: PropTypes.func.isRequired,
  previousStep: PropTypes.func,
  formReset: PropTypes.func,
  nextStep: PropTypes.func,
  survey: PropTypes.func
}

class CitizenSurveyForm extends React.Component {
  props: Props;
  constructor () {
    super()
    this.surveySubmit = this.surveySubmit.bind(this)
    this.getResponses = this.getResponses.bind(this)
  }

  getResponses () {
    let questions = questionIDs
    let questionValues = {}
    questions.forEach(function (question) {
      questionValues[question] = this.refs[question].getValue()
    }.bind(this))
    return questionValues
  }
  surveySubmit (e) {
    let responses = this.getResponses()
    let survey = Object.assign({}, this.props.survey, responses)
    this.props.surveySubmit(survey)
    this.props.nextStep()
  }

  render () {
    let surveyQuestions = [
      { label: '1. How would you describe your level of access to adequate employment?',
        ref: 'employment',
        defaultValue: this.props.survey.employment
      },
      { label: '2. How would you describe your level of access to healthcare and health services?',
        ref: 'healthcare',
        defaultValue: this.props.survey.healthcare
      },
      { label: '3. How would you describe your ability to provide care for family members as needed?',
        ref: 'family',
        defaultValue: this.props.survey.family
      },
      { label: '4. How would you describe stability in your daily life?',
        ref: 'stability',
        defaultValue: this.props.survey.stability
      },
      { label: '5. How do you describes your level of access to opportunities to develop healthy social relations?',
        ref: 'relationships',
        defaultValue: this.props.survey.relationships
      },
      { label: '6. How do you descrive your level of access to recreational opportunities and activities?',
        ref: 'recreation',
        defaultValue: this.props.survey.recreation
      },
      { label: '7. How would you describe your level of access to knowledge for futhering your education?',
        ref: 'education',
        defaultValue: this.props.survey.education
      },
      { label: '8. How would you describe your level of vacation(time-off) time you have?',
        ref: 'vacation',
        defaultValue: this.props.survey.vacation
      },
      { label: '9. How would you describe your shelter/housing?',
        ref: 'housing',
        defaultValue: this.props.survey.housing
      },
      { label: '10. How do you describe your living environment? (this includes access to natural resources)',
        ref: 'environment',
        defaultValue: this.props.survey.environment
      },
      { label: `11. How would you describe the level of respect and non-discrimination
          you experience in your daily life?`,
        ref: 'discrimination',
        defaultValue: this.props.survey.discrimination
      },
      { label: '12. How would you describe your level of freedom to practice your religion?',
        ref: 'religion',
        defaultValue: this.props.survey.religion
      },
      { label: '13. How would you describe your level of access to mobility?',
        ref: 'mobility',
        defaultValue: this.props.survey.mobility
      },
      { label: '14. How do you describe your level of freedom of movement?',
        ref: 'movement',
        defaultValue: this.props.survey.movement
      },
      { label: `15. How do you describe your level of safety and
        the absence of physical violence or criminality in your daily life?`,
        ref: 'safety',
        defaultValue: this.props.survey.safety
      },
      { label: `16. How do you describe your ability to participate
        in your communitys political, governance-based and decision-making processes?`,
        ref: 'governance',
        defaultValue: this.props.survey.governance
      }
    ]
    let surveyQuestionsComponents = surveyQuestions.map(function (surveyQuestion) {
      return (
        <Input key={surveyQuestion.ref} type='select' label={surveyQuestion.label} ref={surveyQuestion.ref}
          defaultValue={surveyQuestion.defaultValue} placeholder=''>
          <option value=''>Enter your response</option>
          <option value='5'>Excellent</option>
          <option value='4'>Good</option>
          <option value='3'>Adequate</option>
          <option value='2'>Insufficient</option>
          <option value='1'>Absent</option>
          <option value='0'>Unknown</option>
        </Input>
      )
    })
    return (
      <div className='survey-data'>
        <h3>Citizen Survey - Questions</h3>
        {/* label, ref, defaultValue */}
        {surveyQuestionsComponents}
        <br />
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Button bsStyle='info' onClick={this.props.previousStep} block>
              <span className='glyphicon glyphicon-circle-arrow-left'></span> Update Location
            </Button>
          </Col>
          <Col xs={6} sm={6} md={6} >
            <Button bsStyle='success' onClick={this.surveySubmit} block>
              Submit Form <span className='glyphicon glyphicon-circle-arrow-right'></span>
            </Button>
          </Col>
        </Row>
        <br />
        <br />
      </div>
    )
  }
}

export default CitizenSurveyForm
/*
  <label>1. How would you describe your level of access to adequate employment?</label>
  <br/>
  <Input className='radio-survey' type='radio' label=' Excellent' value='5' name='employment' />
  <Input className='radio-survey' type='radio' label=' Good' value='4' name='employment' />
  <Input className='radio-survey' type='radio' label=' Adequate' value='3' name='employment' />
  <Input className='radio-survey' type='radio' label=' Insufficient' value='2' name='employment' />
  <Input className='radio-survey' type='radio' label=' Absent' value='1' name='employment' /> */
