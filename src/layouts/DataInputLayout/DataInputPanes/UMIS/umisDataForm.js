import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { auditSave, persistFeature, saveAuditForm, resetAuditForm, saveAuditWorkbook } from 'redux/modules/audit'
import UMISIntro from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisDataIntro'
import UMISParcelLocation from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisParcelLocation'
import UMISSourceInformation from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisSourceInformation'
import UMISDescribeParcel from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisDescribeParcel'
import UMISBuildingData from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisBuildingData'
import UMISDemographics from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisDemographics'
import UMISWorkbookContainer from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisWorkbookContainer'
import UMISComplete from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisComplete'

type Props = {
  dispatch: PropTypes.func.isRequired,
  auditSubmit: PropTypes.func,
  persistFeatureGeoJSON: PropTypes.func,
  auditFormSave: PropTypes.func,
  auditFormReset: PropTypes.func,
  auditWorkbookSave: PropTypes.func,
  map: PropTypes.object,
  audit_form: PropTypes.object,
  isFetching: PropTypes.bool,
  feature: PropTypes.object,
  inputOpened: PropTypes.bool,
  audits: PropTypes.object,
  activeInput: PropTypes.string
}
let cityObj = {
  'lima': 'id_lote',
  'budapest': 'id',
  'cusco': 'gid',
  'abudhabi': 'plotid',
  'medellin': 'cobama'
}
class UmisDataForm extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      active: 1,
      geoCoordinates: [null, null]
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.saveValues = this.saveValues.bind(this)
    this.saveWorkbookValues = this.saveWorkbookValues.bind(this)
    this.formReset = this.formReset.bind(this)
  }

  nextStep () {
    this.setState({
      active: this.state.active + 1
    })
  }

  previousStep () {
    this.setState({
      active: this.state.active - 1
    })
  }
  formReset () {
    this.props.auditFormReset()
    this.setState({
      active: 1,
      geoCoordinates: [null, null]
    })
  }

  saveValues (fields) {
    // Dispatch Audit Fields Save
    this.props.auditFormSave(fields)
  }
  saveWorkbookValues (workbook) {
    this.props.auditWorkbookSave(workbook)
  }
  componentDidMount () {
    let city = window.location.pathname.slice(1)
    let cityTag = cityObj[city]
    this.setState({
      cityTag: cityTag
    })
  }

  render () {
    const { auditSubmit, persistFeatureGeoJSON, map, isFetching, audit_form, feature } = this.props
    switch (this.state.active) {
      case 1:
        return <UMISIntro nextStep={this.nextStep} />
      case 2:
        return <UMISParcelLocation
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          map={map}
          cityTag={this.state.cityTag}
          saveValues={this.saveValues}
          formReset={this.formReset}
          audit={audit_form}
          persistFeatureGeoJSON={persistFeatureGeoJSON}
          inputOpened={this.props.inputOpened}
          // I pass audits here which probably isn't they way..possibly send dispatch
          audits={this.props.audits}
          activeInput={this.props.activeInput}
          />
      case 3:
        return <UMISSourceInformation
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          saveValues={this.saveValues}
          audit={audit_form}/>
      case 4:
        return <UMISDescribeParcel
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          saveValues={this.saveValues}
          audit={audit_form}/>
      case 5:
        return <UMISBuildingData
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          saveValues={this.saveValues}
          audit={audit_form}/>
      case 6:
        return <UMISDemographics
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          saveValues={this.saveValues}
          audit={audit_form}/>
      case 7:
        return <UMISWorkbookContainer
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          isFetching={isFetching}
          auditSubmit={auditSubmit}
          saveValues={this.saveWorkbookValues}
          audit={audit_form}
          feature={feature}
          map={map}/>
      case 8:
        return <UMISComplete
          previousStep={this.previousStep}
          formReset={this.formReset}
          map={map}
          cityTag={this.state.cityTag}/>
    }
  }
}

const mapStateToProps = (state) => {
  const { audit } = state
  const { auditResponses, isFetching, feature, audit_form } = audit
  return {
    auditResponses,
    isFetching,
    feature,
    audit_form
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    auditSubmit: (responses) => {
      dispatch(auditSave(responses))
    },
    persistFeatureGeoJSON: (feature) => {
      dispatch(persistFeature(feature))
    },
    auditFormSave: (responses) => {
      dispatch(saveAuditForm(responses))
    },
    auditFormReset: () => {
      dispatch(resetAuditForm())
    },
    auditWorkbookSave: (workbook) => {
      dispatch(saveAuditWorkbook(workbook))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UmisDataForm)
