import React from 'react';

const SearchBar = ({updateSearchText}) => {
  const styles = {
    base: {
      fontFamily: 'Brandon, Lato,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
      fontSize: '12px',
      color: '#2d333f',
      borderBottom: '1px solid #d8d9db',
      paddingBottom: '16px',
      margin: '0 0 16px 0',
      display: 'flex',
      justifyContent: 'space-between',
      width: "500px"
    }
  }
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input style={styles.base} type="number" min="1" max="100" name="text" placeholder="Enter Restaurant 1-100" onChange={e => {e.persist(); updateSearchText(e);}}></input>
      </form>
    </div>
  );
}

export default SearchBar;