import React from 'react';
import {render, screen, fireEvent } from '@testing-library/react';

import dayjs from 'dayjs';
import AutoAdjustCard from '../AutoAdjustCard';

interface SampleData {
    value : String
}

const sampleData : SampleData[] = [{value : 'value1'}, {value : 'value2'}, {value : 'value3'},{value : 'value4'},{value : 'value5'}]
const items = sampleData.forEach((sampleData)=>{
    return (<div>{sampleData.value}</div>)
})
describe('Testing Auto ',()=>{
    test('Check appropriate data test id ' , ()=>{
        render(<AutoAdjustCard element={(data : any, _index: number)=><div key={_index} data-testid={"test_"+_index}>{data.value}</div> } elements={sampleData} indexOffset={2} />)
        const displayNotValue  = screen.queryByTestId("test_0")
        expect(displayNotValue).toBeNull()
        const displayValue  = screen.getByTestId("test_3")
        expect(displayValue).toBeInTheDocument()
        
    })
})