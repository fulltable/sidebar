import React from 'react';
import { callbackify } from 'util';

const InfoPiece = ({ title, value }) => {
  const titleStrings = {
    address: '',
    neighborhood: 'Neighborhood',
    crossStreet: 'Cross street',
    parking: 'Parking details',
    dining: 'Dining Style',
    cuisines: 'Cuisines',
    hours: 'Hours of operation',
    phone: 'Phone number',
    website: 'Website',
    payment: 'Payment options',
    dress: 'Dress code',
    additional: 'Additional',
    chef: 'Executive chef',
    catering: 'Catering',
    privateFacilities: 'Private Facilities',
  }
  const styles = {
    container: {
      margin: '0 0 1rem',
      width: 312,
    },
    main: {
      display: 'flex',
      textOverflow: 'ellipses',
      textDecoration: 'inherit',
    },
    iconContainer: {
      flexShrink: 0,
      margin: 'calc(.5 * calc(calc(.875rem*1.43) - 1.5rem)) 0 0',
      boxSizing: 'border-box',
      display: 'box',
    },
    icon: {
      background: 'rgb(255, 255, 255)',
      verticalAlign: 'middle',
      overflow: 'hidden',
      width: '24px',
      height: '24px',
    },
    textContainer: {
      alignSelf: 'center',
      margin: '0 0 0 .25rem',
      display: 'block',
    },
    title: {
      fontFamily: 'Brandon-Bold, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
      display: 'block',
    },
    value: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      display: 'block',
      color: (title === 'website' || title === 'address') ? '#da3743' : '#000',
    }
  }
  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <div style={styles.iconContainer}>
          <img style={styles.icon} src={`https://s3-us-west-1.amazonaws.com/opentabs-sidebar/icons/${title}.png`}></img>
        </div>
        <div style={styles.textContainer}>
          <div style={styles.title}>
            <span>{titleStrings[title]}</span>
          </div>
          <div style={styles.value}>{value}</div>
        </div>
      </div>
    </div>
  )
}

export default InfoPiece;