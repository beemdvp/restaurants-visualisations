import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {render} from '@testing-library/react';
import VenuesServiceMock from '../services/venues-service-mock';
import SimilarVenuesGraph from './similar-venues-graph';

let mockGraphData = null;
let venuesServiceMock = null;
let mainContainer = null;

beforeEach(async () => {
  mainContainer = document.createElement('div');
  document.body.appendChild(mainContainer);
  venuesServiceMock = new VenuesServiceMock();
  mockGraphData = await venuesServiceMock.getSimilarVenuesGraphNodes('0', 'foo', 'id', 'secret');
});

afterEach(() => {
  unmountComponentAtNode(mainContainer);
  mainContainer.remove();
  mainContainer = null;
});

it('should render graph with appropriate number of nodes', () => {
  let data = mockGraphData.newData;
  const { container } = render(<SimilarVenuesGraph data={data} />, mainContainer);

  expect(container.querySelectorAll('circle').length).toBe(4);
});
