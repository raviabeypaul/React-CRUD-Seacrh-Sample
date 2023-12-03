import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

export type SelectItemValue = {
    value: string
    displayValue: string
}
type SelectItemProps=  { 

    id?: string;
    label : string;
    onItemSelected : (value : SelectItemValue)=>void
    values : SelectItemValue[]
    value : string;
    disabled : boolean
}
export const SelectItem = (props : SelectItemProps ) => {
    
    

    const handleChange = (event: SelectChangeEvent)=>{
        let selectedItems = props.values.filter((value)=>value.value === event.target.value)
        props.onItemSelected(selectedItems[0])
    }

    const menuItems = props.values.map((value, index )=>{
            return (<MenuItem key={index} value={value.value}>{value.displayValue}</MenuItem>)
    })

    return (
        <FormControl variant="standard" >
            <InputLabel id="simple-select-standard-label">{props.label}</InputLabel>
            <Select
                labelId="simple-select-standard-label"
                id="simple-select-standard"
                value={props.value}
                onChange={handleChange}
                label="Age"
                disabled={props.disabled}
            >
                {menuItems}
            </Select>
        </FormControl>
    )
}