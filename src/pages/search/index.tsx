import { Grid } from "@mui/material"
import { EditText } from "../../components/EditText"
import { InfiniteGridScroller } from "../../components/InfiniteGridScroller"
import { StyledBox } from "../../components/StyledBox"
import { useReservationSource } from "../../hooks/useReservationSource"
import SearchCard from "../../components/SearchCard"
import { useState } from "react"
import { ReservationDto } from "../../dtos/Reservation"
import RadioButtonsGroup, { RadioButtonValue } from "../../components/RadioButtonGroup"

type SearchProps = {

}
export const Search = (searchProps : SearchProps)=>{
    const radioButtonGroupValues : RadioButtonValue[] = [{ value: 'all', displayValue: 'All' }, { value: 'email', displayValue: 'Email' }, { value: 'first-name', displayValue: 'First Name' }]
    const { searchReservationByText, searchByKey } = useReservationSource()
    const [radioButtonValue, setRadioButtonValue] = useState<string>('all')
    const [localSearchResult, setLocalSearchResult] = useState<ReservationDto[]>()
    const onSearchInputChange = (event: any)=>{
        if(radioButtonValue === 'all'){
            let results : ReservationDto[] = searchReservationByText(event.target.value)
            setLocalSearchResult(results)
        }else{
            radioButtonGroupValues.forEach((value)=>{
                if(value.value === radioButtonValue){
                    // searchByKey(value, )
                }
            })
        }
        
    }
    return (
        <StyledBox flexDirections='column' >
            <RadioButtonsGroup label="" disabled={false} defaultValue={radioButtonValue} values={radioButtonGroupValues} onValueChanged={(value) => { setRadioButtonValue(value) }} />
            <EditText textfieldtype="fullwidth" onChange={onSearchInputChange} />
            <InfiniteGridScroller
            cardCount={4}
            hasMore={false}
            list={localSearchResult?localSearchResult:[]}
            fetchMoreData={() => {  }}
            key={'Products'}
            loader={<h4>Loading</h4>}
            element={(_data, _index) => {
                return (
                    <Grid style={{margin: 2}} key={_index} item xs={3} >
                        <SearchCard reservation={_data}/>
                    </Grid>
                )
            }}
        />
        </StyledBox>
    )

}