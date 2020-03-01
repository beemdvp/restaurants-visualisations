export default class VenuesServiceMock {
  getVenues(venue, clientId, clientSecret) {
    return new Promise(resolve => {
      let data = [
        { id: '0', name: 'foo 0', location: {
          crossStreet: 'cross street 0',
          address: 'address 0',
          postalCode: '122'
        }
        },
      ];
      resolve(data);
    });
  }

  getSimilarVenues(venueId, clientId, clientSecret) {
    return new Promise(resolve => {
      const data = [
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
      ]
      resolve(data);
    });
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
