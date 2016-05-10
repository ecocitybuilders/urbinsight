import React from 'react'
import { Input } from 'react-bootstrap'

class MaterialsOptionC extends React.Component {
  render () {
    return (
      <div>
        <h3>Option C:</h3>
        <h4>All Values End Up be calculated as weight or Volume</h4>
        <table>
          <tbody>
            <tr>
              <th>Paper</th>
              <th>Unit Quantity</th>
              <th>Types</th>
            </tr>
            <tr>
              <td><label htmlFor='usedPaper'>Used Paper</label></td>
              <td><Input type='number' ref='usedPaper' id='usedPaper' /></td>
              <td>Full toilet paper roll (0.2 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='officeSupplies'>Office Supplies</label></td>
              <td><Input type='number' ref='officeSupplies' id='officeSupplies' /></td>
              <td>Yellow Legal Pad (0.2 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='phonebook'>Phonebook</label></td>
              <td><Input type='number' ref='phonebook' id='phonebook' /></td>
              <td>Phonebook (1.8 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='newsprint'>Newsprint</label></td>
              <td><Input type='number' ref='newsprint' id='newsprint' /></td>
              <td>Newspaper (0.6 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='computerPaper'>Computer Paper</label></td>
              <td><Input type='number' ref='computerPaper' id='computerPaper' /></td>
              <td>Computer Paper (0.4 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='corrugatedCardboard'>Corrugated Cardboard</label></td>
              <td><Input type='number' ref='corrugatedCardboard' id='corrugatedCardboard' /></td>
              <td>Cardboard flattend, Loose (0.03 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='mixedWastePaper'>Mixed Waste Paper</label></td>
              <td><Input type='number' ref='mixedWastePaper' id='mixedWastePaper' /></td>
              <td>Mixed paper, Loose (0.2 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='nonRecyclablePaper'>Non-recyclable Paper</label></td>
              <td><Input type='number' ref='nonRecyclablePaper' id='nonRecyclablePaper' /></td>
              <td>Magazine, Loose (0.6 kg/cubic dm)</td>
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
              <td><label htmlFor='bread'>Bread</label></td>
              <td><Input type='number' ref='bread' id='bread' /></td>
              <td>Break, Bulk (0.3 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='fish'>Fish</label></td>
              <td><Input type='number' ref='fish' id='fish' /></td>
              <td>Fish, Scraps (0.7 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='meat'>Meat</label></td>
              <td><Input type='number' ref='meat' id='meat' /></td>
              <td>Meat, Ground (0.8 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='shells'>Oyster Shells</label></td>
              <td><Input type='number' ref='shells' id='shells' /></td>
              <td>Oyster Shells, Whole (1.2 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='milk'>Milk</label></td>
              <td><Input type='number' ref='milk' id='milk' /></td>
              <td>Milk (1.0 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='cheese'>Cheese</label></td>
              <td><Input type='number' ref='cheese' id='cheese' /></td>
              <td>Cheese (0.5 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='butter'>Butter</label></td>
              <td><Input type='number' ref='butter' id='butter' /></td>
              <td>Butter (1.0 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='solidFat'>Solid Fat</label></td>
              <td><Input type='number' ref='solidFat' id='solidFat' /></td>
              <td>Solid Fat (0.4 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='oil'>Oil, Cooking</label></td>
              <td><Input type='number' ref='oil' id='oil' /></td>
              <td>Oil, Cooking (0.9 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='produceWaste'>Produce Waste</label></td>
              <td><Input type='number' ref='produceWaste' id='produceWaste' /></td>
              <td>Produce waste, mixed (0.9 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='foodWaste'>Food Waste</label></td>
              <td><Input type='number' ref='foodWaste' id='foodWaste' /></td>
              <td>Food waste, as animal feed (0.6 kg/cubic dm)</td>
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
              <td><label htmlFor='largeBottles'>PETE large bottles</label></td>
              <td><Input type='number' ref='largeBottles' id='largeBottles' /></td>
              <td>PETE large bottles (0.05 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='smallBottles'>PETE small bottles</label></td>
              <td><Input type='number' ref='smallBottles' id='smallBottles' /></td>
              <td>PETE small bottles (0.02 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='unpigmented'>HDPE bottles, unpigmented</label></td>
              <td><Input type='number' ref='unpigmented' id='unpigmented' /></td>
              <td>HDPE bottles, unpigmented (0.02 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='pigmented'>HDPE bottles, pigmented</label></td>
              <td><Input type='number' ref='pigmented' id='pigmented' /></td>
              <td>HDPE bottles, pigmented (0.03 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='beverageCase'>HDPE beverage case</label></td>
              <td><Input type='number' ref='beverageCase' id='beverageCase' /></td>
              <td>HDPE beverage case (0.54 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='breadCase'>HDPE bread case</label></td>
              <td><Input type='number' ref='breadCase' id='breadCase' /></td>
              <td>HDPE bread case (0.68 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='gallonContainer'>HDPE gallon container</label></td>
              <td><Input type='number' ref='gallonContainer' id='gallonContainer' /></td>
              <td>HDPE Gallon Container (0.03 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='smallBags'>Plastic bags</label></td>
              <td><Input type='number' ref='smallBags' id='smallBags' /></td>
              <td>Small Plastic Bags (0.01 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='largeBags'>Plastic bags</label></td>
              <td><Input type='number' ref='largeBags' id='largeBags' /></td>
              <td>Large Plastic Bags (0.11 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='styrofoam'>Styrofoam Kernels</label></td>
              <td><Input type='number' ref='styrofoam' id='styrofoam' /></td>
              <td>Styrofoam kernels (0.004 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='polystyrene'>Polystyrene Foam</label></td>
              <td><Input type='number' ref='polystyrene' id='polystyrene' /></td>
              <td>Polystyrene foam (0.01 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='pet'>PET uncompacted</label></td>
              <td><Input type='number' ref='pet' id='pet' /></td>
              <td>PET uncompacted (0.02 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='otherPlastics'>Other plastics</label></td>
              <td><Input type='number' ref='otherPlastics' id='otherPlastics' /></td>
              <td>Other Plastics</td>
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
              <td><label htmlFor='sweaters'>Wool Sweaters</label></td>
              <td><Input type='number' ref='sweaters' id='sweaters' /></td>
              <td>Wool Sweaters (0.5 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='shirts'>Shirts</label></td>
              <td><Input type='number' ref='shirts' id='shirts' /></td>
              <td>Shirts (0.2 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='pants'>Pants</label></td>
              <td><Input type='number' ref='pants' id='pants' /></td>
              <td>Pants (0.6 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='socks'>Socks</label></td>
              <td><Input type='number' ref='socks' id='socks' /></td>
              <td>Socks (0.1 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='leatherShoes'>Leather Shoes</label></td>
              <td><Input type='number' ref='leatherShoes' id='leatherShoes' /></td>
              <td>Leather pair (0.9 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='canvasShoes'>Canvas Shoes</label></td>
              <td><Input type='number' ref='canvasShoes' id='canvasShoes' /></td>
              <td>Canvas pair (0.8 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='towels'>Bath Towels</label></td>
              <td><Input type='number' ref='towels' id='towels' /></td>
              <td>Bath Towels (3.7 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='sheets'>Sheets</label></td>
              <td><Input type='number' ref='sheets' id='sheets' /></td>
              <td>Sheets (1.9 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='tablecloths'>Tablecloths</label></td>
              <td><Input type='number' ref='tablecloths' id='tablecloths' /></td>
              <td>Tablecloths (0.002 kg/sq dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='carpet'>Carpet</label></td>
              <td><Input type='number' ref='carpet' id='carpet' /></td>
              <td>Carpet (0.02 kg/sq dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='canvas'>Canvas</label></td>
              <td><Input type='number' ref='canvas' id='canvas' /></td>
              <td>Canvas (0.005 kg/sq dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='looseClothing'>Clothing, mixed loose</label></td>
              <td><Input type='number' ref='looseClothing' id='looseClothing' /></td>
              <td>Clothing, mixed loose (0.1 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='compactClothing'>Clothing, mixed compacted</label></td>
              <td><Input type='number' ref='compactClothing' id='compactClothing' /></td>
              <td>Clothing, mixed compacted(0.1 kg/cubic dm)</td>
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
              <td>Tin Coated Steel Cans (0.3 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='ferrousCans'>Tin Cans, ferrous</label> </td>
              <td><Input type='number' ref='ferrousCans' id='ferrous' /></td>
              <td>Tin Coated, ferrous (0.4 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='petFood'>Pet Food Tin Can, ferrous</label></td>
              <td><Input type='number' ref='petFood' id='petFood' /></td>
              <td>Pet Food Tin Can, ferrous (0.3 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='aluminumCans'>Aluminum Cans (whole)</label></td>
              <td><Input type='number' ref='aluminumCans' id='aluminumCans' /></td>
              <td>Aluminum Cans (whole) (0.3 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='oilFilters'>Used Oil Filters</label></td>
              <td><Input type='number' ref='oilFilters' id='oilFilters' /></td>
              <td>Used Oil Filters (0.2 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='radiator'>Radiator, ferrous (19 Liters)</label></td>
              <td><Input type='number' ref='radiator' id='radiator' /></td>
              <td>Radiator, ferrous (19 Liters) (1.0 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='aluminumFoil'>Aluminum Foil</label></td>
              <td><Input type='number' ref='aluminumFoil' id='aluminumFoil' /></td>
              <td>Aluminum Foil (2.7 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='compositeMetal'>Remainder/Composite Metal</label></td>
              <td><Input type='number' ref='compositeMetal' id='compositeMetal' /></td>
              <td>Remainder/Composite Metal (0.5 kg/cubic dm)</td>
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
              <td><label htmlFor='standardBottles'>Standard Bottles</label></td>
              <td><Input type='number' ref='standardBottles' id='standardBottles' /></td>
              <td>Standard Bottles (0.2 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='largeBottles'>Larger Bottles</label></td>
              <td><Input type='number' ref='largeBottles' id='largeBottles' /></td>
              <td>Larger Bottles (0.4 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='jugs'>Jugs</label></td>
              <td><Input type='number' ref='jugs' id='jugs' /></td>
              <td>Jugs (1.1 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='windowGlass'>Window Glass</label></td>
              <td><Input type='number' ref='windowGlass' id='windowGlass' /></td>
              <td>Window Glass (2.4 mm thick) (0.1 kg/sq dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='mixedGlass'>Mixed Glass - Composite or Broken Glass</label></td>
              <td><Input type='number' ref='mixedGlass' id='mixedGlass' /></td>
              <td>Composite or Broken Glass (1.3 kg/cubic dm)</td>
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
              <td>Yard Trimming, mixed (0.1 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='grassClipping'>Grass Clippings</label></td>
              <td><Input type='number' ref='grassClipping' id='grassClipping' /></td>
              <td>Grass Clippings (0.2 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='leaves'>Leaves</label></td>
              <td><Input type='number' ref='leaves' id='leaves' /></td>
              <td>Leaves (0.4 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='largeLimbs'>Large Limbs and Stumps</label></td>
              <td><Input type='number' ref='largeLimbs' id='largeLimbs' /></td>
              <td>Large Limbs and Stumps (0.6 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='dryPrunings'>Prunings, dry</label></td>
              <td><Input type='number' ref='dryPrunings' id='dryPrunings' /></td>
              <td>Prunings, dry (0.2 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='greenPrunings'>Prunings, green</label></td>
              <td><Input type='number' ref='greenPrunings' id='greenPrunings' /></td>
              <td>Prunings, green (0.03 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='baledStraw'>Hay/Straw, baled</label></td>
              <td><Input type='number' ref='baled' id='baledStraw' /></td>
              <td>Hay/Straw, baled (0.4 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='looseStraw'>Hay/Straw, loose</label></td>
              <td><Input type='number' ref='looseStraw' id='baledStraw' /></td>
              <td>Hay/Straw, loose (0.05 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='compost'>Compost</label></td>
              <td><Input type='number' ref='compost' id='compost' /></td>
              <td>Compost (0.6 kg/cubic dm)</td>
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
              <td><label htmlFor='airConditioner'>Air Conditioner</label></td>
              <td><Input type='number' ref='airConditioner' id='airConditioner' /></td>
              <td>Air Conditioner (29.1 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='microwave'>Microwave</label></td>
              <td><Input type='number' ref='microwave' id='microwave' /></td>
              <td>Microwave (22.7 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='waterHeater'>Water Heater</label></td>
              <td><Input type='number' ref='waterHeater' id='waterHeater' /></td>
              <td>Water Heater (59.4 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='incandescentBulbs'>Incandescent Bulbs</label></td>
              <td><Input type='number' ref='incandescentBulbs' id='incandescentBulbs' /></td>
              <td>Incandescent Bulbs (0.031 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='fluorescentBulbs'>Fluorescent Bulbs</label></td>
              <td><Input type='number' ref='fluorescentBulbs' id='fluorescentBulbs' /></td>
              <td>Fluorescent Bulbs (4ft Ballast) (1.6 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='otherAppliances'>Miscellaneous Appliances</label></td>
              <td><Input type='number' ref='otherAppliances' id='otherAppliances' /></td>
              <td>Uncategorized Appliances</td>
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
              <td>Paints (3.6 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='antifreeze'>Antifreeze</label></td>
              <td><Input type='number' ref='antifreeze' id='antifreeze' /></td>
              <td>Antifreeze (4.3 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='usedMotorOil'>Used Motor Oil</label></td>
              <td><Input type='number' ref='usedMotorOil' id='usedMotorOil' /></td>
              <td>Used Motor Oil (0.8 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='motorVehicleBatteries'>Motor Vehicle Batteries</label></td>
              <td><Input type='number' ref='motorVehicleBatteries' id='motorVehicleBatteries' /></td>
              <td>Motor Vehicle Batteries (18.1 kg)</td>
            </tr>
            <tr>
              <td><label htmlFor='tires'>Tire, passenger car</label></td>
              <td><Input type='number' ref='tires' id='tires' /></td>
              <td>Tire, passenger car (6.5 kg)</td>
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
              <td>Concrete (1.1 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='asphaltPaving'>Asphalt Paving</label></td>
              <td><Input type='number' ref='asphaltPaving' id='asphaltPaving' /></td>
              <td>Asphalt Paving (.8 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='asphaltRoofing'>Asphalt Roofing</label></td>
              <td><Input type='number' ref='asphaltRoofing' id='asphaltRoofing' /></td>
              <td>Asphalt Roofing (1.7 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='brick'>Brick</label></td>
              <td><Input type='number' ref='brick' id='brick' /></td>
              <td>Brick (1.8 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='fiberglassInsulation'>Fiberglass Insulation</label></td>
              <td><Input type='number' ref='fiberglassInsulation' id='fiberglassInsulation' /></td>
              <td>Fiberglass Insulation (0.01 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='gypsum'>Gypsum Board</label></td>
              <td><Input type='number' ref='gypsum' id='gypsum' /></td>
              <td>Gypsum Board (2.3 kg/cubic dm)</td>
            </tr>
            <tr>
              <td><label htmlFor='woodAshes'>Wood Ashes</label></td>
              <td><Input type='number' ref='woodAshes' id='woodAshes' /></td>
              <td>Wood Ashes (0.8 kg/cubic dm)</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MaterialsOptionC
