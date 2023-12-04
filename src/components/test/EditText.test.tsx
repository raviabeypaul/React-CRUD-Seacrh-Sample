import React from 'react';
import { render, screen } from '@testing-library/react';
import { EditText } from '../EditText';



describe('Testing EditText', () => {
    const editTextValue = "Hello this is a EditText";
    test('Styling with Default Field Type Width', () => {
        render(<EditText id={"1"} textfieldtype={'default'} value={editTextValue}/>)
        const label = screen.getByDisplayValue(editTextValue)
        const editText = screen.getByTestId('editText1');
        const styles = getComputedStyle(editText)
        expect(styles.width).toBe('200px')
        expect(label).toBeInTheDocument()
    })

    test('Styling  Fullwidth Field Type', () => {
        render(<EditText  id={"1"} textfieldtype='fullwidth' value={editTextValue}/>)
        const editText = screen.getByTestId('editText1');
        expect(editText.style.width).toEqual('100%')
        const label = screen.getByDisplayValue(editTextValue)
        expect(label).toBeInTheDocument()
    })
})