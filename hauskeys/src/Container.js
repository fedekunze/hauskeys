import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {refreshing: false}
  }

  refresh() {
    this.setState({refreshing: true})
  }

  onComponentRefresh() {
    this.setState({refreshing: false})
  }

  render() {
    const {refreshing} = this.state;
    return (
      <div className='notificationsFrame'>
        <div className='panel'>
          <Header title="Github activity" />
          {/* refreshing is the component's state */}
          <Content
            onComponentRefresh={this.onComponentRefresh.bind(this)}
            requestRefresh={refreshing}
            fetchData={fetchEvents} />
          {/* A container for styling */}
          <Footer>
            <button onClick={this.refresh.bind(this)}>
              <i className="fa fa-refresh" />
              Refresh
            </button>
          </Footer>
        </div>
      </div>
    );
  }

}

export default Container;
