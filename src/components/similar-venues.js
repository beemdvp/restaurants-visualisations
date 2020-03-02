import React, {useEffect, useState} from 'react';
import SimilarVenuesGraph from './similar-venues-graph';

export default function SimilarVenues({ service, startVenue, clientId, clientSecret }) {
  const [ data, setData ] = useState(null);
  const [ similarVenues, setSimilarVenues ] = useState([]);
  const [ lastVenue, setLastVenue ] = useState();
  // from subsequent similar venues, prepare a new batch to request
  const [ newBatch, setNewBatch ] = useState([]);
  // used to properly track if a request has been completed
  const [ requestDone, setRequestDone ] = useState(false);
  const [ stopped, setStopped ] = useState(false);
  const [ timeout, setTimeoutId ] = useState();

  useEffect(() => {
    function cleanTimeout() {
      if (timeout && stopped) {
        clearTimeout(timeout);
      }
    }
    cleanTimeout();
  }, [timeout, stopped]);

  useEffect(() => {
    const spacebarHandler = (e) => {
      if (e.keyCode === 32 && e.code === 'Space') {
        setStopped(true);
      }
    };
    window.addEventListener('keydown', spacebarHandler);

    return () => {
      window.removeEventListener('keydown', spacebarHandler, true);
    };
  }, [])

  // let similar venues now be new batch and repeat
  useEffect(() => {
    const isNewBatchReady = similarVenues.length === 0 && newBatch.length > 0 && requestDone;
    if (isNewBatchReady) {
      setSimilarVenues(newBatch);
      setNewBatch([]);
    }
  }, [newBatch, similarVenues, requestDone]);

  // add links and only new nodes for graph
  // push to new batch
  useEffect(() => {
    function addNodesToGraph(nodes, links) {
      setData(d => {
        nodes.forEach(node => {
          const isNodeAdded = d.nodes.filter(dataNode => dataNode.id === node.id).length > 0;
          if (!isNodeAdded) {
            d.nodes.push(node);
          }
        });

        d.links = [ ...d.links, ...links ];
        return { ...d };
      });
    }

    function addToNewBatch(batch) {
      setNewBatch(s => {
        s.push(...batch);
        return [ ...s ];
      });
    }

    let isSubscribed = true;
    if(lastVenue) {
      setRequestDone(false);
      if (clientId && clientSecret) {
        service.getSimilarVenuesGraphNodes(lastVenue.id, lastVenue.name, clientId, clientSecret)
          .then(({ newData, newSimilarVenues }) => {
            if (isSubscribed) {
              setRequestDone(true);
              const { nodes, links } = newData;
              addNodesToGraph(nodes, links);
              addToNewBatch(newSimilarVenues);
            }
          });
      }

    }
    return () => {
      isSubscribed = false;
    }
  }, [lastVenue, service, clientId, clientSecret]);

  // Periodically get similar venues once every 3 seconds unless stopped
  useEffect(() => {
    let isSubscribed = true;
    if (!stopped && similarVenues.length > 0) {
      const venueTimeout = setTimeout(() => {
        if (isSubscribed) {
          setLastVenue(similarVenues.pop());
          setSimilarVenues([ ...similarVenues ]);
        }
      }, 3000);
      setTimeoutId(venueTimeout);
    }

    return () => {
      isSubscribed = false;
    }
  }, [similarVenues, stopped]);

  // Initially get similar venues to the given venue
  useEffect(() => {
    let isSubscribed = true;
    function setInitialNodeAndSimilarVenues() {
      if (service && startVenue) {
        if (!data) {
          if (clientId && clientSecret) {
            service.getSimilarVenuesGraphNodes(startVenue.id, startVenue.name, clientId, clientSecret).then(({ newData, newSimilarVenues }) => {
              if (isSubscribed) {
                setData(newData);
                setSimilarVenues(newSimilarVenues);
              }
            });
          }
        }
      }
    }
    setInitialNodeAndSimilarVenues();

    return () => {
      isSubscribed = false;
    }
  }, [service, data, startVenue, clientId, clientSecret])

  return (
    <div className="similar-venues">
    <SimilarVenuesGraph data={data} />
    </div>
  )
}
