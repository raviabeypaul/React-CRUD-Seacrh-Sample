import React from 'react';
import { render, screen, fireEvent, createEvent, getByRole, waitFor } from '@testing-library/react';
import { AppDatePicker } from '../AppDatePicker';
import dayjs from 'dayjs';


describe('Testing AppDatePicker', () => {
    test('renders a correct date time on iso date passed',async () => {
        const onChange = jest.fn((value) => {
        })
        jest.mock("@mui/x-date-pickers", () => {
            return {
                DatePicker: jest.requireActual("@mui/x-date-pickers").DesktopDatePicker,
            };
        });
        render(<AppDatePicker label='Label' disabled={false} isoDate={"2018-01-01T00:00:00.000Z".slice(0, -8)} onChange={onChange} />)
        const label = screen.getByRole('textbox')
        let dayJsValue = dayjs('2021-11-01T04:00:00')
        fireEvent.change(label , {
            target : {
                value : dayJsValue
            }
        });
        expect(label).toBeInTheDocument()
        expect(onChange).toHaveBeenCalledTimes(1)
    })
})