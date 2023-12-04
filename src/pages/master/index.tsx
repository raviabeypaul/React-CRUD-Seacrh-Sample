import { Box, Button, ButtonGroup, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useReservationSource } from "../../hooks/useReservationSource";
import { ReservationDto } from "../../dtos/Reservation";
import { useState } from "react";
import {ReservationDialog} from "./components/ReservationDialog";
import { enqueueSnackbar } from "notistack";
import { hasValue, isEmailValid } from "../../utils/Utils";



export default function MasterPage() {
  const { reservations, addData, updateReservation } = useReservationSource()
  const [selectedReservation, setSelectedReservation] = useState<ReservationDto>();
  const [open, setOpen] = useState<boolean>(false)
  const [view, setView] = useState<'edit' | 'add' | 'view'>('view')
  const setActionOnReservation = (actionType: 'edit' | 'add' | 'view', reservation?: ReservationDto) => {
    setSelectedReservation(reservation)
    setView(actionType)
    setOpen(true)
  }
  const navigate = useNavigate()

  const onSave = (reservation: ReservationDto) => {
    let isValid = validateReservation(reservation)
    if (isValid) {
      setOpen(false)
      if (reservation.id === '') {
        addData(reservation)
      } else {
        updateReservation(reservation)
      }
    }

  }

  const validateReservation = (reservation: ReservationDto) => {
    let isValid = true;
    if (!isEmailValid(reservation.email)) {
      enqueueSnackbar('Email is invalid', { autoHideDuration: 3000, variant: 'error' })
      isValid = false;
    }
    if (reservation.room.roomQuantity < 0 && reservation.room.roomQuantity >= 6) {
      enqueueSnackbar('Room Count is invalid', { autoHideDuration: 3000, variant: 'error' })
      isValid = false;
    }
    if (!hasValue(reservation.room.roomSize)) {
      enqueueSnackbar('Room Size needs to be selected', { autoHideDuration: 3000, variant: 'error' })
      isValid = false;
    }
    return isValid;
  }

  return (
    <div >
      {open ? <ReservationDialog viewType={view} reservation={selectedReservation} onClose={() => { setOpen(false) }} onSave={(reservation) => {
        onSave(reservation)
       
      }} open={open} onDataUpdated={(data) => { 
        setSelectedReservation(data) 
        }} /> : null}

      <Container>
        <Paper >
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Reservations
              </Typography>
            </Box>
            <Box>
              <Button onClick={() => setActionOnReservation('add')} variant="contained" color="primary">
                CREATE
              </Button>

              <Button onClick={() => navigate("/search")} variant="contained" color="primary">
                SEARCH
              </Button>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table caria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="left">FirstName</TableCell>
                  <TableCell align="left">LastName</TableCell>
                  <TableCell align="left">Dates</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map((reservation, index) => (
                  <TableRow key={reservation.id}>
                    <TableCell data-testid={"reservation_row_id"} align="right">{reservation.id}</TableCell>
                    <TableCell data-testid={"reservation_row_email_" + reservation.id} align="center">
                      <Box display="flex" justifyContent="center">
                        {reservation.email}
                      </Box>
                    </TableCell>
                    <TableCell align="left">{reservation.firstName}</TableCell>
                    <TableCell align="left">{reservation.lastName}</TableCell>
                    <TableCell align="left">{reservation.stay.arrivalDate +  " - " + reservation.stay.departureDate }</TableCell>
                    <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button data-testid={"edit_" + index} onClick={() => setActionOnReservation('edit', reservation)} style={{ margin: 0 }}>Edit</Button>
                        <Button data-testid={"view_" + index} onClick={() => setActionOnReservation('view', reservation)} style={{ margin: 0 }}>View</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>


    </div>

  );
}