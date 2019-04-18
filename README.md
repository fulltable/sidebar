# sidebar

> The sidebar module for the OpenTabs FEC. The sidebar module shows the important information for each restaurant (e.g. hours, dress code, cuisines, neighborhood, etc.). There is a map with address on top, when clicked it will open a new tab with Google Maps and the
specific address.

## Related Projects

  - https://github.com/opentabs/menu
  - https://github.com/opentabs/photo-carousel
  - https://github.com/opentabs/reviews
  - https://github.com/opentabs/reservation-calendar

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## CRUD API
The sidebar module has the following functions:

1. Add a resturant - (CREATE)
It is possible to add a resturant. Admin or user can post a new resturant.

POST - /api/resturant/

2. Get all resturant info per accommodation - (READ)
The components can retrieve the resturant detailed info from the database for a specific accommodation

GET - /api/resturant/:accommodationid

3. Potentially update booked dates after booking is reserved - (UPDATE)
The components can update the booked dates from the database for a specific accommodation

PUT - /api/resturant/:accommodationid

4. Potentially delete the closed resturants or any special case (DELETE)
The components can delete the resturant data from the database for a specific accommodation

DELETE - /api/resturant/:accommodationid

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

