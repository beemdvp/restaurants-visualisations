import React, { useState } from 'react';
import VenueForm from './ui/venue-form';
import VenueList from './venue-list';
import VenueCard from './venue-card';
import SimilarVenues from './similar-venues';
import './scss/restaurants.scss';

// Page data owner
export default function Restaurants({ service }) {
  const [ foundVenues, setFoundVenues ] = useState([]);
  const [ selectedVenue, setSelectedVenue ] = useState();
  const [ clientId, setClientId ] = useState('');
  const [ clientSecret, setClientSecret ] = useState('');

  async function handleVenueForm({ venue, clientId: newClientId, clientSecret: newClientSecret }) {
    setSelectedVenue(null);
    console.log(await service.getVenues(venue, newClientId, newClientSecret));
    setFoundVenues(await service.getVenues(venue, newClientId, newClientSecret));
    setClientId(newClientId);
    setClientSecret(newClientSecret);
  }

  function handleVenueSelected(venue) {
    setSelectedVenue(venue);
    setFoundVenues([]);
  }

  return (
    <div className="restaurants">
      <h3>View Restaurants Near London</h3>
      <VenueForm onFormFilled={handleVenueForm}/>
      <VenueList onVenueSelected={handleVenueSelected} venues={foundVenues}/>
      {selectedVenue &&
        <div className="restaurants-related">
          <h4>Watch the graph of restaurants related to {selectedVenue.name} grow!</h4>
          <VenueCard
            name={selectedVenue.name}
            crossStreet={selectedVenue.location.crossStreet}
            address={selectedVenue.location.address}
            postalCode={selectedVenue.location.postalCode}
            showSelectButton={false}
          />
          <SimilarVenues
            service={service}
            startVenue={selectedVenue}
            clientId={clientId}
            clientSecret={clientSecret}
          />
        </div>
      }
    </div>
  )
}
