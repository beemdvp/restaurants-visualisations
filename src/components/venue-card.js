import React from 'react';
import './scss/venue-card.scss';
import { Card, CardBody, CardTitle, CardSubtitle, Button} from "shards-react";

export default function VenueCard({ name, crossStreet, address, postalCode, showSelectButton, onVenueSelected }) {
  return (
    <Card className="venue-card">
    <CardBody>
      <CardTitle>{name}</CardTitle>
      <CardSubtitle>
        {crossStreet ? `${crossStreet},`: ''}
        {address},
        {postalCode}
      </CardSubtitle>
      {showSelectButton && <Button outline onClick={() => onVenueSelected()}>Select</Button>}
      </CardBody>
    </Card>
    );
}
