import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'shards-react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import VenuesService from './services/venues-service';
import Restaurants from './components/restaurants';
import './App.scss';

function App() {
  const [ service, setService ] = useState(null);

  // initialise venue service
  useEffect(() => setService(new VenuesService()), []);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Restaurants service={service}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
