import { Card, CardContent, MenuItem, Switch } from "@mui/material";
import { ReservationDto } from "../dtos/Reservation"
import { SelectItem, SelectItemValue } from "./SelectItem";
import { useRef, useState } from "react";
import { StyledBox } from "./StyledBox";
import { EditText } from "./EditText";
import MultipleSelectChip, { MultiSelectChipItem } from "./MultiSelectChip";
import MultiSelect, { MultiSelectItemValue } from "./MultiSelect";
import RadioButtonsGroup from "./RadioButtonGroup";
import { AppDatePicker } from "./AppDatePicker";
var set = require('lodash.set');

var cloneDeep = require('lodash.clonedeep');
const initialState: ReservationDto = {
    addressLocation: {
        city: '',
        state: '',
        zipCode: ''
    },
    addressStreet: {
        streetName: '',
        streetNumber: ""
    },
    confirm: false,
    email: '',
    extras: ['extraBreakfast'],
    firstName: '',
    id: "",
    lastName: '',
    newsletter: false,
    note: '',
    payment: '',
    phone: '',
    reminder: false,
    room: {
        roomQuantity: 0,
        roomSize: ''
    },
    stay: {
        arrivalDate: '',
        departureDate: ''
    },
    tags: []
}
type ReservationCardProps = {
    reservation?: ReservationDto;
    onDataUpdated : (reservation : ReservationDto)=>void;
    viewType: 'view' | 'edit' | 'add';
}
export const ReservationCard = (props: ReservationCardProps) => {

    const roomTypes: SelectItemValue[] = [{ value: 'business-suite', 'displayValue': 'Business Suite' }, { value: 'presidential-suite', 'displayValue': 'Presential Suite' }]
    const extras: MultiSelectItemValue[] = [{ value: 'extraBreakfast', selected: false }, { value: 'extraTV', selected: false }, { value: 'extraWiFi', selected: false }, { value: 'extraParking', selected: false }, { value: 'extraBalcony', selected: false }]
    const tags : MultiSelectChipItem[]= [{ value: 'angular', displayValue: 'Angular', selected : false }, { value: 'material', displayValue: 'Material',selected : false }, { value: 'labtest', displayValue: 'LabTest',selected : false },{ value : 'hotel', displayValue : 'Hotel', selected : false}, { value : 'booking', displayValue : 'Booking', selected : false}]
    const [reservation, setReservation] = useState<ReservationDto>(props.reservation ? props.reservation : initialState)
    const roomCountTextRef = useRef<any>();
    const resetRoomQuantity = () => {
        roomCountTextRef.current.value = ''
        updateData('room.roomQuantity', 0)
    }

    const setRoomQuantity = (count: number) => {
        if (count > 0 && count <= 5) {
            updateData('room.roomQuantity', count)
        } else {
            resetRoomQuantity()
        }
    }
    const updateData = (key: string, data: any) => {
        const tempReservation: ReservationDto = cloneDeep(reservation);
        set(tempReservation, key, data)
        setReservation(tempReservation);
        props.onDataUpdated(tempReservation)
    }

    const getRoomSize = () => {
        const roomSizeValue = roomTypes.filter((_value) => {
            return _value.value === reservation.room.roomSize;
        })
        return roomSizeValue;
    }

    const getExtraValue = () => {
        const map = new Map<String, Number>()
        reservation.extras.forEach((value) => {
            map.set(value, 1)
        })
        const _extras = extras.map((item) => {
            if (map.has(item.value)) {
                item.selected = true;
            }
            return item
        })
        return _extras
    }
    const getSelectedTags=()=>{
        let map = new Map<string, number>()
        props.reservation?.tags.forEach((value)=>{
            map.set(value,1)
        })
        let finalTags = tags.map((tag)=>{
            if(map.has(tag.value)){
                tag.selected= true;
            }
            return tag
        })
        return finalTags
    }

    const updateTimeString = (key : string, value : any | null)=>{
        if(value){
            updateData(key, value.toISOString())
        }

    }

    let dateString = "2018-01-01T00:00:00.000Z".slice(0, -8)
    let viewDisabled = props.viewType === 'view'
    const roomSizeValue = getRoomSize()
    const _extras = getExtraValue()
    const roomValue = roomSizeValue.length >= 1 ? roomSizeValue[0].value : ''
    const finalTags = getSelectedTags()
    return (<Card>
        <CardContent>
            <StyledBox flexDirections='row'>
                <AppDatePicker disabled={viewDisabled} onChange={(value) => {
                    updateTimeString('stay.arrivalDate', value)
                    
                }} isoDate={dateString} label="Date of Arrival" />
                <AppDatePicker disabled={viewDisabled} onChange={(value) => { 
                    updateTimeString('stay.departureDate', value)
                    }} isoDate={dateString} label="Date of Departure" />
            </StyledBox>
            <StyledBox flexDirections="row">
                <SelectItem disabled={viewDisabled} value={roomValue} label="Room Size" id="room-size-select" onItemSelected={(selectedItem) => { updateData('room.roomSize', selectedItem.value) }} values={roomTypes} />
                <EditText disabled={viewDisabled} value={reservation.room.roomQuantity} textfieldtype="default" inputRef={roomCountTextRef} id="standard-basic" label="Room Quantity" variant="standard" helperText="Maximum 5" type="number" onChange={(event) => { setRoomQuantity(Number(event.target.value)) }} />
            </StyledBox>
            <StyledBox flexDirections="column">
                <EditText data-testid={"reservation_card_firstName_" + reservation.id }
                 disabled={viewDisabled} value={reservation.firstName} onChange={(event) => { updateData('firstName', event.target.value) }} textfieldtype="default" id="first-name-text" label="First Name" variant="standard" />
                <EditText data-testid={"reservation_card_lastName_" + reservation.id} disabled={viewDisabled} value={reservation.lastName} onChange={(event) => { updateData('lastName', event.target.value) }} textfieldtype="default" id="last-name-text" label="Last Name" variant="standard" />
                <EditText data-testid={"et_reservation_card_email_" + reservation.id} disabled={viewDisabled} value={reservation.email} onChange={(event) => { updateData('email', event.target.value) }} textfieldtype="default" id="email-text" label="E-Mail" variant="standard" />
                <EditText data-testid={"reservation_card_phone_" + reservation.id} disabled={viewDisabled} value={reservation.phone} onChange={(event) => { updateData('phone', event.target.value) }} textfieldtype="default" id="phone-text" label="Phone Number" variant="standard" />
            </StyledBox>
            <StyledBox flexDirections="row">
                <EditText disabled={viewDisabled} value={reservation.addressStreet.streetName} onChange={(event) => { updateData('addressStreet.streetName', event.target.value) }} textfieldtype="default" id="street-name-text" label="Street Name" variant="standard" />
                <EditText disabled={viewDisabled} value={reservation.addressStreet.streetNumber} onChange={(event) => { updateData('addressStreet.streetNumber', event.target.value) }} textfieldtype="default" id="street-number-text" label="Street Number" variant="standard" />
            </StyledBox>
            <StyledBox flexDirections="row">
                <EditText disabled={viewDisabled} value={reservation.addressLocation.zipCode} onChange={(event) => { updateData('addressLocation.zipCode', event.target.value) }} textfieldtype="default" id="zip-text" label="ZIP" variant="standard" />
                <EditText disabled={viewDisabled} value={reservation.addressLocation.state} onChange={(event) => { updateData('addressLocation.state', event.target.value) }} textfieldtype="default" id="state-text" label="State" variant="standard" />
                <EditText disabled={viewDisabled} value={reservation.addressLocation.city} onChange={(event) => { updateData('addressLocation.city', event.target.value) }} textfieldtype="default" id="city-text" label="City" variant="standard" />
            </StyledBox>
            <MultiSelect disabled={viewDisabled} label="Extras" values={_extras} onItemsChanged={(items) => { updateData('extras', items) }} />
            <RadioButtonsGroup disabled={viewDisabled} label="" defaultValue={reservation.payment} values={[{ value: 'cc', displayValue: 'Credit Card' }, { value: 'paypal', displayValue: 'PayPal' }, { value: 'cash', displayValue: 'Cash' }, { value: 'bitcoin', displayValue: 'Bitcoin' }]} onValueChanged={(value) => { updateData('payment', value) }} />
            <StyledBox flexDirections="column">
                <EditText disabled={viewDisabled} value={reservation.note} onChange={(event) => { updateData('note', event.target.value) }} textfieldtype="default" variant="standard" multiline={true} rows={3} id="phone-text" label="PersonalNote" />
            </StyledBox>
            <MultipleSelectChip label="Tags" itemValues={finalTags} onValueChange={(items) => updateData('tags', items)} />
            <MenuItem ><div><Switch disabled={viewDisabled} defaultChecked={reservation.reminder} onChange={(_event, _checked) => { updateData('reminder', _checked) }} /> Send me a reminder</div></MenuItem>
            <MenuItem ><div><Switch disabled={viewDisabled} defaultChecked={reservation.newsletter} onChange={(_event, _checked) => { updateData('newsletter', _checked) }} /> Subscribe to newsletter</div></MenuItem>
            <StyledBox flexDirections="row">

            </StyledBox>
        </CardContent>
    </Card>)

}   