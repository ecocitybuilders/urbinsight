import React from 'react'
import { Input } from 'react-bootstrap'

class MaterialsOptionB extends React.Component {
  render () {
    return (
      <div>
        <h3>Option B:</h3>
        <Input label='Total Weight (kg):' ref='totalWeight' type='number' />
        <table>
          <tbody>
            <tr>
              <th>Paper</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='usedPaper'>Used Paper</label></td>
              <td><Input type='number' ref='usedPaper' id='usedPaper' /></td>
              <td>Full toilet paper roll</td>
            </tr>
            <tr>
              <td><label htmlFor='officeSupplies'>Office Supplies</label></td>
              <td><Input type='number' ref='officeSupplies' id='officeSupplies' /></td>
              <td>Yellow Legal Pad</td>
            </tr>
            <tr>
              <td><label htmlFor='phonebook'>Phonebook</label></td>
              <td><Input type='number' ref='phonebook' id='phonebook' /></td>
              <td>Phonebook</td>
            </tr>
            <tr>
              <td><label htmlFor='newsprint'>Newsprint</label></td>
              <td><Input type='number' ref='newsprint' id='newsprint' /></td>
              <td>Newspaper</td>
            </tr>
            <tr>
              <td><label htmlFor='computerPaper'>Computer Paper</label></td>
              <td><Input type='number' ref='computerPaper' id='computerPaper' /></td>
              <td>Computer Paper</td>
            </tr>
            <tr>
              <td><label htmlFor='corrugatedCardboard'>Corrugated Cardboard</label></td>
              <td><Input type='number' ref='corrugatedCardboard' id='corrugatedCardboard' /></td>
              <td>Cardboard flattend, Loose</td>
            </tr>
            <tr>
              <td><label htmlFor='mixedWastePaper'>Mixed Waste Paper</label></td>
              <td><Input type='number' ref='mixedWastePaper' id='mixedWastePaper' /></td>
              <td>Mixed paper, Loose</td>
            </tr>
            <tr>
              <td><label htmlFor='nonRecyclablePaper'>Non-recyclable Paper</label></td>
              <td><Input type='number' ref='nonRecyclablePaper' id='nonRecyclablePaper' /></td>
              <td>Magazine, Loose</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table>
          <tbody>
            <tr>
              <th>Organics</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='starches'>Starches</label></td>
              <td><Input type='number' ref='starches' id='starches' /></td>
              <td>Break, Bulk</td>
            </tr>
            <tr>
              <td><label htmlFor='proteins'>Proteins</label></td>
              <td><Input type='number' ref='proteins' id='proteins' /></td>
              <td>
                Fish, Scraps<br/>
                Meat, Ground<br/>
                Oyster Shells, Whole<br/>
              </td>
            </tr>

            <tr>
              <td><label htmlFor='dairy'>Dairy</label></td>
              <td><Input type='number' ref='dairy' id='dairy' /></td>
              <td>
                Milk<br/>
                Cheese<br/>
                Butter<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='fats'>Fats</label></td>
              <td><Input type='number' ref='fats' id='fats' /></td>
              <td>
                Solid Fat<br/>
                Oil, Cooking<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='produce'>Produce</label></td>
              <td><Input type='number' ref='produce' id='produce' /></td>
              <td>
                Produce waste, mixed<br/>
                Food waste, as animal feed<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='otherOrganic'>Produce</label></td>
              <td><Input type='number' ref='otherOrganic' id='otherOrganic' /></td>
              <td>
                Food waste, as animal feed<br/>
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <table>
          <tbody>
            <tr>
              <th>Plastics</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='bottles'>Bottles</label></td>
              <td><Input type='number' ref='bottles' id='bottles' /></td>
              <td>
                PETE large bottles<br/>
                PETE small bottles<br/>
                HDPE bottles, unpigmented<br/>
                HDPE bottles, pigmented<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='film'>Film</label></td>
              <td><Input type='number' ref='film' id='film' /></td>
              <td>
                HDPE beverage case<br/>
                HDPE bread case<br/>
                HDPE gallon container<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='bags'>Bags</label></td>
              <td><Input type='number' ref='bags' id='bags' /></td>
              <td>
                Plastic bags (small)<br/>
                Garbage bags (large)<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='packaging'>Packaging</label></td>
              <td><Input type='number' ref='packaging' id='packaging'/></td>
              <td>
                Styrofoam kernels<br/>
                Polystyrene foam<br/>
                PET uncompacted<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='otherPlastics'>Other Plastics</label></td>
              <td><Input type='number' ref='otherPlastics' id='otherPlastics' /></td>
              <td>Other plastics</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <table>
          <tbody>
            <tr>
              <th>Textiles</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td>Clothes</td>
            </tr>
            <tr>
              <td><label htmlFor='sweaters'>Wool Sweaters</label></td>
              <td><Input type='number' ref='sweaters' id='sweaters' /></td>
              <td>Wool Sweaters</td>
            </tr>
            <tr>
              <td><label htmlFor='shirts'>Shirts</label></td>
              <td><Input type='number' ref='shirts' id='shirts' /></td>
              <td>Shirts</td>
            </tr>
            <tr>
              <td><label htmlFor='pants'>Pants</label></td>
              <td><Input type='number' ref='pants' id='pants' /></td>
              <td>Pants</td>
            </tr>
            <tr>
              <td><label htmlFor='socks'>Socks</label></td>
              <td><Input type='number' ref='socks' id='socks' /></td>
              <td>Socks</td>
            </tr>
            <tr>
              <td>Shoes</td>
            </tr>
            <tr>
              <td><label htmlFor='leatherShoes'>Leather Pair</label></td>
              <td><Input type='number' ref='leatherShoes' id='leatherShoes' /></td>
              <td>Leather pair</td>
            </tr>
            <tr>
              <td><label htmlFor='canvasShoes'>Canvas Pair</label></td>
              <td><Input type='number' ref='canvasShoes' id='canvasShoes' /></td>
              <td>Canvas pair</td>
            </tr>
            <tr>
              <td>Linens</td>
            </tr>
            <tr>
              <td><label htmlFor='towels'>Bath Towels</label></td>
              <td><Input type='number' ref='towels' id='towels' /></td>
              <td>Bath Towels</td>
            </tr>
            <tr>
              <td><label htmlFor='sheets'>Sheets</label></td>
              <td><Input type='number' ref='sheets' id='sheets' /></td>
              <td>Sheets</td>
            </tr>

            <tr>
              <td><label htmlFor='tablecloths'>Tablecloths</label></td>
              <td><Input type='number' ref='tablecloths' id='tablecloths' /></td>
              <td>Tablecloths</td>
            </tr>
            <tr>
              <td><label htmlFor='carpet'>Carpet</label></td>
              <td><Input type='number' ref='carpet' id='carpet' /></td>
              <td>Carpet</td>
            </tr>
            <tr>
              <td><label htmlFor='canvas'>Canvas</label></td>
              <td><Input type='number' ref='canvas' id='canvas' /></td>
              <td>Canvas</td>
            </tr>
            <tr>
              <td>Mixed Clothing</td>
            </tr>
            <tr>
              <td><label htmlFor='looseClothing'>Loose</label></td>
              <td><Input type='number' ref='looseClothing' id='looseClothing' /></td>
              <td>Clothing, mixed loose</td>
            </tr>
            <tr>
              <td><label htmlFor='compactClothing'>Compacted</label></td>
              <td><Input type='number' ref='compactClothing' id='compactClothing' /></td>
              <td>Clothing, mixed compacted</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <table>
          <tbody>
            <tr>
              <th>Metals</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='steelCans'>Tin Coated Steel Cans</label></td>
              <td><Input type='number' ref='steelCans' id='steelCans' /></td>
              <td>Tin Coated Steel Cans</td>
            </tr>
            <tr>
              <td><label htmlFor='ferrousCans'>Tin Cans, ferrous</label> </td>
              <td><Input type='number' ref='ferrousCans' id='ferrousCans' /></td>
              <td>Tin Coated, ferrous</td>
            </tr>
            <tr>
              <td><label htmlFor='petFood'>Pet Food Tin Can, ferrous</label></td>
              <td><Input type='number' ref='petFood' id='petFood' /></td>
              <td>Pet Food Tin Can, ferrous</td>
            </tr>
            <tr>
              <td><label htmlFor='aluminumCans'>Aluminum Cans (whole)</label></td>
              <td><Input type='number' ref='aluminumCans' id='aluminumCans' /></td>
              <td>Aluminum Cans (whole)</td>
            </tr>
            <tr>
              <td><label htmlFor='oilFilters'>Used Oil Filters</label></td>
              <td><Input type='number' ref='oilFilters' id='oilFilters' /></td>
              <td>Used Oil Filters</td>
            </tr>
            <tr>
              <td><label htmlFor='radiator'>Radiator, ferrous (19 Liters)</label></td>
              <td><Input type='number' ref='radiator' id='radiator' /></td>
              <td>Radiator, ferrous</td>
            </tr>
            <tr>
              <td><label htmlFor='aluminumFoil'>Aluminum Foil</label></td>
              <td><Input type='number' ref='aluminumFoil' id='aluminumFoil' /></td>
              <td>Aluminum Foil</td>
            </tr>
            <tr>
              <td><label htmlFor='compositeMetal'>Remainder/Composite Metal</label></td>
              <td><Input type='number' ref='compositeMetal' id='compositeMetal' /></td>
              <td>Remainder/Composite Metal</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <table>
          <tbody>
            <tr>
              <th>Glass</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='bottles'>Bottles</label></td>
              <td><Input type='number' ref='bottles' id='bottles' /></td>
              <td>
                Standard Bottles<br/>
                Larger Bottles<br/>
                Jugs<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='windows'>Window Glass</label></td>
              <td><Input type='number' ref='windows' id='windows' /></td>
              <td>Window Glass (2.4 mm thick)</td>
            </tr>
            <tr>
              <td><label htmlFor='mixedGlass'>Mixed Glass</label></td>
              <td><Input type='number' ref='mixedGlass' id='mixedGlass' /></td>
              <td>Composite or Broken Glass</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <table>
          <tbody>
            <tr>
              <th>Trimmings</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='yardTrimming'>Yard Trimming, mixed</label></td>
              <td><Input type='number' ref='yardTrimming' id='yardTrimming' /></td>
              <td>Yard Trimming, mixed</td>
            </tr>
            <tr>
              <td><label htmlFor='grassClipping'>Grass Clipping</label></td>
              <td><Input type='number' ref='grassClipping' id='grassClipping' /></td>
              <td>Grass Clippings</td>
            </tr>
            <tr>
              <td><label htmlFor='leaves'>Leaves</label></td>
              <td><Input type='number' ref='leaves' id='leaves' /></td>
              <td>Leaves</td>
            </tr>
            <tr>
              <td><label htmlFor='largeLimbs'>Large Limbs and Stumps</label></td>
              <td><Input type='number' ref='largeLimbs' id='largeLimbs' /></td>
              <td>Large Limbs and Stumps</td>
            </tr>
            <tr>
              <td><label htmlFor='dryPrunings'>Prunings, dry</label></td>
              <td><Input type='number' ref='dryPrunings' id='dryPrunings' /></td>
              <td>Prunings, dry</td>
            </tr>
            <tr>
              <td><label htmlFor='greenPrunings'>Prunings, green</label></td>
              <td><Input type='number' ref='greenPrunings' id='greenPrunings' /></td>
              <td>Prunings, green</td>
            </tr>
            <tr>
              <td><label htmlFor='baledStraw'>Hay/Straw, baled</label></td>
              <td><Input type='number' ref='baledStraw' id='baledStraw' /></td>
              <td>Hay/Straw, baled</td>
            </tr>
            <tr>
              <td><label htmlFor='looseStraw'>Hay/Straw, loose</label></td>
              <td><Input type='number' ref='looseStraw' id='looseStraw' /></td>
              <td>Hay/Straw, loose</td>
            </tr>
            <tr>
              <td><label htmlFor='compost'>Compost</label></td>
              <td><Input type='number' ref='compost' id='compost' /></td>
              <td>Compost</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <table>
          <tbody>
            <tr>
              <th>Appliances</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='majorAppliances'>Major Appliances</label></td>
              <td><Input type='number' ref='majorAppliances' id='majorAppliances' /></td>
              <td>
                Air Conditioner<br/>
                Microwave<br/>
                Water Heater<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='lighting'>Lighting</label></td>
              <td><Input type='number' ref='lighting' id='incandescentBulbs' /></td>
              <td>
                Incandescent Bulbs<br/>
                Fluorescent Bulbs<br/>
              </td>
            </tr>
            <tr>
              <td><label htmlFor='otherAppliances'>Miscellaneous Appliances</label></td>
              <td><Input type='number' ref='otherAppliances' id='otherAppliances' /></td>
              <td>Other Appliances</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <table>
          <tbody>
            <tr>
              <th>Hazardous Waste</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='paints'>Paints</label></td>
              <td><Input type='number' ref='paints' id='paints' /></td>
              <td>Paints</td>
            </tr>
            <tr>
              <td><label htmlFor='antifreeze'>Antifreeze</label></td>
              <td><Input type='number' ref='antifreeze' id='antifreeze' /></td>
              <td>Antifreeze</td>
            </tr>
            <tr>
              <td><label htmlFor='usedMotorOil'>Used Motor Oil</label></td>
              <td><Input type='number' ref='usedMotorOil' id='usedMotorOil' /></td>
              <td>Used Motor Oil</td>
            </tr>
            <tr>
              <td><label htmlFor='motorVehicleBatteries'>Motor Vehicle Batteries</label></td>
              <td><Input type='number' ref='motorVehicleBatteries' id='motorVehicleBatteries' /></td>
              <td>Motor Vehicle Batteries</td>
            </tr>
            <tr>
              <td><label htmlFor='tires'>Tire, passenger car</label></td>
              <td><Input type='number' ref='tires' id='tires' /></td>
              <td>Tire, Passenger Car</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <table>
          <tbody>
            <tr>
              <th>Inerts and Others</th>
              <th>Amount</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='concrete'>Concrete</label></td>
              <td><Input type='number' ref='concrete' id='concrete' /></td>
              <td>Concrete</td>
            </tr>
            <tr>
              <td><label htmlFor='asphaltPaving'>Asphalt Paving</label></td>
              <td><Input type='number' ref='asphaltPaving' id='asphaltPaving' /></td>
              <td>Asphalt Paving</td>
            </tr>
            <tr>
              <td><label htmlFor='asphaltRoofing'>Asphalt Roofing</label></td>
              <td><Input type='number' ref='asphaltRoofing' id='asphaltRoofing' /></td>
              <td>Asphalt Roofing</td>
            </tr>
            <tr>
              <td><label htmlFor='brick'>Brick</label></td>
              <td><Input type='number' ref='brick' id='brick' /></td>
              <td>Brick</td>
            </tr>
            <tr>
              <td><label htmlFor='fiberglassInsulation'>Fiberglass Insulation</label></td>
              <td><Input type='number' ref='fiberglassInsulation' id='fiberglassInsulation' /></td>
              <td>Fiberglass Insulation</td>
            </tr>
            <tr>
              <td><label htmlFor='gypsum'>Gypsum Board</label></td>
              <td><Input type='number' ref='gypsum' id='gypsum' /></td>
              <td>Gypsum Board</td>
            </tr>
            <tr>
              <td><label htmlFor='woodAshes'>Wood Ashes</label></td>
              <td><Input type='number' ref='woodAshes' id='woodAshes' /></td>
              <td>Wood Ashes</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MaterialsOptionB
