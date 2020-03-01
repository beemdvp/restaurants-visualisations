import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {render} from '@testing-library/react';
import VenueList from './venue-list';

let mainContainer = null;
let mockVenuData = null;

beforeEach(() => {
  mainContainer = document.createElement('div');
  document.body.appendChild(mainContainer);
  mockVenuData = [
    { id: '1', name: 'foo 1', location: {
        crossStreet: 'cross street 1',
        address: 'address 1',
        postalCode: '123'
      }
    },
    { id: '2', name: 'foo 2', location: {
        crossStreet: 'cross street 2',
        address: 'address 2',
        postalCode: '124'
      }
    },
    { id: '3', name: 'foo 3', location: {
        crossStreet: 'cross street 3',
        address: 'address 3',
        postalCode: '125'
      }
    }
  ];
});

afterEach(() => {
  unmountComponentAtNode(mainContainer);
  mainContainer.remove();
  mainContainer = null;
});

it('renders a list of venue cards and button to select', () => {
  const { container } = render(
    <VenueList
    venues={mockVenuData}
    onVenueSelected={() => {}} />, mainContainer);

  expect(container.querySelectorAll('.venue-card').length).toBe(3);
  expect(container.querySelectorAll('.venue-card button').length).toBe(3);
});

it('should give venue when selected', () => {

  const action = (venue) => {
    expect(venue.name).toBe('foo 1');
    expect(venue.location.crossStreet).toBe('cross street 1');
    expect(venue.location.address).toBe('address 1');
    expect(venue.location.postalCode).toBe('123');
  }

  const { container } = render(
    <VenueList
    venues={mockVenuData}
    onVenueSelected={action} />, mainContainer);

  const button = container.querySelector('button');
  button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(container.querySelectorAll('.venue-card').length).toBe(3);
  expect(container.querySelectorAll('.venue-card button').length).toBe(3);
});

