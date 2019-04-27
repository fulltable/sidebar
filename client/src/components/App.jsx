import React from 'react';
import axios from 'axios';
import InfoPiece from './InfoPiece.jsx';

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
    const splitUrl = window.location.pathname.split('/');
    const rId = Number.parseInt(splitUrl[splitUrl.length - 1]) ||  Number.parseInt(splitUrl[splitUrl.length - 2]);
    this.setState({
      restaurantId: rId
    }, this.getRestaurantInfo);
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
    const infoKeys = Object.keys(this.state).filter(key => this.state[key] && key !== 'restaurantId' && key !== 'restaurantLoaded' && key !== 'address' && key !== 'restaurantid')
    let reactKey = 0;
    const infoComponents = infoKeys.map(key => {
      reactKey += 1;
      return <InfoPiece key={reactKey} title={key} value={this.state[key]} />
    })

    const styles = {
      container: {
        width: '320px',
        margin: '0 0 0 1rem',
        display: 'block'
      },
      boxContainer: {
        boxShadow: '0 2px 8px rgba(153,153,153,.4)',
        marginBottom: '2rem',
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
      },
      reservationTitleContainer: {
        height: '48px',
        display: 'flex',
        WebkitBoxPack: 'end',
        justifyContent: 'flex-end',
        WebkitBoxOrient: 'vertical',
        WebkitBoxDirection: 'normal',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderTopLeftRadius: '2px',
        BorderTopRightRadius: '2px',
        textAlign: 'center',
        padding: '1rem',
        position: 'relative',
        paddingBottom: 0,
      },
      reservationTitle: {
        fontFamily: 'Brandon-bold, apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        fontWeight: 700,
        lineHeight: '24px',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        textAlign: 'center',
        borderBottom: '1px solid #d8d9db',
      },
      reservationFunctionalContainer: {
        padding: '.5rem 1rem 1rem',
        borderBottomLeftRadius: '2px',
        borderBottomRightRadius: '2px',
        backgroundColor: '#fff',
        paddingTop: 0,
      },
      buttonContainer: {
        display: 'flex',
        margin: '1rem auto 0',
        overflow: 'hidden',
        width: '100%',
      },
      button: {
        fontFamily: 'Brandon, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        padding: '.75rem 1rem',
        textDecoration: 'none',
        backgroundColor: '#da3743',
        color: '#fff',
        border: 'none',
        fontSize: '1rem',
        lineHeight: 1.5,
        width: '18rem',
        fontWeight: 500,
        borderRadius: '2px',
        display: 'inline-block',
        boxSizing: 'border-box',
        WebkitAppearance: 'button',
        cursor: 'pointer',
        textTransform: 'none',
        overflow: 'visible',
      },
      reservationBottomContainer: {
        margin: '1rem 0 0',
      },
      reservationBottom: {
        display: 'flex',
        textOverflow: 'ellipsis',
      },
      bookedIcon: {
        boxSizing: 'border-box',
        verticalAlign: 'middle',
        overflow: 'hidden',
        width: '24px',
        height: '24px',
      },
      bookedContainer: {
        alignSelf: 'center',
        margin: '0 0 0 .25rem',
        display: 'block',
      },
      booked: {
        fontFamily: 'Brandon, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        display: 'block',
      },
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
      },
      map: {
        backgroundImage: `url(https://s3-us-west-1.amazonaws.com/opentabs-sidebar/pics/staticmap.jpg)`, 
        backgroundSize: 'contain', 
        height: '156px',
        margin: '0 0 1rem',
      },
    }

    return (
      this.state.restaurantLoaded &&
      <div style={styles.base}>
        <div>
          <div style={styles.container}>
            <div style={styles.boxContainer}>
              <div style={{paddingBottom: '1rem'}}>
                <div>
                  <div style={styles.reservationTitleContainer}>
                    <h3 style={styles.reservationTitle}>
                      <span>Make a reservation</span>
                    </h3>
                  </div>
                  <div style={styles.reservationFunctionalContainer}>
                    <div style={styles.buttonContainer}>
                      <button style={styles.button}>Find a Table</button>
                    </div>
                    <div style={styles.reservationBottomContainer}>
                      <div style={styles.reservationBottom}>
                        <img style={styles.bookedIcon} src={`https://s3-us-west-1.amazonaws.com/opentabs-sidebar/icons/booked.png`}></img>
                        <div style={styles.bookedContainer}>
                          <div style={styles.booked}>
                            Booked {Math.floor(Math.random() * 200) + 2} times today
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.mapContainer}>
              <div>
                <a target="_blank" rel="noopener" href="//www.google.com/maps/search/?api=1&query=Maggiano's%20-%20San%20Jose%203055%20Olin%20Avenue%2C%20Suite%201000%20Suite%201000%20San%20Jose%2C%20CA%20%2095128">
                  <div style={styles.map}></div>
                </a>
                <a style={styles.address} href="//www.google.com/maps/search/?api=1&query=Maggiano's%20-%20San%20Jose%203055%20Olin%20Avenue%2C%20Suite%201000%20Suite%201000%20San%20Jose%2C%20CA%20%2095128">
                  {this.state.restaurantLoaded && (<InfoPiece key={0} title='address' value={this.state.address} />)}
                </a>
              </div>
            </div>
            <div style={styles.infoContainer}>{this.state.restaurantLoaded && infoComponents}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;