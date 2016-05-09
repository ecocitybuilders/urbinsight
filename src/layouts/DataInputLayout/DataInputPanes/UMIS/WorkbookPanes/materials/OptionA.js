import React from 'react'
import { Input } from 'react-bootstrap'

class MaterialsOptionA extends React.Component {
  render () {
    let materials = [
      {
        name: 'paper',
        label: 'Paper'
      },
      {
        name: 'organics',
        label: 'Organics'
      },
      {
        name: 'plastics',
        label: 'Plastics'
      },
      {
        name: 'textiles',
        label: 'Textiles'
      },
      {
        name: 'metal',
        label: 'Metal'
      },
      {
        name: 'glass',
        label: 'Glass'
      },
      {
        name: 'trimmings',
        label: 'Trimmings'
      },
      {
        name: 'appliances',
        label: 'Appliances'
      },
      {
        name: 'hazardousWaste',
        label: 'Hazardous Waste'
      },
      {
        name: 'inertsAndOthers',
        label: 'Inerts and Others'
      }
    ]
    let materialsList = materials.map(function (material, key) {
      return (
        <tr key={key}>
          <td><label htmlFor={material.name}>{material.label}</label></td>
          <td><Input type='number' ref={material.name} id={material.name} /></td>
        </tr>
      )
    })
    return (
      <div>
        <h3>Option A:</h3>
        <Input label='Total Weight (kg):' ref='totalWeight' type='number' />
        <table>
          <tbody>
            <tr>
              <th>Category</th>
              <th>%</th>
            </tr>
            {materialsList}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MaterialsOptionA
