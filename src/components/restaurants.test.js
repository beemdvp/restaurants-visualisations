import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {render} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import VenuesServiceMock from '../services/venues-service-mock';
import Restaurants from './restaurants';
import ReactTestUtils from 'react-dom/test-utils';

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


it('should give a list of restaurants to select', async () => {
  const { container } = render(<Restaurants service={mockService} />, mainContainer);

  const idInput = container.querySelector('input[id="clientId"]');
  idInput.value = 'id';
  ReactTestUtils.Simulate.change(idInput);

  const secretInput = container.querySelector('input[id="clientSecret"]');
  secretInput.value = 'secret';
  ReactTestUtils.Simulate.change(secretInput);

  const venueInput = container.querySelector('input[id="venue"]');
  venueInput.value = 'venueName';
  ReactTestUtils.Simulate.change(venueInput);

  await act(async () => {
    const button = container.querySelector('button');
    ReactTestUtils.Simulate.click(button);
  });

  expect(container.querySelectorAll('.venue-card').length).toBe(1);
});

it('should generate graph when selecting a restaurant', async () => {

  const { container } = render(<Restaurants service={mockService} />, mainContainer);

  const idInput = container.querySelector('input[id="clientId"]');
  idInput.value = 'id';
  ReactTestUtils.Simulate.change(idInput);

  const secretInput = container.querySelector('input[id="clientSecret"]');
  secretInput.value = 'secret';
  ReactTestUtils.Simulate.change(secretInput);

  const venueInput = container.querySelector('input[id="venue"]');
  venueInput.value = 'venueName';
  ReactTestUtils.Simulate.change(venueInput);

  await act(async () => {
    const button = container.querySelector('button');
    ReactTestUtils.Simulate.click(button);
  });

  expect(container.querySelectorAll('.venue-card').length).toBe(1);

  await act(async () => {
    const button = container.querySelector('.btn-outline-primary');
    ReactTestUtils.Simulate.click(button);
  });

  expect(container.querySelectorAll('svg').length).toBe(1);
  expect(container.querySelectorAll('circle').length).toBe(4);
});
