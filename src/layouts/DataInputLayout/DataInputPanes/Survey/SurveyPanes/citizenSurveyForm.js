import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { Input } from 'react-bootstrap'

class CitizenSurveyForm extends React.Component {
  static propTypes = {
    formReset: PropTypes.func.isRequired,
    previousStep: PropTypes.func
  };
  submitForm () {
    console.log('yay form submit')
  }
  render () {
    return (
      <div>
        {/* <form className='form-inline' id='surveyForm' >
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
      </form>*/}
        <form id='surveyForm'>
          <Input type='select' label='1. How would you describe your level of access
             to adequate employment?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='2. How would you describe your level of access
             to healthcare and health services?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='3. How would you describe your ability to provide
             care for family members as needed?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='4. How would you describe stability in your daily life?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='5. How do you describes your level of access to
             opportunities to develop healthy social relations?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='6. How do you descrive your level of access to
             recreational opportunities and activities?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='7. How would you describe your level of access to
             knowledge for futhering your education?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='8. How would you describe your level of vacation(time-off)
             time you have?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='9. How would you describe your shelter/housing?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='10. How do you describe your living environment?
             (this includes access to natural resources)' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='11. How would you describe the level of respect
             and non-discrimination you experience in your daily life?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='12. How would you describe your level of freedom
             to practice your religion?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='13. How would you describe your level of access to mobility?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='14. How do you describe your level of freedom of
             movement?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='15. How do you describe your level of safety and
            the absence of physical violence or criminality in your daily life?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <Input type='select' label='16. How do you describe your ability to participate
            in your communitys political, governance-based and decision-making processes?' placeholder=''>
            <option value=''>Enter your response</option>
            <option value='excellent'>Excellent</option>
            <option value='good'>Good</option>
            <option value='adequate'>Adequate</option>
            <option value='insufficient'>Insufficient</option>
            <option value='absent'>Absent</option>
            <option value='unknown'>Unknown</option>
          </Input>
          <div style={{'textAlign': 'center', 'margin': '0 auto', 'width': '30vw'}}>
            {/* <ButtonGroup justified>*/}
            <Button bsStyle='danger' onClick={this.props.previousStep}>Update Location</Button>
            <Button bsStyle='success' onClick={this.props.formReset}>Submit Form</Button>
            {/* </ButtonGroup>*/}
          </div>
        </form>
      </div>
    )
  }
}

export default CitizenSurveyForm
