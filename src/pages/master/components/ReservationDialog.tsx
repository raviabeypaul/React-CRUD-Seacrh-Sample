import * as React from 'react';
import Button from '@mui/material/Button';
import { SxProps, Theme, styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ReservationDto } from '../../../dtos/Reservation';
import { ReservationCard } from '../../../components/ReservationCard';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const iconButtonStyle: SxProps<Theme> = {
  position: 'absolute',
  right: 8,
  top: 8,
  color: (theme) => theme.palette.grey[500]
}
type ReservationDialogProps = {
  viewType: 'edit' | 'add' | 'view';
  reservation?: ReservationDto;
  open: boolean
  onClose: () => void
  onSave: (reservation: ReservationDto) => void;
  onDataUpdated: (reservation: ReservationDto) => void;
}
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
export const ReservationDialog =(props: ReservationDialogProps) => {
  const [reservation, setReservation] = React.useState<ReservationDto>(props.reservation ? props.reservation : initialState)
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={props.onClose}
        fullScreen={true}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title">
          Reservation Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => { props.onClose() }}
          sx={iconButtonStyle}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <ReservationCard onDataUpdated={(_reservation) => { 
            setReservation(_reservation) 
            props.onDataUpdated(_reservation)
            }} viewType={props.viewType} reservation={reservation} />
        </DialogContent>
        <DialogActions>
          <Button data-testid={"reservation-save-close"} autoFocus onClick={() => {
            if (reservation) {
              props.viewType === 'view' ? props.onClose() : props.onSave(reservation)
            }
          }}>
            {props.viewType === 'view' ? 'Close' : 'Save changes'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}