import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <p>
                Made with <b>&lt;3</b> by Federico Kunze <br/>
                Email: <a href="mailto:fekunze@berkeley.edu" target="_top"> fekunze@berkeley.edu</a> <br/>
                &copy; All rights reserved
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Footer;
