import React, { Component } from 'react';
import ActivityItem from './ActivityItem';

class Content extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   activities: []
    // }
  }
  // 
  // componentWillMount() {
  //   this.setState = {
  //     activities: activities
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    // Check to see if the requestRefresh prop has changed
    if (nextProps.requestRefresh !== this.props.requestRefresh) {
      this.setState({loading: true}, this.updateData);
    }
  }

  render() {
    const {activities} = this.props; // ES6 destructuring

    return (
      <div className="content">
        <div className="line"></div>

        {/* Timeline item */}
        {activities.map((activity) => (
          <ActivityItem
            activity={activity} />
        ))}

      </div>
    );
  }
}

export default Content;
