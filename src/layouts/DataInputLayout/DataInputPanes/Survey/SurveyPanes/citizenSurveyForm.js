import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { Input } from 'react-bootstrap'

type Props = {
  submitSurvey: PropTypes.func.isRequired,
  previousStep: PropTypes.func,
  fieldValues: PropTypes.object,
  getValues: PropTypes.func,
  saveValues: PropTypes.func,
  formReset: PropTypes.func
}

class CitizenSurveyForm extends React.Component {
  constructor () {
    super()
    this.submitForm = this.submitForm.bind(this)
    this.previousStep = this.previousStep.bind(this)
  }
  props: Props;
  submitForm (e) {
    e.preventDefault()
    let data = {
      employment: this.refs.employment.getValue(),
      healthcare: this.refs.healthcare.getValue(),
      family: this.refs.family.getValue(),
      stability: this.refs.stability.getValue(),
      relationships: this.refs.relationships.getValue(),
      recreation: this.refs.recreation.getValue(),
      education: this.refs.education.getValue(),
      vacation: this.refs.vacation.getValue(),
      housing: this.refs.housing.getValue(),
      environment: this.refs.environment.getValue(),
      discrimination: this.refs.discrimination.getValue(),
      religion: this.refs.religion.getValue(),
      mobility: this.refs.mobility.getValue(),
      movement: this.refs.movement.getValue(),
      safety: this.refs.safety.getValue(),
      governance: this.refs.governance.getValue()
    }
    this.props.saveValues(data)
    // Why do I save them and then call them again here
    let responses = this.props.getValues()
    this.props.submitSurvey(responses)
    this.props.formReset()
  }

  previousStep (e) {
    e.preventDefault()
    let data = {
      employment: this.refs.employment.getValue(),
      healthcare: this.refs.healthcare.getValue(),
      family: this.refs.family.getValue(),
      stability: this.refs.stability.getValue(),
      relationships: this.refs.relationships.getValue(),
      recreation: this.refs.recreation.getValue(),
      education: this.refs.education.getValue(),
      vacation: this.refs.vacation.getValue(),
      housing: this.refs.housing.getValue(),
      environment: this.refs.environment.getValue(),
      discrimination: this.refs.discrimination.getValue(),
      religion: this.refs.religion.getValue(),
      mobility: this.refs.mobility.getValue(),
      movement: this.refs.movement.getValue(),
      safety: this.refs.safety.getValue(),
      governance: this.refs.governance.getValue()
    }
    this.props.saveValues(data)
    this.props.previousStep()
  }
  render () {
    return (
      <div>

        <form id='surveyForm'>
          <Input type='select' label='1. How would you describe your level of access
             to adequate employment?'
            ref='employment'
            defaultValue={this.props.fieldValues.employment}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='2. How would you describe your level of access
             to healthcare and health services?'
            ref='healthcare'
            defaultValue={this.props.fieldValues.healthcare}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='3. How would you describe your ability to provide
            care for family members as needed?'
            ref='family'
            defaultValue={this.props.fieldValues.family}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='4. How would you describe stability in your daily life?'
            ref='stability'
            defaultValue={this.props.fieldValues.stability}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='5. How do you describes your level of access to
             opportunities to develop healthy social relations?'
            ref='relationships'
            defaultValue={this.props.fieldValues.relationships}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='6. How do you descrive your level of access to
             recreational opportunities and activities?'
            ref='recreation'
            defaultValue={this.props.fieldValues.recreation}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='7. How would you describe your level of access to
             knowledge for futhering your education?'
            ref='education'
            defaultValue={this.props.fieldValues.education}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='8. How would you describe your level of vacation(time-off)
             time you have?'
            ref='vacation'
            defaultValue={this.props.fieldValues.vacation}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='9. How would you describe your shelter/housing?'
            ref='housing'
            defaultValue={this.props.fieldValues.housing}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='10. How do you describe your living environment?
             (this includes access to natural resources)'
            ref='environment'
            defaultValue={this.props.fieldValues.environment}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='11. How would you describe the level of respect
             and non-discrimination you experience in your daily life?'
            ref='discrimination'
            defaultValue={this.props.fieldValues.discrimination}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='12. How would you describe your level of freedom
             to practice your religion?'
            ref='religion'
            defaultValue={this.props.fieldValues.religion} placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='13. How would you describe your level of access to mobility?'
            ref='mobility'
            defaultValue={this.props.fieldValues.mobility}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='14. How do you describe your level of freedom of
             movement?'
            ref='movement'
            defaultValue={this.props.fieldValues.movement}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='15. How do you describe your level of safety and
            the absence of physical violence or criminality in your daily life?'
            ref='safety'
            defaultValue={this.props.fieldValues.safety}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <Input type='select' label='16. How do you describe your ability to participate
            in your communitys political, governance-based and decision-making processes?'
            ref='governance'
            defaultValue={this.props.fieldValues.governance}
            placeholder=''>
            <option value=''>Enter your response</option>
            <option value='5'>Excellent</option>
            <option value='4'>Good</option>
            <option value='3'>Adequate</option>
            <option value='2'>Insufficient</option>
            <option value='1'>Absent</option>
            <option value='0'>Unknown</option>
          </Input>
          <div style={{'textAlign': 'center', 'margin': '0 auto', 'width': '30vw'}}>
            {/* <ButtonGroup justified>*/}
            <Button bsStyle='danger' onClick={this.previousStep}>Update Location</Button>
            <Button bsStyle='success' onClick={this.submitForm}>Submit Form</Button>
            {/* </ButtonGroup>*/}
          </div>
        </form>
      </div>
    )
  }
}

