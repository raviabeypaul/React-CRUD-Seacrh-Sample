import { Menu, MenuItem, Switch } from "@mui/material"
import { StyledBox } from "./StyledBox"
type SelectItemValue = {
    value: string;
    selected: boolean;
}
type SelectItemProps = {
    id?: string;
    anchorEl: any;
    onItemsChanged: (values: SelectItemValue[]) => void;
    values: SelectItemValue[];
    onClose : ()=>void
}
export const MultiSelectItem = (props: SelectItemProps) => {

    const open = Boolean(props.anchorEl);

    const handleClose = () => {
        props.onClose()
    };

    const setCheckedItems = (selectItemValue : SelectItemValue, checked : boolean)=>{
        const items = props.values.map((_value)=>{
            if(_value.value === selectItemValue.value){
                _value.selected = checked
            }
            return _value;
        })
        props.onItemsChanged(items)
    }

    const menuItems = props.values.map((_value, _index)=>{
        return (
            <MenuItem key={_index} ><div><Switch defaultChecked={_value.selected} onChange={(_event, _checked) => { setCheckedItems(_value, _checked) }} /> ${_value.value}</div></MenuItem>
        )
    })

    return (
        <StyledBox flexDirections="column"
        >
            <Menu
                id="filter-menu"
                aria-labelledby="filter-btn"
                anchorEl={props.anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
               {menuItems}
            </Menu>
        </StyledBox>
    )
}