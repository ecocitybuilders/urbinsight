import React, { PropTypes } from 'react'
import { Button, Input, Row, Col } from 'react-bootstrap'

type Props = {
  submitSurvey: PropTypes.func.isRequired,
  previousStep: PropTypes.func,
  fieldValues: PropTypes.object,
  getValues: PropTypes.func,
  saveValues: PropTypes.func,
  formReset: PropTypes.func,
  nextStep: PropTypes.func
}

class CitizenSurveyForm extends React.Component {
  constructor () {
    super()
    this.submitForm = this.submitForm.bind(this)
    this.getData = this.getData.bind(this)
  }
  props: Props;
  getData () {
    let questions = ['employment', 'healthcare', 'family', 'stability',
                     'relationships', 'recreation', 'education', 'vacation',
                     'housing', 'environment', 'discrimination', 'religion',
                     'environment', 'discrimination', 'religion', 'mobility',
                     'movement', 'safety', 'governance']
    let questionValues = {}
    questions.forEach(function (question) {
      questionValues[question] = this.refs[question].getValue()
    }.bind(this))
    console.log(questionValues)
    return questionValues
  }
  submitForm (e) {
    e.preventDefault()
    let data = this.getData()
    this.props.saveValues(data)
    // Why do I save them and then call them again here
    let responses = this.props.getValues()
    this.props.submitSurvey(responses)
    this.props.nextStep(responses)
    // this.props.formReset()
  }

  render () {
    let surveyQuestions = [
      { label: '1. How would you describe your level of access to adequate employment?',
        ref: 'employment',
        defaultValue: this.props.fieldValues.employment
      },
      { label: '2. How would you describe your level of access to healthcare and health services?',
        ref: 'healthcare',
        defaultValue: this.props.fieldValues.healthcare
      },
      { label: '3. How would you describe your ability to provide care for family members as needed?',
        ref: 'family',
        defaultValue: this.props.fieldValues.family
      },
      { label: '4. How would you describe stability in your daily life?',
        ref: 'stability',
        defaultValue: this.props.fieldValues.stability
      },
      { label: '5. How do you describes your level of access to opportunities to develop healthy social relations?',
        ref: 'relationships',
        defaultValue: this.props.fieldValues.relationships
      },
      { label: '6. How do you descrive your level of access to recreational opportunities and activities?',
        ref: 'recreation',
        defaultValue: this.props.fieldValues.recreation
      },
      { label: '7. How would you describe your level of access to knowledge for futhering your education?',
        ref: 'education',
        defaultValue: this.props.fieldValues.education
      },
      { label: '8. How would you describe your level of vacation(time-off) time you have?',
        ref: 'vacation',
        defaultValue: this.props.fieldValues.vacation
      },
      { label: '9. How would you describe your shelter/housing?',
        ref: 'housing',
        defaultValue: this.props.fieldValues.housing
      },
      { label: '10. How do you describe your living environment? (this includes access to natural resources)',
        ref: 'environment',
        defaultValue: this.props.fieldValues.environment
      },
      { label: `11. How would you describe the level of respect and non-discrimination
          you experience in your daily life?`,
        ref: 'discrimination',
        defaultValue: this.props.fieldValues.discrimination
      },
      { label: '12. How would you describe your level of freedom to practice your religion?',
        ref: 'religion',
        defaultValue: this.props.fieldValues.religion
      },
      { label: '13. How would you describe your level of access to mobility?',
        ref: 'mobility',
        defaultValue: this.props.fieldValues.mobility
      },
      { label: '14. How do you describe your level of freedom of movement?',
        ref: 'movement',
        defaultValue: this.props.fieldValues.movement
      },
      { label: `15. How do you describe your level of safety and
        the absence of physical violence or criminality in your daily life?`,
        ref: 'safety',
        defaultValue: this.props.fieldValues.safety
      },
      { label: `16. How do you describe your ability to participate
        in your communitys political, governance-based and decision-making processes?`,
        ref: 'governance',
        defaultValue: this.props.fieldValues.governance
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
            <Button bsStyle='success' onClick={this.submitForm} block>
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
