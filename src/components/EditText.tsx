import { TextField, TextFieldProps } from "@mui/material"

type EditTextProps = TextFieldProps &  {
    textfieldtype : 'default' | 'fullwidth'
}
export const EditText = (props : EditTextProps)=>{
    let fullWidth = props.textfieldtype === 'fullwidth' ? true : false
    return (<TextField data-testid={"editText"+props.id} fullWidth={fullWidth} style={{
        width: props.textfieldtype === 'default' ? 200 : '100%'
    }} {...props}/>)
}