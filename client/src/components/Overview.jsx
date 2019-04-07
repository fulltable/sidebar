import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantId: 1,
      name: '',
      rating: 0,
      reviewCount: 0,
      costRange: [],
      cuisine: '',
      tags: [],
      description: '',
      restaurantLoaded: false,
    }
  }

  componentDidMount() {
    this.getOverview();
  }

  search(e) {
    this.setState({
      restaurantId: e.target.value,
    }, () => {
      if (e.target.value && e.target.value <= 100 && e.target.value > 0) {
        this.getOverview();
      }
    });
  }

  getOverview() {
    axios.get(`/api/restaurants/${this.state.restaurantId}/overview`)
      .then(response => {
        let newState = this.cleanupInfoObject(response.data);
        this.setState({ ...newState });
      })
  }

  cleanupInfoObject(infoObject) {
    delete infoObject.__v;
    delete infoObject._id;
    infoObject.restaurantLoaded = true;
    return infoObject;
  }

  render() {
    const styles = {  
      base: {
        fontFamily: 'Brandon, apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        padding: '2rem 1rem 4rem',
        display: 'block',
        WebkitBoxDirection: 'reverse',
      },
      main: {
        margin: '0 0 2rem',
      },
      titleContainer: {
        paddingBottom: '2rem',
        borderBottom: '1px solid #d8d9db',
        margin: '0 0 1rem',
      },
      title: {
        fontFamily: 'Brandon-bold, apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        color: '#2d333f',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '48px',
        fontWeight: 700,
        lineHeight: '56px',
        marginBlockStart: '0.67em',
        margindBlockEnd: '0.67em',
        marginInlineStart: 0,
        marginInlineEnd: 0,
      },
      statsContainer: {
        display: 'flex',
        marginBottom: '1rem',
        flexWrap: 'wrap',
      },
      ratingsReviews: {
        
      }

    }

    return (
      this.state.restaurantLoaded &&
      <div style={styles.base}>
        <SearchBar updateSearchText={this.search.bind(this)} />
        <div style={styles.base}>
          <div style={styles.main}>
            <div style={styles.titleContainer}>
              <h1 style={styles.title}>{this.state.name}</h1>
            </div>
            <div style={styles.statsContainer}>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Overview;