export default CitizenSurveyForm

/* <form className='form-inline' id='surveyForm' >
  <label>1. How would you describe your level of access to adequate employment?</label>
  <br/>
  <Input className='radio-survey' type='radio' label=' Excellent' value='5' name='employment' />
  <Input className='radio-survey' type='radio' label=' Good' value='4' name='employment' />
  <Input className='radio-survey' type='radio' label=' Adequate' value='3' name='employment' />
  <Input className='radio-survey' type='radio' label=' Insufficient' value='2' name='employment' />
  <Input className='radio-survey' type='radio' label=' Absent' value='1' name='employment' />

  <label>2. How would you describe your level of access to healthcare and health services?</label>
  <br/>
  <Input className='radio-survey' type='radio' label=' Excellent' value='5' name='health' />
  <Input className='radio-survey' type='radio' label=' Good' value='4' name='health' />
  <Input className='radio-survey' type='radio' label=' Adequate' value='3' name='health' />
  <Input className='radio-survey' type='radio' label=' Insufficient' value='2' name='health' />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="health" />

  <label>3. How would you describe your ability to provide care for family members as needed?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="family" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="family" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="family" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="family" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="family" />

  <label>4. How would you describe stability in your daily life?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="stability" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="stability" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="stability" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="stability" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="stability" />

  <label>5. How do you describes your level of access to opportunities to develop
   healthy social relations?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="relations" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="relations" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="relations" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="relations" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="relations" />

  <label>6. How do you descrive your level of access to recreational opportunities and activities?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="recreational" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="recreational" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="recreational" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="recreational" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="recreational" />

  <label>7. How would you describe your level of access to knowledge for futhering your education?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="education" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="education" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="education" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="education" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="education" />

  <label>8. How would you describe your level of vacation(time-off) time you have?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="vacation" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="vacation" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="vacation" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="vacation" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="vacation" />
  <br/>
  <label>9. How would you describe your shelter/housing?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="housing" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="housing" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="housing" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="housing" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="housing" />

  <label>10. How do you describe your living environment? (this includes access to natural resources)</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="environment" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="environment" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="environment" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="environment" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="environment" />

  <label>11. How would you describe the level of respect and non-discrimination
   you experience in your daily life?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="discrimination" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="discrimination" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="discrimination" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="discrimination" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="discrimination" />

  <label>12. How would you describe your level of freedom to practice your religion?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="religion" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="religion" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="religion" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="religion" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="religion" />

  <label>13. How would you describe your level of access to mobility?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="mobility" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="mobility" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="mobility" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="mobility" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="mobility" />

  <label>14. How do you describe your level of freedom of movement?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="movement" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="movement" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="movement" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="movement" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="movement" />

  <label>15. How do you describe your level of safety in your daily life?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="violence" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="violence" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="violence" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="violence" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="violence" />

  <label>16. How do you describe your ability to participate in your community's
   decision-making processes?</label>
  <br/>
  <Input className="radio-survey" type="radio" label=" Excellent" value="5" name="governance" />
  <Input className="radio-survey" type="radio" label=" Good" value="4" name="governance" />
  <Input className="radio-survey" type="radio" label=" Adequate" value="3" name="governance" />
  <Input className="radio-survey" type="radio" label=" Insufficient" value="2" name="governance" />
  <Input className="radio-survey" type="radio" label=" Absent" value="1" name="governance" />

  <ButtonToolbar>
    <Button bsStyle="danger" onClick={this.handleClick.bind(this, 'LOCATION')}>Update Location</Button>
    <Button bsStyle="success" onClick={this.submitForm.bind(this)}>Submit Form</Button>
  </ButtonToolbar>
</form>*/
