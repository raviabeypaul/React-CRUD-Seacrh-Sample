import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export type RadioButtonValue = {
  value : string;
  displayValue : string;
}

type RadioButtoGroup = {
    values : RadioButtonValue[];
    defaultValue : string;
    label  : string;
    disabled : boolean;
    onValueChanged : (value : string) => void
}

export default function RadioButtonsGroup(props : RadioButtoGroup) {

    const items = props.values.map((item, index)=>{
        return (<FormControlLabel key={index} checked={props.defaultValue===item.value} disabled={props.disabled} value={item.value} control={<Radio />} label={item.displayValue} />)
    })
  return (
    <FormControl>
      <FormLabel id="radio-buttons-group-label">{props.label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={props.defaultValue}
        name="radio-buttons-group"
        onChange={(event)=>props.onValueChanged(event.target.value)}
      >
        {items}
      </RadioGroup>
    </FormControl>
  );
}