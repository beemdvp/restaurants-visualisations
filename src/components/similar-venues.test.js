import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {render} from '@testing-library/react';
import SimilarVenues from './similar-venues';
import {act} from 'react-dom/test-utils';
import VenuesServiceMock from '../services/venues-service-mock';

let mainContainer = null;
let mockService = null;

jest.useFakeTimers();

beforeEach(() => {
  mainContainer = document.createElement('div');
  document.body.appendChild(mainContainer);
  mockService = new VenuesServiceMock();
});

afterEach(() => {
  unmountComponentAtNode(mainContainer);
  mainContainer.remove();
  mainContainer = null;
  mockService = null;
});

it('should get similar venues every 3 seconds', async () => {
  const mockStartVenue = { id: '0', name: 'foo 0', location: {
        crossStreet: 'cross street 0',
        address: 'address 0',
        postalCode: '122'
      }
    }; 

  const serviceSpy = jest.spyOn(mockService, 'getSimilarVenuesGraphNodes');

  await act(async () => {
    render(
      <SimilarVenues 
      service={mockService}
      startVenue={mockStartVenue}
      clientId='mockclientid'
      clientSecret='mockclientsecret'
      />, mainContainer);
  });

  const nodesLength = document.querySelectorAll('circle').length;
  expect(serviceSpy).toHaveBeenCalledTimes(1);
  // seed node + similar venues
  expect(nodesLength).toBe(4);

  await act(async () => {
    jest.advanceTimersByTime(3000);
  });

  expect(serviceSpy).toHaveBeenCalledTimes(2);
  serviceSpy.mockRestore();

  await act(async () => {
    jest.advanceTimersByTime(3000);
  });

  await act(async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32, code: 'Space' }));
  });
});

it('should stop adding similar venues when spacebar is pressed', async () => {
  const mockStartVenue = { id: '0', name: 'foo 0', location: {
      crossStreet: 'cross street 0',
      address: 'address 0',
      postalCode: '122'
    }
  }; 

  const serviceSpy = jest.spyOn(mockService, 'getSimilarVenuesGraphNodes');

  await act(async () => {
    render(
      <SimilarVenues 
      service={mockService}
      startVenue={mockStartVenue}
      clientId='mockclientid'
      clientSecret='mockclientsecret'
      />, mainContainer);
  });

  const nodesLength = document.querySelectorAll('circle').length;
  expect(serviceSpy).toHaveBeenCalledTimes(1);
  // seed node + similar venues
  expect(nodesLength).toBe(4);

  await act(async () => {
    jest.advanceTimersByTime(2000);
  });

  await act(async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32, code: 'Space' }));
  });

  await act(async () => {
    jest.advanceTimersByTime(1000);
  });

  expect(serviceSpy).toHaveBeenCalledTimes(1);
  serviceSpy.mockRestore();
});
