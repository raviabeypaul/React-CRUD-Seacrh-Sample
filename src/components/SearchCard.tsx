import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReservationDto } from '../dtos/Reservation';

type SearchCardProps = {
    reservation : ReservationDto;
}

export default function SearchCard(props : SearchCardProps) {

  return (
    <Card style={{margin : 5, height :230}}>
      <CardHeader
      
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.reservation.firstName + " " + props.reservation.lastName}
        subheader={props.reservation.stay.arrivalDate + " - " + props.reservation.stay.departureDate}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Email : {props.reservation.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone : {props.reservation.phone}
        </Typography>
      </CardContent>
    </Card>
  );
}