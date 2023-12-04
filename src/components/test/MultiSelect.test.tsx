import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import MultiSelect, { MultiSelectItemValue } from '../MultiSelect';




describe('Testing MultiSelect', () => {
    const jestfn = jest.fn()
    const values: MultiSelectItemValue[] = [{value:'value1', selected : true}, {value:'value2', selected : false}]
    let root = <MultiSelect disabled={false} label='MultiSelect' onItemsChanged={jestfn} values={values}/>;
    beforeEach(()=>{
        root = <MultiSelect disabled={false} label='MultiSelect' onItemsChanged={jestfn} values={values}/>;
    })
   
    test('Selected Item Should in the view', async () => {
      
        render(<MultiSelect disabled={false} label='MultiSelect' onItemsChanged={jestfn} values={values}/>)
        const select = screen.getByTestId('select');
        fireEvent.click(select)
        const selectItem1 =  screen.getByLabelText('value1')
        expect(selectItem1).toBeInTheDocument()       
        
      
    })

    test('Should throw Error, if not selected item', async () => {
        expect(() => { render(root)
            const select = screen.getByTestId('select');
            fireEvent.click(select)
            screen.getByLabelText('value2')
        }).toThrow() ;
      
    })
})