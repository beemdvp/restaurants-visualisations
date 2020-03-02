import React, { useState } from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";

export default function VenueForm({ onFormFilled }) {
  const [ venue, setVenue ] = useState('');
  const [ clientId, setClientId ] = useState('');
  const [ clientSecret, setClientSecret ] = useState('');
  const [ isVenueValid, setIsVenueValid ] = useState(null);
  const [ isClientIdValid, setIsClientIdValid ] = useState(null);
  const [ isClientSecretValid, setIsClientSecretValid ] = useState(null);

  function handleVenue(e) {
    setIsVenueValid(!!e.target.value);
    setVenue(e.target.value);
  }

  function handleClientId(e) {
    setIsClientIdValid(!!e.target.value);
    setClientId(e.target.value);
  }

  function handleClientSecret(e) {
    setIsClientSecretValid(!!e.target.value);
    setClientSecret(e.target.value);
  }

  function handleSearch() {
    if (isClientIdValid === true && isClientSecretValid === true && isVenueValid === true) {
      onFormFilled({ venue, clientId, clientSecret });
      } else {
        setIsClientIdValid(false);
        setIsClientSecretValid(false);
        setIsVenueValid(false);
      }
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
          <FormInput valid={isClientIdValid === true} invalid={isClientIdValid === false} id="clientId" placeholder="Client ID" onChange={handleClientId} onKeyPress={handleEnterKey}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="#clientSecret">Client Secret</label>
          <FormInput valid={isClientSecretValid === true} invalid={isClientSecretValid === false} id="clientSecret" placeholder="Client Secret" onChange={handleClientSecret} onKeyPress={handleEnterKey}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="#venue">Venue</label>
          <FormInput valid={isVenueValid === true} invalid={isVenueValid === false} id="venue" placeholder="Venue" onChange={handleVenue} onKeyPress={handleEnterKey}/>
        </FormGroup>
        <Button onClick={handleSearch}>Search</Button>
      </Form>
    </div>
  )
}
