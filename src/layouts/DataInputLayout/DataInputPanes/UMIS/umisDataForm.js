import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { auditSave, persistFeature } from 'redux/modules/audit'
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
  map: PropTypes.obj,
  isFetching: PropTypes.bool
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
    this.formReset = this.formReset.bind(this)
    this.updateGeoValues = this.updateGeoValues.bind(this)
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
  // NEED A MORE ROBUST FORM RESET
  formReset () {
    this.setState({
      active: 1
    })
  }

  saveValues (fields) {
    // Dispatch Audit Fields Save
  }

  updateGeoValues (lat, lon) {
    this.setState({geoCoordinates: [lon, lat]})
    // Update the geoCoordinates
    // Does this make sense as a dispatch?
  }

  render () {
    const { auditSubmit, persistFeatureGeoJSON, map, isFetching } = this.props
    switch (this.state.active) {
      case 1:
        return <UMISIntro nextStep={this.nextStep} />
      case 2:
        return <UMISParcelLocation
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          map={map}
          lat={this.state.geoCoordinates[1]}
          lon={this.state.geoCoordinates[0]}
          saveValues={this.saveValues}
          updateGeoValues={this.updateGeoValues}
          formReset={this.formReset}
          persistFeatureGeoJSON={persistFeatureGeoJSON}
          />
      case 3:
        return <UMISSourceInformation previousStep={this.previousStep} nextStep={this.nextStep} />
      case 4:
        return <UMISDescribeParcel previousStep={this.previousStep} nextStep={this.nextStep} />
      case 5:
        return <UMISBuildingData previousStep={this.previousStep} nextStep={this.nextStep} />
      case 6:
        return <UMISDemographics previousStep={this.previousStep} nextStep={this.nextStep} />
      case 7:
        return <UMISWorkbookContainer
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          isFetching={isFetching}
          auditSubmit={auditSubmit}/>
      case 8:
        return <UMISComplete previousStep={this.previousStep} formReset={this.formReset} />
    }
  }
}

const mapStateToProps = (state) => {
  const { audit } = state
  const { auditResponses, isFetching } = audit
  return {
    auditResponses,
    isFetching
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    auditSubmit: (responses) => {
      dispatch(auditSave(responses))
    },
    persistFeatureGeoJSON: (feature) => {
      dispatch(persistFeature(feature))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UmisDataForm)
