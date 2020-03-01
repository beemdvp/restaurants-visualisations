import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {render} from '@testing-library/react';
import SimilarVenues from './similar-venues';
import {act} from 'react-dom/test-utils';
import VenuesServiceMock from '../services/venues-service-mock';
import Restaurants from './restaurants';

let mainContainer = null;
let mockService = null;

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

it('should render with 3 input fields and a button', () => {
  const { container } = render(<Restaurants />, mainContainer);

  expect(container.querySelectorAll('input').length).toBe(3);
  expect(container.querySelector('button')).toBeTruthy;
});


it('should give a list of restaurants to select', () => {
  const { container } = render(<Restaurants service={mockService} />, mainContainer);

  const button = container.querySelector('button');
  button.dispatchEvent(new MouseEvent('click'));

  expect(container.querySelectorAll('.venue-card').length).toBe(1);
});

