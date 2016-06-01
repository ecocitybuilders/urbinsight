import React, { PropTypes } from 'react'
import MaterialsOptionA from './OptionA'
import MaterialsOptionB from './OptionB'
import MaterialsOptionC from './OptionC'

type Props = {
  optionSelected: PropTypes.string
}

class MaterialsWorkbookContainer extends React.Component {
  props: Props;
  render () {
    const { optionSelected } = this.props
    switch (optionSelected) {
      case 'A':
        return (<MaterialsOptionA ref='A'/>)
      case 'B':
        return (<MaterialsOptionB ref='B'/>)
      case 'C':
        return (<MaterialsOptionC ref='C'/>)
    }
  }
}

export default MaterialsWorkbookContainer
