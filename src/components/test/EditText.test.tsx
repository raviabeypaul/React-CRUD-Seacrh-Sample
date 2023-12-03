import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { AppDatePicker } from '../AppDatePicker';
import dayjs from 'dayjs';
import { EditText } from '../EditText';



describe('Testing EditText', () => {
    const editTextValue = "Hello this is a EditText"
    test('Test Stylinh with Default Field Type Width', () => {
        render(<EditText textfieldtype={'default'} value={editTextValue}/>)
        
        const label = screen.getByDisplayValue(editTextValue)
        const editText = screen.getByTestId('editText');
        const styles = getComputedStyle(editText)
        expect(styles.width).toBe('200px')
        expect(label).toBeInTheDocument()
    }),
    test('Test Styling Fullwidth Field Type', () => {
        render(<EditText textfieldtype='fullwidth' value={editTextValue}/>)
        const editText = screen.getByTestId('editText');
        expect(editText.style.width ==='100%')
        const label = screen.getByDisplayValue(editTextValue)
        expect(label).toBeInTheDocument()
    })
})