import React, { Component } from 'react';
import Content from './Content';
import Footer from './Footer';
import Form from './Form';
import Navb from './Navb';
import {Button, Jumbotron } from 'react-bootstrap';
import {Grid, Row, Col, Image, Thumbnail, Modal, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import './App.css';
import {escrowContract, web3, address} from './EthereumSetup';



const activities = [
  {
    timestamp: new Date().getTime(),
    text: "Ate lunch",
    user: {
      id: 1, name: 'Nate',
      avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
    },
    comments: [{ from: 'Ari', text: 'Me too!' }]
  },
  {
    timestamp: new Date().getTime(),
    text: "Woke up early for a beautiful run",
    user: {
      id: 2, name: 'Ari',
      avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
    },
    comments: [{ from: 'Nate', text: 'I am so jealous' }]
  },
]

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
       show: false,
       response: {},
       contract: escrowContract,
       web3: web3,
       form_zip: '',
       form_country: '',
       form_state: '',
       form_rooms: '',
       form_rent: '',
    }
  }

  getZipState() {
    var isnum = /^\d+$/.test(this.state.form_zip);
    const length = this.state.form_zip.length;
    if (isnum) return 'success';
    else if (length > 0) return 'error';
  }

  getRentState() {
    var isnum = /^\d+$/.test(this.state.form_rent);
    const length = this.state.form_rent.length;
    if (isnum) return 'success';
    else if (length > 0) return 'error';
  }

  getValidationState() {
    const length = this.state.form_state.length;
    if (length > 2) return 'error';
  }

  getRoomsState() {
    var isnum = /^\d+$/.test(this.state.form_rooms);
    const length = this.state.form_rooms.length;
    if (isnum) return 'success';
    else if (length > 0) return 'error';
  }

  handleZipChange = (e) => {
    this.setState({form_zip: e.target.value });
  }

  handleRentChange = (e) => {
    this.setState({form_rent: e.target.value });
  }

  handleRoomsChange = (e) => {
    this.setState({form_rooms: e.target.value });
  }

  handleStateChange = (e) => {
    this.setState({form_state: e.target.value.toUpperCase()});
  }


  render() {

    let close = () => this.setState({ show: false});

    // const unitItems = this.props.units.map(unit =>
    //   <Col xs={6} md={4}>
    //     <Thumbnail onClick={() => this.openModal(unit)}
    //         className="thumbnail"
    //         src={unit.snippet.thumbnails.default.url}
    //         alt={unit.snippet.description}
    //         key={uid()}
    //     >
    //         <h3>{unit.title}</h3>
    //         <p>{unit.snippet.description}</p>
    //         <h5>Rent: ${unit.snippet.rent}<i>/mo</i></h5>
    //         <hr />
    //         <i>Date: {video.snippet.publishedAt}</i>
    //     </Thumbnail>
    //   </Col>
    // );

    return (
      <div>
        <Navb/>
        <Jumbotron className="banner">
          <Grid>
            <h1>Hauskeys</h1>
            <p>We help preventing scams in the real state industry</p>
          </Grid>
        </Jumbotron>
          <Grid>
            <Row className="subtitle">
              <Col xs={12} md={4}>
                <Image className="logo-big" src={require('./hk.jpg')}/>
              </Col>
              <Col xs={12} md={8}>
                <Row>
                  <Col xs={1} md={3}></Col>
                  <Col xs={4} md={6}><h2 className="h2sub"> Upload a new unit</h2></Col>
                  <Col xs={1} md={3}></Col>
                </Row>
                <FormGroup
                  controlId="formBasicText"
                >
                  <FormControl
                    type="text"
                    placeholder="Address"
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formBasicText"
                >
                  <FormControl
                    type="text"
                    placeholder="Apt/Room Number"
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getZipState()}
                >
                  <FormControl
                    type="text"
                    value={this.state.form_zip}
                    placeholder="Zip Code"
                    onChange={this.handleZipChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationState()}
                >
                  <FormControl
                    type="text"
                    value={this.state.form_state}
                    placeholder="State"
                    onChange={this.handleStateChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                  <FormControl componentClass="select" placeholder="select">
                    <option value="">Select country</option>
                    <option value="AF">Afghanistan</option>
                  	<option value="AX">Åland Islands</option>
                  	<option value="AL">Albania</option>
                  	<option value="DZ">Algeria</option>
                  	<option value="AS">American Samoa</option>
                  	<option value="AD">Andorra</option>
                  	<option value="AO">Angola</option>
                  	<option value="AI">Anguilla</option>
                  	<option value="AQ">Antarctica</option>
                  	<option value="AG">Antigua and Barbuda</option>
                  	<option value="AR">Argentina</option>
                  	<option value="AM">Armenia</option>
                  	<option value="AW">Aruba</option>
                  	<option value="AU">Australia</option>
                  	<option value="AT">Austria</option>
                  	<option value="AZ">Azerbaijan</option>
                  	<option value="BS">Bahamas</option>
                  	<option value="BH">Bahrain</option>
                  	<option value="BD">Bangladesh</option>
                  	<option value="BB">Barbados</option>
                  	<option value="BY">Belarus</option>
                  	<option value="BE">Belgium</option>
                  	<option value="BZ">Belize</option>
                  	<option value="BJ">Benin</option>
                  	<option value="BM">Bermuda</option>
                  	<option value="BT">Bhutan</option>
                  	<option value="BO">Bolivia, Plurinational State of</option>
                  	<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                  	<option value="BA">Bosnia and Herzegovina</option>
                  	<option value="BW">Botswana</option>
                  	<option value="BV">Bouvet Island</option>
                  	<option value="BR">Brazil</option>
                  	<option value="IO">British Indian Ocean Territory</option>
                  	<option value="BN">Brunei Darussalam</option>
                  	<option value="BG">Bulgaria</option>
                  	<option value="BF">Burkina Faso</option>
                  	<option value="BI">Burundi</option>
                  	<option value="KH">Cambodia</option>
                  	<option value="CM">Cameroon</option>
                  	<option value="CA">Canada</option>
                  	<option value="CV">Cape Verde</option>
                  	<option value="KY">Cayman Islands</option>
                  	<option value="CF">Central African Republic</option>
                  	<option value="TD">Chad</option>
                  	<option value="CL">Chile</option>
                  	<option value="CN">China</option>
                  	<option value="CX">Christmas Island</option>
                  	<option value="CC">Cocos (Keeling) Islands</option>
                  	<option value="CO">Colombia</option>
                  	<option value="KM">Comoros</option>
                  	<option value="CG">Congo</option>
                  	<option value="CD">Congo, the Democratic Republic of the</option>
                  	<option value="CK">Cook Islands</option>
                  	<option value="CR">Costa Rica</option>
                  	<option value="CI">Côte d&apos;Ivoire</option>
                  	<option value="HR">Croatia</option>
                  	<option value="CU">Cuba</option>
                  	<option value="CW">Curaçao</option>
                  	<option value="CY">Cyprus</option>
                  	<option value="CZ">Czech Republic</option>
                  	<option value="DK">Denmark</option>
                  	<option value="DJ">Djibouti</option>
                  	<option value="DM">Dominica</option>
                  	<option value="DO">Dominican Republic</option>
                  	<option value="EC">Ecuador</option>
                  	<option value="EG">Egypt</option>
                  	<option value="SV">El Salvador</option>
                  	<option value="GQ">Equatorial Guinea</option>
                  	<option value="ER">Eritrea</option>
                  	<option value="EE">Estonia</option>
                  	<option value="ET">Ethiopia</option>
                  	<option value="FK">Falkland Islands (Malvinas)</option>
                  	<option value="FO">Faroe Islands</option>
                  	<option value="FJ">Fiji</option>
                  	<option value="FI">Finland</option>
                  	<option value="FR">France</option>
                  	<option value="GF">French Guiana</option>
                  	<option value="PF">French Polynesia</option>
                  	<option value="TF">French Southern Territories</option>
                  	<option value="GA">Gabon</option>
                  	<option value="GM">Gambia</option>
                  	<option value="GE">Georgia</option>
                  	<option value="DE">Germany</option>
                  	<option value="GH">Ghana</option>
                  	<option value="GI">Gibraltar</option>
                  	<option value="GR">Greece</option>
                  	<option value="GL">Greenland</option>
                  	<option value="GD">Grenada</option>
                  	<option value="GP">Guadeloupe</option>
                  	<option value="GU">Guam</option>
                  	<option value="GT">Guatemala</option>
                  	<option value="GG">Guernsey</option>
                  	<option value="GN">Guinea</option>
                  	<option value="GW">Guinea-Bissau</option>
                  	<option value="GY">Guyana</option>
                  	<option value="HT">Haiti</option>
                  	<option value="HM">Heard Island and McDonald Islands</option>
                  	<option value="VA">Holy See (Vatican City State)</option>
                  	<option value="HN">Honduras</option>
                  	<option value="HK">Hong Kong</option>
                  	<option value="HU">Hungary</option>
                  	<option value="IS">Iceland</option>
                  	<option value="IN">India</option>
                  	<option value="ID">Indonesia</option>
                  	<option value="IR">Iran, Islamic Republic of</option>
                  	<option value="IQ">Iraq</option>
                  	<option value="IE">Ireland</option>
                  	<option value="IM">Isle of Man</option>
                  	<option value="IL">Israel</option>
                  	<option value="IT">Italy</option>
                  	<option value="JM">Jamaica</option>
                  	<option value="JP">Japan</option>
                  	<option value="JE">Jersey</option>
                  	<option value="JO">Jordan</option>
                  	<option value="KZ">Kazakhstan</option>
                  	<option value="KE">Kenya</option>
                  	<option value="KI">Kiribati</option>
                  	<option value="KP">Korea, Democratic People&apos;s Republic of</option>
                  	<option value="KR">Korea, Republic of</option>
                  	<option value="KW">Kuwait</option>
                  	<option value="KG">Kyrgyzstan</option>
                  	<option value="LA">Lao People&apos;s Democratic Republic</option>
                  	<option value="LV">Latvia</option>
                  	<option value="LB">Lebanon</option>
                  	<option value="LS">Lesotho</option>
                  	<option value="LR">Liberia</option>
                  	<option value="LY">Libya</option>
                  	<option value="LI">Liechtenstein</option>
                  	<option value="LT">Lithuania</option>
                  	<option value="LU">Luxembourg</option>
                  	<option value="MO">Macao</option>
                  	<option value="MK">Macedonia, the former Yugoslav Republic of</option>
                  	<option value="MG">Madagascar</option>
                  	<option value="MW">Malawi</option>
                  	<option value="MY">Malaysia</option>
                  	<option value="MV">Maldives</option>
                  	<option value="ML">Mali</option>
                  	<option value="MT">Malta</option>
                  	<option value="MH">Marshall Islands</option>
                  	<option value="MQ">Martinique</option>
                  	<option value="MR">Mauritania</option>
                  	<option value="MU">Mauritius</option>
                  	<option value="YT">Mayotte</option>
                  	<option value="MX">Mexico</option>
                  	<option value="FM">Micronesia, Federated States of</option>
                  	<option value="MD">Moldova, Republic of</option>
                  	<option value="MC">Monaco</option>
                  	<option value="MN">Mongolia</option>
                  	<option value="ME">Montenegro</option>
                  	<option value="MS">Montserrat</option>
                  	<option value="MA">Morocco</option>
                  	<option value="MZ">Mozambique</option>
                  	<option value="MM">Myanmar</option>
                  	<option value="NA">Namibia</option>
                  	<option value="NR">Nauru</option>
                  	<option value="NP">Nepal</option>
                  	<option value="NL">Netherlands</option>
                  	<option value="NC">New Caledonia</option>
                  	<option value="NZ">New Zealand</option>
                  	<option value="NI">Nicaragua</option>
                  	<option value="NE">Niger</option>
                  	<option value="NG">Nigeria</option>
                  	<option value="NU">Niue</option>
                  	<option value="NF">Norfolk Island</option>
                  	<option value="MP">Northern Mariana Islands</option>
                  	<option value="NO">Norway</option>
                  	<option value="OM">Oman</option>
                  	<option value="PK">Pakistan</option>
                  	<option value="PW">Palau</option>
                  	<option value="PS">Palestinian Territory, Occupied</option>
                  	<option value="PA">Panama</option>
                  	<option value="PG">Papua New Guinea</option>
                  	<option value="PY">Paraguay</option>
                  	<option value="PE">Peru</option>
                  	<option value="PH">Philippines</option>
                  	<option value="PN">Pitcairn</option>
                  	<option value="PL">Poland</option>
                  	<option value="PT">Portugal</option>
                  	<option value="PR">Puerto Rico</option>
                  	<option value="QA">Qatar</option>
                  	<option value="RE">Réunion</option>
                  	<option value="RO">Romania</option>
                  	<option value="RU">Russian Federation</option>
                  	<option value="RW">Rwanda</option>
                  	<option value="BL">Saint Barthélemy</option>
                  	<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                  	<option value="KN">Saint Kitts and Nevis</option>
                  	<option value="LC">Saint Lucia</option>
                  	<option value="MF">Saint Martin (French part)</option>
                  	<option value="PM">Saint Pierre and Miquelon</option>
                  	<option value="VC">Saint Vincent and the Grenadines</option>
                  	<option value="WS">Samoa</option>
                  	<option value="SM">San Marino</option>
                  	<option value="ST">Sao Tome and Principe</option>
                  	<option value="SA">Saudi Arabia</option>
                  	<option value="SN">Senegal</option>
                  	<option value="RS">Serbia</option>
                  	<option value="SC">Seychelles</option>
                  	<option value="SL">Sierra Leone</option>
                  	<option value="SG">Singapore</option>
                  	<option value="SX">Sint Maarten (Dutch part)</option>
                  	<option value="SK">Slovakia</option>
                  	<option value="SI">Slovenia</option>
                  	<option value="SB">Solomon Islands</option>
                  	<option value="SO">Somalia</option>
                  	<option value="ZA">South Africa</option>
                  	<option value="GS">South Georgia and the South Sandwich Islands</option>
                  	<option value="SS">South Sudan</option>
                  	<option value="ES">Spain</option>
                  	<option value="LK">Sri Lanka</option>
                  	<option value="SD">Sudan</option>
                  	<option value="SR">Suriname</option>
                  	<option value="SJ">Svalbard and Jan Mayen</option>
                  	<option value="SZ">Swaziland</option>
                  	<option value="SE">Sweden</option>
                  	<option value="CH">Switzerland</option>
                  	<option value="SY">Syrian Arab Republic</option>
                  	<option value="TW">Taiwan, Province of China</option>
                  	<option value="TJ">Tajikistan</option>
                  	<option value="TZ">Tanzania, United Republic of</option>
                  	<option value="TH">Thailand</option>
                  	<option value="TL">Timor-Leste</option>
                  	<option value="TG">Togo</option>
                  	<option value="TK">Tokelau</option>
                  	<option value="TO">Tonga</option>
                  	<option value="TT">Trinidad and Tobago</option>
                  	<option value="TN">Tunisia</option>
                  	<option value="TR">Turkey</option>
                  	<option value="TM">Turkmenistan</option>
                  	<option value="TC">Turks and Caicos Islands</option>
                  	<option value="TV">Tuvalu</option>
                  	<option value="UG">Uganda</option>
                  	<option value="UA">Ukraine</option>
                  	<option value="AE">United Arab Emirates</option>
                  	<option value="GB">United Kingdom</option>
                  	<option value="US">United States</option>
                  	<option value="UM">United States Minor Outlying Islands</option>
                  	<option value="UY">Uruguay</option>
                  	<option value="UZ">Uzbekistan</option>
                  	<option value="VU">Vanuatu</option>
                  	<option value="VE">Venezuela, Bolivarian Republic of</option>
                  	<option value="VN">Viet Nam</option>
                  	<option value="VG">Virgin Islands, British</option>
                  	<option value="VI">Virgin Islands, U.S.</option>
                  	<option value="WF">Wallis and Futuna</option>
                  	<option value="EH">Western Sahara</option>
                  	<option value="YE">Yemen</option>
                  	<option value="ZM">Zambia</option>
                  	<option value="ZW">Zimbabwe</option>
                  </FormControl>
                </FormGroup>
                <hr/>
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getRentState()}
                >
                  <FormControl
                    type="text"
                    value={this.state.form_rent}
                    placeholder="Monthly Rent ($/mo)"
                    onChange={this.handleRentChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getRoomsState()}
                >
                  <FormControl
                    type="text"
                    value={this.state.form_rooms}
                    placeholder="Number of rooms"
                    onChange={this.handleRoomsChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <Row>
                  <Col xs={1} md={4}></Col>
                  <Col xs={4} md={4}><Button bsSize="large" block>Upload</Button></Col>
                  <Col xs={1} md={4}></Col>
                </Row>
              </Col>
            </Row>
          </Grid>
            <hr/>
          <Grid>
            <Row className="subtitle">
              <h2 className="h2sub">Available units in your area</h2>
            </Row>
            <Row className="unit-row">
              <Col xs={12} md={4} className="unit-thumb">
                <Thumbnail src={require('./oak.jpg')} alt="242x200">
                  <h3>Unit Title</h3>
                  <p>Description</p>
                  <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.setState({ show: true})}
                  >
                    See more
                  </Button>
                </Thumbnail>
              </Col>
              <Col xs={12} md={4} className="unit-thumb">
                <Thumbnail  src={require('./lapham.jpg')} alt="242x200">
                  <h3>Unit Title</h3>
                  <p>Description</p>
                  <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.setState({ show: true})}
                  >
                    See more
                  </Button>
                </Thumbnail>
              </Col>
              <Col xs={12} md={4} className="unit-thumb">
                <Thumbnail src={require('./north.jpg')} alt="242x200">
                  <h3>Unit Title</h3>
                  <p>Description</p>
                  <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.setState({ show: true})}
                  >
                    See more
                  </Button>
                </Thumbnail>
              </Col>
            </Row>
          </Grid>
          <Footer/>
          <Modal
            show={this.state.show}
            onHide={close}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Unit Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Rent</h4>
              <p>
                $price <i>/mo</i>
              </p>
              <h4>Description</h4>
              <p>
                A small description of the unit
              </p>
              <h4>Information</h4>
              <p>
                Address:<br/>
                Rooms:<br/>
              </p>
              <h4>Landlord</h4>
              <p>
                Address
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={close}>Close</Button>
            </Modal.Footer>
          </Modal>

      </div>
    );
  }
}


export default App;
