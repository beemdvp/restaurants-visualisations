# Restaurants Visualisations
This application gives you the ability to search for restaurants in London. For
a selected restaurant selected, you will have periodic updates of similar
restaurants!

## Technical Details
### Component Design
The pattern that I peronsally use is the data owners pattern where components
own some data and within it are simply presentation components. If it was more
complex with deeply nested components, I would use the redux pattern to manage
state.

![architecture](https://www.plantuml.com/plantuml/img/RPB13e8m38RlVOg6EwzWC1YzU32QU34S6cXmaOrb6rwCx-uOXW3RRklN_VtRhh2EZ1ja1-24wnWlLB-ePOivbhtKlMBby22eDIG1z4Gncrc67q1_wZdviTUwsiQkx0iDXfIp4Rkp6lZO6vacPs5TcfHaceZSX1GTcP0GrrhHao7zhE0Bu2rZdkzmOHDWSGbmzfacey-8hEgbturT0CmIMx1IY3L33ul5tDYyHSs9jKpvVnwwNaM2j9y3GC6gyJ_Y1m00)

In the case of reusability VenueCard is being used by both VenueList and
Restaurants components.

#### Data Owners
- **Restaurants** - owns list of venues to select from
- **SimilarVenues** - owns list of similar venues

### Testing
The method of testing adopted is doing "component" testing. This means
interacting by dom and asserting with correct behaviour. Default
setup from create-react-app is used therefore **Jest** is being used as the
technology of choice.
