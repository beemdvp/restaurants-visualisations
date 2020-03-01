import React from 'react';
import VenueCard from './venue-card';

export default function VenueList({ venues, showSelectButton = true, onVenueSelected }) {
  return (
    <div className="venue-list">
      {venues && venues.length > 0 && venues.map(venue => {
        return (
          <VenueCard
            key={venue.id}
            name={venue.name}
            crossStreet={venue.location.crossStreet}
            address={venue.location.address}
            postalCode={venue.location.postalCode}
            showSelectButton={showSelectButton}
            onVenueSelected={() => onVenueSelected(venue)}
          />)
      })}
    </div>
  )
}
