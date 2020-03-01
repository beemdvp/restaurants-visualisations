import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {render} from '@testing-library/react';
import VenueCard from './venue-card';

let mainContainer = null;

beforeEach(() => {
  mainContainer = document.createElement('div');
  document.body.appendChild(mainContainer);
});

afterEach(() => {
  unmountComponentAtNode(mainContainer);
  mainContainer.remove();
  mainContainer = null;
});

it('should render subtitle with comma', () => {
  const { container } = render(<VenueCard 
    name='foo' 
    crossStreet='cross street'
    address='address'
    postalCode='ABC 123'
    />, mainContainer);

  const subtitle = container.querySelector('.venue-card .card-subtitle').textContent;
  const title = container.querySelector('.venue-card .card-title').textContent;
  expect(title).toBe('foo');
  expect(subtitle).toBe('cross street,address,ABC 123');
});

it('should render subtitle correctly without a cross street', () => {
  const { container } = render(<VenueCard 
    name='foo' 
    address='address'
    postalCode='ABC 123'
    />, mainContainer);

  const subtitle = container.querySelector('.venue-card .card-subtitle').textContent;
  const title = container.querySelector('.venue-card .card-title').textContent;
  expect(title).toBe('foo');
  expect(subtitle).toContain('address,ABC 123');
});

it('should not render button by default', () => {
  const { container } = render(<VenueCard 
    name='foo' 
    address='address'
    postalCode='ABC 123'
    />, mainContainer);

  const button = container.querySelector('button');
  expect(button).toBeNull();
});

it('should not render button by default', () => {
  const { container } = render(<VenueCard 
    name='foo' 
    address='address'
    postalCode='ABC 123'
    showSelectButton={true}
    />, mainContainer);

  const button = container.querySelector('button');
  expect(button).toBeTruthy();
});

