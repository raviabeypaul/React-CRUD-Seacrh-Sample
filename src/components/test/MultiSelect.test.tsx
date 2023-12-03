import React from 'react';
import { render, screen, fireEvent, createEvent, waitFor, getByRole } from '@testing-library/react';
import { AppDatePicker } from '../AppDatePicker';
import dayjs from 'dayjs';
import { EditText } from '../EditText';
import MultiSelect, { MultiSelectItemValue } from '../MultiSelect';
import userEvent from '@testing-library/user-event';




describe('Testing MultiSelect', () => {
    const jestfn = jest.fn((value)=>{{
        console.log(value)
    }})
    const values: MultiSelectItemValue[] = [{value:'value1', selected : true}, {value:'value2', selected : false}]
    let root = <MultiSelect disabled={false} label='MultiSelect' onItemsChanged={jestfn} values={values}/>;
    beforeEach(()=>{
        root = <MultiSelect disabled={false} label='MultiSelect' onItemsChanged={jestfn} values={values}/>;
    })
   
    test('Test MultiSelect', async () => {
      
        render(<MultiSelect disabled={false} label='MultiSelect' onItemsChanged={jestfn} values={values}/>)
        const select = screen.getByTestId('select');
        fireEvent.click(select)
        const selectItem1 =  screen.getByLabelText('value1')
        expect(selectItem1).toBeInTheDocument()       
        
      
    })

    test('Test MultiSelect Error', async () => {
        expect(() => { render(root)
            const select = screen.getByTestId('select');
            fireEvent.click(select)
            screen.getByLabelText('value2')
        }).toThrow() ;
      
    })
})