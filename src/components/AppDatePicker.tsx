import { DesktopDateTimePicker , LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
type DemoPickerProps = {
    label: string;
    isoDate: string
    onChange : (value : dayjs.Dayjs |  null )=>void
    disabled: boolean;
}
export const AppDatePicker = (props: DemoPickerProps) => {
    return (
        <div style={{ margin: 20, width : 200}} data-testid="AppDatePicker">
            <LocalizationProvider   dateAdapter={AdapterDayjs}>
                <DemoItem label={props.label}>
                    <DesktopDateTimePicker  disabled={props.disabled} onChange={(_value)=>{
                        props.onChange(_value) }} 
                        slotProps={{ textField: { variant: 'standard' } }} 
                        defaultValue={dayjs(props.isoDate)} />
                </DemoItem>
            </LocalizationProvider>
        </div>
    )
}