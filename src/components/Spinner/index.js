import React from 'react';

class Spinner extends React.Component {
  render() {
    const { show } = this.props;
    
    return (
      <div className={show ? "":"hidden"}>
        <span className="spinner"></span>
      </div>
    );
  }
}

export default Spinner;