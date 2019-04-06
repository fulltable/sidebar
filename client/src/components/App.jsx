import React from 'react';
import axios from 'axios';
import InfoPiece from './InfoPiece.jsx';
import SearchBar from './SearchBar.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantId: 1,
      address: '',
      neighborhood: '',
      crossStreet: '',
      parking: '',
      dining: '',
      cuisines: '',
      hours: '',
      phone: '',
      website: '',
      payment: '',
      dress: '',
      additional: '',
      chef: '',
      catering: '',
      privateFacilities: '',
      restaurantLoaded: false,
    }
  }

  componentDidMount() {
    this.getRestaurantInfo();
  }

  search(e) {
    this.setState({
      restaurantId: e.target.value,
    }, () => {
      if (e.target.value && e.target.value <= 100 && e.target.value > 0) {
        this.getRestaurantInfo();
      }
    });
  }

  getRestaurantInfo() {
    axios.get(`/api/restaurants/${this.state.restaurantId}/info`)
      .then(response => {
        let newState = this.cleanupInfoObject(response.data);
        this.setState({ ...newState });
      })
  }

  cleanupInfoObject(infoObject) {
    delete infoObject.__v;
    delete infoObject._id;
    infoObject.privateFacilities = infoObject.privateFacilities || '';
    infoObject.catering = infoObject.catering || '';
    infoObject.restaurantLoaded = true;
    return infoObject;
  }

  render() {
    const infoKeys = Object.keys(this.state).filter(key => this.state[key] && key !== 'restaurantId' && key !== 'restaurantLoaded' && key !== 'address')
    let reactKey = 0;
    const infoComponents = infoKeys.map(key => {
      reactKey += 1;
      return <InfoPiece key={reactKey} title={key} value={this.state[key]} />
    })

    const styles = {
      base: {
        fontFamily: 'Brandon, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        width: 320,
        margin: '0 0 4em',
        display: 'block',
        WebkitBoxDirection: 'reverse',
      },
      mapContainer: {
        border: '1px solid #d8d9db',
        padding: '.25rem .25rem .5rem',
        borderRadius: '4px',
        marginBottom: '1rem',
      },
      address: {
        fontFamily: 'Brandon, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        color: '#da3743',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        textDecoration: 'none',
      },
      infoContainer: {
        padding: '0 .25rem',
      }
    }

    return (
      this.state.restaurantLoaded &&
      <div style={styles.base}>
        <SearchBar updateSearchText={this.search.bind(this)} />
        <div style={styles.mapContainer}>
          <div>
            <a target="_blank" rel="noopener" href="//www.google.com/maps/search/?api=1&query=Maggiano's%20-%20San%20Jose%203055%20Olin%20Avenue%2C%20Suite%201000%20Suite%201000%20San%20Jose%2C%20CA%20%2095128">
              <div style={{backgroundImage: 'url(staticmap.jpg)', backgroundSize: 'contain', height: '156px', margin: '0 0 1rem'}}></div>
            </a>
            <a style={styles.address} href="//www.google.com/maps/search/?api=1&query=Maggiano's%20-%20San%20Jose%203055%20Olin%20Avenue%2C%20Suite%201000%20Suite%201000%20San%20Jose%2C%20CA%20%2095128">
              {this.state.restaurantLoaded && (<InfoPiece key={0} title='address' value={this.state.address} />)}
            </a>
          </div>
        </div>
        <div style={styles.infoContainer}>{this.state.restaurantLoaded && infoComponents}</div>
      </div>
    );
  }
};

export default App;