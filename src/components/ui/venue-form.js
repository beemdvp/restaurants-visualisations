import React, { useState } from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";

export default function VenueForm({ onFormFilled }) {
  const [ venue, setVenue ] = useState('');
  const [ clientId, setClientId ] = useState('');
  const [ clientSecret, setClientSecret ] = useState('');

  function handleVenue(e) {
    setVenue(e.target.value);
  }

  function handleClientId(e) {
    setClientId(e.target.value);
  }

  function handleClientSecret(e) {
    setClientSecret(e.target.value);
  }

  function handleSearch() {
    onFormFilled({ venue, clientId, clientSecret });
  }

  function handleEnterKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }

  return (
    <div className="venue-form">
      <Form>
        <FormGroup>
          <label htmlFor="#clientId">Client ID</label>
          <FormInput id="#clientId" placeholder="Client ID" onChange={handleClientId} onKeyPress={handleEnterKey}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="#clientSecret">Client Secret</label>
          <FormInput id="#clientSecret" placeholder="Client Secret" onChange={handleClientSecret} onKeyPress={handleEnterKey}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="#venue">Venue</label>
          <FormInput id="#venue" placeholder="Venue" onChange={handleVenue} onKeyPress={handleEnterKey}/>
        </FormGroup>
        <Button onClick={handleSearch}>Search</Button>
      </Form>
    </div>
  )
}
