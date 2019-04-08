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
        width: '640px',
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
        display: 'inline',
      },
      statsContainer: {
        display: 'flex',
        marginBottom: '1rem',
        flexWrap: 'wrap',
      },
      ratingsReviews: {
        height: '18px',
        padding: '0.25rem 0'
      },
      redStars: {
        height: '18px',
        maxWidth: (this.state.rating * 18) + 'px',
        overflow: 'hidden',
        display: 'inline',
        zIndex: 1,
        position: 'absolute',
        whiteSpace: 'nowrap',
      },
      star: {
        width: '18px',
        height: '18px',
        display: 'inline',
        overflow: 'hidden',
      },
      redStarCover: {
        width: ((18 * 5) - (this.state.rating * 18)) + 'px',
        backgroundColor: 'white',
        float: 'right',
        zIndex: 2,
        position: 'relative',
        height: '18px',
      },
      greyStars: {
        height: '18px',
        maxWidth: (this.state.rating * 18) + 'px',
        overflow: 'hidden',
        display: 'inline',
      },
      redStarCover: {
        width: ((18 * 5) - (this.state.rating * 18)) + 'px',
        backgroundColor: 'white',
        float: 'right',
        zIndex: 2,
        position: 'relative',
        height: '18px',
      },
      ratingContainer: {
        margin: '0 0.5rem',
        display: 'flex',
        alignItems: 'center',
      },
      rating: {
        fontFamily: 'Brandon-bold, apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        margin: '0 0.25rem',
        fontSize: '0.875rem',
        lineHeight: 1.43,
        fontWeight: 500,
      },
      statContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      statIcon: {
        height: '24px',
        width: '24px',
        display: 'block',
      },
      reviewLabel: {
        fontFamily: 'Brandon-light, apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        margin: '0 0.25rem',
        fontSize: '0.875rem',
        lineHeight: 1.43,
        fontWeight: 300,
        marginRight: '1rem',
      },
      darkLabel: {
        fontFamily: 'Brandon, apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        margin: '0 0.25rem',
        fontSize: '0.875rem',
        lineHeight: 1.43,
        fontWeight: 500,
        marginRight: '1rem',
      },
      tagsLabel: {
        fontFamily: 'Brandon-bold, apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        fontSize: '1.125rem',
      },
      tagsList: {
        listStyle: 'none',
        margin: '0 0 0 0.5rem',
        display: 'inline',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        paddingInlineStart: '10px',
      },
      tagListItem: {
        display: 'inline-block',
        margin: '0 0.5rem 0.5rem 0',
        textAlign: '-webkit-match-parent',
        listStyle: 'none',
      },
      tag: {
        fontFamily: 'Brandon-bold, apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
        fontSize: '.875rem',
        fontWeight: 500,
        lineHeight: 1,
        color: '#6f737b',
        border: '1px solid #d8d9db',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: 0,
        textAlign: '-webkit-match-parent',
        listStyle: 'none',
      },
      descriptionContainer: {
        color: '#2d333f',
        display: 'block'
      },
    }

    return (
      this.state.restaurantLoaded &&
      <div style={styles.base}>
        <SearchBar key={0} updateSearchText={this.search.bind(this)} />
        <div style={styles.base}>
          <div style={styles.main}>
            <div style={styles.titleContainer}>
              <h1 style={styles.title}>{this.state.name}</h1>
            </div>
            <div style={styles.statsContainer}>
              <div style={styles.ratingsReviews}>
                <div>
                  <div style={styles.redStars}>
                    <img src='icons/redstar.png' style={styles.star}></img>
                    <img src='icons/redstar.png' style={styles.star}></img>
                    <img src='icons/redstar.png' style={styles.star}></img>
                    <img src='icons/redstar.png' style={styles.star}></img>
                    <img src='icons/redstar.png' style={styles.star}></img>
                  </div>
                  <div style={styles.greyStars}>
                    <img src='icons/graystar.png' style={styles.star}></img>
                    <img src='icons/graystar.png' style={styles.star}></img>
                    <img src='icons/graystar.png' style={styles.star}></img>
                    <img src='icons/graystar.png' style={styles.star}></img>
                    <img src='icons/graystar.png' style={styles.star}></img>
                  </div>
                </div>
              </div>
              <div style={styles.ratingContainer}>
                <span style={styles.rating}>{this.state.rating}</span>
              </div>
              <div style={styles.statContainer}>
                <img src='icons/reviews.png' style={styles.statIcon}></img>
                <span style={styles.reviewLabel}>{this.state.reviewCount} reviews</span>
              </div>
              <div style={styles.statContainer}>
                <img src='icons/cost.png' style={styles.statIcon}></img>
                <span style={styles.darkLabel}>${this.state.costRange[0]} to ${this.state.costRange[1]}</span>
              </div>
              <div style={styles.statContainer}>
                <img src='icons/cuisines.png' style={styles.statIcon}></img>
                <span style={styles.darkLabel}>{this.state.cuisine}</span>
              </div>
            </div>
            <div style={styles.tagsContainer}>
              <span style={styles.tagsLable}>Top Tags:</span>
              <ul style={styles.tagsList}>
                {this.state.tags.map(tag => 
                  <li key={tag} style={styles.tagListItem}>
                    <div style={styles.tag}>{tag}</div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div style={styles.descriptionContainer}>
            <div>
              {this.state.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Overview;