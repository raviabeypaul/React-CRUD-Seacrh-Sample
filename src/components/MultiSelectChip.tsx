import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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

export type MultiSelectChipItem = {
  value: string;
  displayValue: string;
  selected: boolean;
}
type MultiSelectChipProps = {
  label: string;
  itemValues: MultiSelectChipItem[]
  onValueChange: (values: string[]) => void;
}

function getStyles(item: string, items: readonly string[], theme: Theme) {
  return {
    fontWeight:
      items.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props: MultiSelectChipProps) {
  let propsSelectedItems : string[] = []
  props.itemValues.forEach((item)=>{
    if(item.selected){
      propsSelectedItems.push(item.value)
    }
  })
  const theme = useTheme();
  const [items, setItems] = React.useState<string[]>(propsSelectedItems);
  

  const handleChange = (event: SelectChangeEvent<typeof items>) => {
    const {
      target: { value },
    } = event;
    setItems(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    props.onValueChange(typeof value === 'string' ? value.split(',') : value,)
  };

 

  React.useEffect(()=>{
    
  },[])

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%', "& fieldset": { border: 'none', borderBottom: 1, borderColor: '#b2b2b2' } }}>
        {/* <InputLabel id="demo-multiple-chip-label">{props.label}</InputLabel> */}
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={items}
          onChange={handleChange}
          defaultValue={propsSelectedItems}
          displayEmpty={true}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          
          renderValue={(selected) => {
            return (   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value, index) => (
                  <Chip key={index} label={value} />
                ))}
              </Box>
            )
          }}
          MenuProps={MenuProps}
        >
          {props.itemValues.map((value, index) => (
            <MenuItem
              key={index}
              value={value.value}
              style={getStyles(value.value, items, theme)}
            >
              {value.displayValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}