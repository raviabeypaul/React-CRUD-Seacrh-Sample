import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
export type MultiSelectItemValue = {
  value: string;
  selected: boolean;

}
type MultiSelectProps = {
  onItemsChanged: (values: MultiSelectItemValue[]) => void;
  values: MultiSelectItemValue[];
  label: string;
  disabled: boolean;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultiSelect(props: MultiSelectProps) {
  const items : string[] =[]
  props.values.forEach((item)=>{
    if(item.selected){
      items.push(item.value)
    }
  })
  const [multiSelectValue, setmultiSelectValue] = React.useState<string[]>(items===undefined?[]:items)

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    let arr = typeof value === 'string' ? value.split(',') : value;
    let map = new Map<string, number>()
    arr.forEach((value) => {
      map.set(value, 1)
    })
    const propsItems : MultiSelectItemValue[] = []
    props.values.forEach(element => {
      if (map.has(element.value)) {
        element.selected = true;
      } else {
        element.selected = false;
      }
      propsItems.push(element);
    });
    props.onItemsChanged(propsItems)
    setmultiSelectValue(typeof value === 'string' ? value.split(',') : value)
  };

  const arr: string[] = []
  props.values.forEach((value) => {
    arr.push(value.value)
  })



  return (
    <div>
      <FormControl sx={{ m: 1, width: 200, "& fieldset": { border: 'none', borderBottom: 1, borderColor: '#b2b2b2' } }}>
        <InputLabel id="input-label" data-testid="input-label">{props.label}</InputLabel>
        <Select
          labelId="select"
          id="select"
          data-testid="select"
          multiple
          disabled={props.disabled}
          value={multiSelectValue}
          onChange={handleChange}
          input={<OutlinedInput label={props.label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {props.values.map((value) => (
            <MenuItem data-testid={value} key={value.value} value={value.value}>
              {/* <Checkbox checked={value.selected} /> */}
              <ListItemText primary={value.value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}