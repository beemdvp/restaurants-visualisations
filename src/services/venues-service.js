import Axios from 'axios';

export default class VenuesService {

  async getVenues(venue, clientId, clientSecret) {
    const url = 'https://api.foursquare.com/v2/venues/search';
    const params = {
      near: 'London',
      query: venue,
      client_id: clientId,
      client_secret: clientSecret,
      v: '20161005'
    }
    try {
      const response = await Axios.get(url, { params });
      return response.data.response.venues;
    } catch(e) {
      return e;
    }
  }

  async getSimilarVenues(venueId, clientId, clientSecret) {
    const url = `https://api.foursquare.com/v2/venues/${venueId}/similar`;
    const params = {
      v: '20161005',
      client_id: clientId,
      client_secret: clientSecret,
    }
    try {
      const response = await Axios.get(url, { params });
      return response.data.response.similarVenues.items;
    } catch(e) {
      return e;
    }
  }

  async getSimilarVenuesGraphNodes(startVenueId, startVenueName, clientId, clientSecret) {
    const similarVenuesData = await this.getSimilarVenues(startVenueId, clientId, clientSecret);
    const nodes = similarVenuesData.map(({ name }) => {
      return { id: name, group: 1 };
    });
    nodes.push({ id: startVenueName, group: 1 });

    const links = similarVenuesData.map(({ name }) => {
      return { source: name, target: startVenueName, value: 1 };
    });

    return { newData: { nodes, links }, newSimilarVenues: similarVenuesData};
  }

}

