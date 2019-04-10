// packages
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Transition, animated, Spring } from 'react-spring'

// components
import Loading from './components/loading';
import logo from './images/posh_weather.svg';
// import some css variables to be used by styled-components
import { colors, fonts, view } from './config/_variables';
// import placeholder data for testing
import placeholder from './config/placeholder_weather'
// import objects that match an index to the corresponding array of values
import { dayOfWeek, getTheMonth, dateInMonth, TwentyFourToTwleve } from './config/date_data'
// imports the dlc data object (later to be mapped)
import DlcData from './config/dlc_data'

// global variables (process.env.*VAR_NAME* pulls in keys from a hidden .env file)
const apiKey = process.env.REACT_APP_CONFIG_DARK_SKY;
// set constant url paths for easier use when fetching data
const darkSkyUrl = "https://api.darksky.net/forecast/";
const herokuCORS = "https://cors-anywhere.herokuapp.com/";

// init mapbox
const mapboxKey = process.env.REACT_APP_MAPBOX_CONFIG;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapboxKey });

// main App component
class App extends Component {
  constructor(props) {
    super(props);

    // setting state for values
    this.state = {
      loading: false,
      index: 0,
      DLCbutton: false,
      allWeatherData: placeholder,
      geoCodeData: '',
      renderSearchOptions: [],
      interimLocationVal: '',
      bareView: true,
      ExtendedView: false,
      DailyForecast: false,
      WeeklyForecast: false,
      ExtensiveWeather: false,
      ClassyAudio: false,
      dlcView: false,
    }
  }

  checkUserDLC() {  
    // checks localStorage to see if values (DLC) currently exists and then append them to state
    if (localStorage.getItem('Extended Current') === 'unlocked') {
      this.setState({
        ExtendedView: true,
        bareView: false
      });
    } else {
      this.setState({
        ExtendedView: false,
        bareView: true
      });
    }
    if (localStorage.getItem('Daily Forecast') !== null) {
      this.setState({
        DailyForecast: true
      });
    }
    if (localStorage.getItem('Weekly Forecast') !== null) {
      this.setState({
        WeeklyForecast: true
      });
    }
    if (localStorage.getItem('Extensive Weather') !== null) {
      this.setState({
        ExtensiveWeather: true
      });
    }
    if (localStorage.getItem('Classy Audio') !== null) {
      this.setState({
        ClassyAudio: true
      });
    }
  }

  componentDidMount() {
    // checks local storage if user has entered a name
    if (typeof localStorage === "undefined" || localStorage === null) {
      let LocalStorage = require('node-localstorage').LocalStorage;
      // eslint-disable-next-line
      localStorage = new LocalStorage('./scratch');
    }

    if (localStorage.getItem('username') === null) {
      localStorage.setItem('username', 'User');
    }

    if (localStorage.getItem('location_name') === null) {
      localStorage.setItem('location_name', 'Location');
    }

    // check user DLC 
    this.checkUserDLC();

    // if user data does exist - skip the welcome screens and go straight to the data
    if (localStorage.getItem('username') !== 'User' && localStorage.getItem('location_name') !== 'Location') {
      this.setState({
        index: 4
      });
    }
  }

  // mapBox geocoding request -> turns location string (full or part) into data (lat/lon/full location text)
  getUserLocation(user_query) {
    geocodingClient.forwardGeocode({
      query: user_query,
      limit: 5
    })
    .send()
    .then(response => {
      if (this.state.renderSearchOptions !== response.body.features) {
        this.setState({
          renderSearchOptions: response.body.features
        });
      }
    });
  }
  getAllWeatherData() {
    if (this.state.index !== 4) {
      // returns a console log to stop re-calling the weather data + hitting the 1000 request per day cap
      return console.log('got the data, stop running so we dont overload the API');	
    }
    // gets weather data based on the users lon/lat
    // checks if placeholder data is still placeholder data and sets the loading component to true
    if (this.state.allWeatherData === placeholder) {
      this.setState({
        loading: true
      })
    }

    // set placeholder values for empty location input
    let lonBefore = 149.0875;
    let latBefore = -35.238888888889;
    let locationNameBefore = "University of Canberra";

    // check if user entered location co-ordinates + change place holder values if they did
    if (this.state.renderSearchOptions[0] !== undefined) {
      
      console.log('this.state.renderSearchOptions === null/undefined')
      lonBefore = this.state.renderSearchOptions[0].geometry.coordinates[0];
      latBefore = this.state.renderSearchOptions[0].geometry.coordinates[1]
      locationNameBefore = this.state.renderSearchOptions[0].text;
    }

    // check if local storage data exits
    if (localStorage.getItem('location_name') === null ||
        localStorage.getItem('location_lon') === null ||
        localStorage.getItem('location_lat') === null
    ) {
      console.log('localStorage stuff doesnt exist')
      localStorage.setItem('location_lon', lonBefore)
      localStorage.setItem('location_lat', latBefore)
      localStorage.setItem('location_name', locationNameBefore)
    }

    // set lat/lon to the localStorage data
    let lon = localStorage.getItem('location_lon');
    let lat = localStorage.getItem('location_lat');

    // API calling DarkSky passing in
    //    - herokuCORS (to stop Cross Origin errors)
    //    - darkSkyUrl (constant defined globally / static url wont change)
    //    - apiKey (secret API key imported from .env file)
    //    - lon/lat (use the previously set variables of lat + lon)
    axios({
        method: 'GET',
        url: herokuCORS + darkSkyUrl + apiKey + "/" + lat + "," + lon +"",
        responseType: 'json',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        mode: 'no-cors',
        params: {
          units: "auto"
        }
    }).catch(function (error) {
      if (error.response.status === 403) {
        alert('maximum API requests reached for the day - come back and try again tomorrow')
      }
    }).then( (response) => {
        // just a bit of error handling on the call / user will get an alert if the request fails
        this.setState({
            allWeatherData: null,
            loading: true
        });
        // if we have data - set loading to false and assign data to allWeatherData
        if (response !== undefined) {
          this.setState({
            allWeatherData: response.data,
            loading: false
        });
        }
    });

    // adds one to the index state (stop the call being made multiple times)
    
    // this.incrementIndexByOne(this.state.index);
    // console.log("this.state.index (after increment) => ", this.state.index);
    
    if (this.state.index === 4) {
      let oldIndex = this.state.index
      oldIndex = oldIndex + 1
      this.setState({
        index: oldIndex
      });
    }
  }

  // gets todays date - passes the value to the dayOfWeek + dateInMonth + getTheMonth array imports declared at the top
  // returns a string of the date. e.g. Thursday 20th of September
  getTheDate() {
    let today = new Date();
    let returnTime = dayOfWeek[today.getDay()] + ' ' + dateInMonth[today.getDate() - 1] + ' of ' + getTheMonth[today.getMonth()]; 
    return returnTime
  }

  // converts the raw degrees data into a readable string
  degreesToDirection(num) {
      var val = Math.floor((num / 22.5) + 0.5);
      var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      return arr[(val % 16)];
  }

  // 24hr forecast
  mapDailyForecastTime(weather_data) {
    // maps over each value in the weather_data variable
    let dailyForecast = weather_data.map((key, index) => {
      // caps hours to 24hrs (dont return more than 24hrs in advance)
      if (index >= 24) {
        return null
      }
      else {
        return (
          <li key={key.time}>
            {/* converts 24hr time to 12hr time */}
            <H3f>{ TwentyFourToTwleve[new Date(new Date(key.time * 1000).toISOString()).getHours()] }</H3f>
          </li>
        )
      }
    })
    return dailyForecast;
  }

  // Weekly forecast 
  mapDailyForecastDay(weather_data) {
    // maps over each value in the weather_data variable
    let dailyForecast = weather_data.map((key, index) => {
      if (index >= 24) {
        return null
      }
      else {
        return (
          <li key={key.time}>
            <LineHR100/>
            {/* rounds temperature value */}
            <H2f>{ Math.round(key.temperature * 1000 / 1000 ) }°</H2f>
            <LineHR100/>
          </li>
        )
      }
    })
    return dailyForecast;
  }

  // 24hr forecast precipitation handling
  mapDailyForecastPrecip(weather_data) {
    let dailyForecast = weather_data.map((key, index) => {
      if (index >= 24) {
        return null
      }
      else {
        let tempPercent = key.precipProbability * 100;
        // sets the amount of columns to display
        let dynamicGridTemplate = '1fr ' + (key.precipProbability * 60) + '%';
        return (
          // inline styling, dynamic based on value inputs
          <li key={key.time} style={{marginBottom: '8px'}}>
            <GraphDiv style={{display: 'grid', gridTemplateRows: dynamicGridTemplate}}>
              <H3f>{tempPercent}%</H3f>
              <div/>
            </GraphDiv>
          </li>
        )
      }
    })
    return dailyForecast;
  }

  // Weekly forecast functions
  // Weekly forecast time (gets the days of the week)
  mapWeeklyForecastTime(weather_data) {
    let weeklyForecast = weather_data.map((key, index) => {
      if (index === 0) {
        return null
      }
      else {
        return (
          <li key={key.time}>
            {/* matches the index to the imported array string*/}
            <H3f>{ dayOfWeek[new Date(new Date(key.time * 1000).toISOString()).getDay()] }</H3f>
          </li>
        )
      }
    })
    return weeklyForecast;
  }

  mapWeeklyForecastDay(weather_data) {
    let weeklyForecast = weather_data.map((key, index) => {
      if (index === 0) {
        return null
      }
      else {
        return (
          <li key={key.time}>
            <LineHR100/>
            <H2f>{ Math.round(key.temperatureLow * 100 / 100 ) }°/{ Math.round(key.temperatureHigh * 100 / 100 ) }°</H2f>
            <LineHR100/>
          </li>
        )
      }
    })
    return weeklyForecast;
  }

  mapWeeklyForecastPrecip(weather_data) {
    let weeklyForecast = weather_data.map((key, index) => {
      let tempPercent = Math.round(key.precipProbability * 1000 / 10);
      let dynamicGridTemplate = '1fr ' + (key.precipProbability * 60) + '%';
      if (index === 0) {
        return null
      }
      else {
        return (
          <li key={key.time} style={{marginBottom: '8px'}}>
            <GraphDiv style={{display: 'grid', gridTemplateRows: dynamicGridTemplate}}>
              <H3f>{tempPercent}%</H3f>
              <div/>
            </GraphDiv>
          </li>
        )
      }
    })
    return weeklyForecast;
  }

  // creates a toggle function that adds +1 to the this.state.index to progress through the welcome screens
  toggle = e => this.setState(state => ({ index: state.index === 5 ? 0 : state.index + 1 }))

  // sets the value of the dlc to unlocked - run onClick when user purchases DLC
  getDLC(value, force) {
    localStorage.setItem(value, 'unlocked')
    if (force !== null) {
      this.forceUpdate();
    }
  }

  // function to set the state of all DLC to false to show the dlcView component
  showDlcOptions() {
    this.setState({
      dlcView: true,
      bareView: false,
      ExtendedView: false,
      DailyForecast: false,
      WeeklyForecast: false,
      ExtensiveWeather: false,
      ClassyAudio: false,
    })
  }

  // function handling closing the dlcView and
  // rechecking which DLC the user has purchased (and setting that state to true) 
  hideDlcOptions() {
    this.setState({
      dlcView: false,
    })
    this.checkUserDLC();
  }

  // resets all data / clears all localStorage and forces a window reload/refresh
  handleRemoveDLC() {
    localStorage.clear();
    window.location.reload();
    this.setState({
      index: 0
    });
  }

  // allows users to hit enter when entering data on the welcome screen
  _handleKeyPress = (e) => {
    // checks if the user has hit enter
    if (e.key === 'Enter') {
      console.log('user hit enter');
      // check if either username input or location input 
      if (e.target.id === 'location') {
        this.getUserLocation(e.target.value)
      }
      if (e.target.id === 'name_of_user') {
        localStorage.setItem('username', e.target.value);
      }
      this.toggle()
    }
  }

  render() {
    const { renderSearchOptions } = this.state;
    // welcome slides (if no local storage data)
    // pages variable is used with react-spring
    const pages = [
      // animated.div is part of react-spring
      style => <animated.div key="1" style={{ ...style}}>
          <SlideItem>
            <DlcButton onClick={this.toggle}>Next</DlcButton>
            <SerifText>Welcome to Posh Weather. <br/>
            We believe in giving you the best weather experience money can buy</SerifText>
          </SlideItem>
      </animated.div>,
      style => <animated.div key="2" style={{ ...style}}>
          <SlideItem>
            <DlcButton onClick={this.toggle}>Next</DlcButton>
            <SerifText>Jolly good to make your acquaintance. <br/>What may your name be?</SerifText>
            <UserInput id="name_of_user" type="text" autocomplete="no_today" required onKeyPress={this._handleKeyPress}
                onChange={(evt) => { localStorage.setItem('username', evt.target.value);}}
            />
          </SlideItem>
      </animated.div>,
      style => <animated.div key="3" style={{ ...style}}>
          <SlideItem>
            <DlcButton onClick={this.toggle}>Next</DlcButton>
              <SerifText>Where are you right now?</SerifText>
              <UserInput id="location" type="text" autocomplete="no_today" required
                  onChange={(evt) => {this.getUserLocation(evt.target.value);}} onKeyPress={this._handleKeyPress}
              />
              {
                // renders the search opotions as the user types.
                // runs the function onChange to create suggested search opotions
                // maps over the array of opotions and renders them to the page
              }
              {
                renderSearchOptions.map(key =>
                  <Spring key={key.id}
                    from={{opacity: 0, paddingTop: "-100px"}} to={{opacity: 1, paddingTop: "0px" }}
                  >
                    {styles =>
                      <LocationOptions style={styles} key={key.id}
                        onClick={() => {
                          this.toggle();
                          localStorage.setItem('location_lon', key.geometry.coordinates[0]);
                          localStorage.setItem('location_lat', key.geometry.coordinates[1]);
                          localStorage.setItem('location_name', key.text);
                        }}
                      >{key.text}</LocationOptions>
                    }
                  </Spring>
                )
              }
          </SlideItem>
      </animated.div>,
      style => <animated.div key="4" style={{ ...style}}>
        <SlideItem>
            <DlcButton onClick={this.toggle}>Next</DlcButton>
            <SerifText>We hope you enjoy your experience</SerifText>
        </SlideItem>
    </animated.div>
    ];

    // loading ...
    if (this.state.loading === true) {
      return <Loading/>
    }

    let welcomeSlider = null;
    let bareView = null;
    let ExtendedView = null;
    let DailyForecast = null;
    let WeeklyForecast = null;
    let ExtensiveWeather = null;
    let ClassyAudio = null;
    let DlcView = null;

    if (this.state.dlcView === true) {
      DlcView = (
        <DlcViewContainer>
          <H2f>Weather Expansion Packs</H2f>
          <section>
          { // maps over the DlcData and then displays then renders the data
            DlcData.map((key, index) =>
              {
                let textOpacity = '0.5';
                let buyOrNah = true;
                // checks if the user has purchased the DLC and sets styles
                if (localStorage.getItem(`${key.title}`) === "unlocked") {
                  textOpacity = '1'
                  buyOrNah = false
                }
                return (
                  <div key={index}>
                    <H3f style={{opacity: textOpacity}}>
                      {buyOrNah ? 'Locked' : 'Unlocked'}
                    </H3f>
                    <LineHR/>
                    <H2f style={{opacity: textOpacity}}>{key.title}</H2f>
                    <LineHR/>
                    {buyOrNah ?
                    // onClick, run the getDLC funtion to unlock dlc
                    <H3f><DlcButton value={key.title} onClick={(evt) => this.getDLC(evt.target.value, 'force')}>
                      Unlock now for ${key.cost}/month</DlcButton>
                    </H3f>
                    :
                    <H3f>Thank you for your purchase</H3f>}
                  </div>
                )
              }
            )
          }
          <DlcButton onClick={() => this.hideDlcOptions()}>Go back to the Weather</DlcButton>
          </section>
        </DlcViewContainer>
      )
    }

    // Extended View (from base view)
    // checks if ExtendedView === true and renders the element
    if (this.state.ExtendedView === true) {
      this.getAllWeatherData();
      ExtendedView = (
        <ExtendedViewContaier>
          <LineHR/>
          <section>
            <div className="side_view_left">
              <H3f>Low</H3f>
              <H2f>{Math.round( this.state.allWeatherData.daily.data[0].temperatureLow * 10 / 10)}°</H2f>
            </div>
            <div className="main_section">
              <div>
                <H3f>Currently</H3f>
                <CurrentWeather>{Math.round( this.state.allWeatherData.currently.temperature * 10 / 10)}°</CurrentWeather>
              </div>
              <div>
                <H3f>Apparent</H3f>
                <H2f>{Math.round( this.state.allWeatherData.currently.apparentTemperature * 10 / 10)}°</H2f>
              </div>
            </div>
            <div className="side_view_right">
              <H3f>High</H3f>
              <H2f>{Math.round( this.state.allWeatherData.daily.data[0].temperatureHigh  * 10 / 10)}°</H2f>
            </div>
          </section>
          <LineHR/>
          <DlcButton style={{marginTop: "36px"}} onClick={() => this.showDlcOptions()}>Expansion Packs</DlcButton>
        </ExtendedViewContaier>
      )
    }

    // Daily Forecast
    // checks if DailyForecast === true and renders the element
    if (this.state.DailyForecast === true) {
      DailyForecast = (
        <DailyForecastContainer>
          <H2f>Daily Forecast</H2f>
          <div>
            <section>
              <ul>
                {this.mapDailyForecastTime(this.state.allWeatherData.hourly.data)}
              </ul>
              <ul>
                {this.mapDailyForecastDay(this.state.allWeatherData.hourly.data)}
              </ul>
              <ul>
                {this.mapDailyForecastPrecip(this.state.allWeatherData.hourly.data)}
              </ul>
            </section>
          </div>
        </DailyForecastContainer>
      )
    }

    // Weekly Forecast
    // checks if WeeklyForecast === true and renders the element
    if (this.state.WeeklyForecast === true) {
      WeeklyForecast = (
        <WeeklyForecastContainer>
          <H2f>Weekly Forecast</H2f>
          <div>
            <section>
              <ul>
                {this.mapWeeklyForecastTime(this.state.allWeatherData.daily.data)}
              </ul>
              <ul>
                {this.mapWeeklyForecastDay(this.state.allWeatherData.daily.data)}
              </ul>
              <ul>
                {this.mapWeeklyForecastPrecip(this.state.allWeatherData.daily.data)}
              </ul>
            </section>
          </div>
        </WeeklyForecastContainer>
      )
    }

    // Extensive Weather
    // checks if ExtensiveWeather === true and renders the element
    if (this.state.ExtensiveWeather === true) {
      ExtensiveWeather = (
        <ExtensiveWeatherContainer>
          <H2f>Extensive Weather Data</H2f>
          <LineHR/>
          <section>
            <div>
              <H3f>Wind</H3f>
              <H5f>{this.degreesToDirection(this.state.allWeatherData.currently.windBearing)} {Math.round( this.state.allWeatherData.currently.windSpeed  * 10 / 10)} km/h</H5f>
            </div>
            <div>
              <H3f>Humidity</H3f>
              <H5f>{Math.round( this.state.allWeatherData.currently.humidity  * 10 / 10)}%</H5f>
            </div>
            <div>
              <H3f>Dew Point</H3f>
              <H5f>{this.state.allWeatherData.currently.dewPoint}°</H5f>
            </div>
            <div>
              <H3f>UV Index</H3f>
              <H5f>{this.state.allWeatherData.currently.uvIndex}</H5f>
            </div>
            <div>
              <H3f>Visibility</H3f>
              <H5f>{this.state.allWeatherData.currently.uvIndex}km</H5f>
            </div>
            <div>
              <H3f>Air Pressure</H3f>
              <H5f>{Math.round( this.state.allWeatherData.currently.pressure  * 10 / 10)}mb</H5f>
            </div>
          </section>
          <LineHR/>
        </ExtensiveWeatherContainer>
      )
    }

    //classy audio
    // checks if ClassyAudio === true and renders the element
    if (this.state.ClassyAudio === true) {
      ClassyAudio = (
        <ClassyAudioContainer>
          <H2f>Posh Vibes</H2f>
          <LineHR/>
          <div>
            {/* displays the spotify playlist embed */}
            <iframe
              title="spotify embed"
              src="https://open.spotify.com/embed/user/12162909955/playlist/1yeKPPV6xZ0ESc3zc4EVnY"
              width="100%"
              height="350"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
          <LineHR/>
        </ClassyAudioContainer>
      )
    }
    // content if local Storage exists already (username + location)
    if (this.state.index >= 4 && this.state.bareView === true) {
      this.getAllWeatherData();
      bareView = (
        <BareViewContainer style={{color: 'white'}}>
          <LineHR/>
              <div>
                <H3f style={{textAlign: "center"}}>Currently</H3f>
                <CurrentWeather style={{textAlign: "center"}}>{Math.round( this.state.allWeatherData.currently.temperature * 10 / 10)}°</CurrentWeather>
              </div>
          <LineHR/>
          <DlcButton style={{marginTop: "36px"}} onClick={() => this.showDlcOptions()}>Expansion Packs</DlcButton>
        </BareViewContainer>
      )
    } else {
      bareView = null;
    }

    // welcome slider
    // checks if the index !== 5 and renders the welcomeSlider (or not)
    if (this.state.index !== 5) {
      welcomeSlider = (
        <WelcomeSliderContainer>
          <WelcomeContainer>
            <SlideItem>
              <Transition
                native
                from={{ opacity: 0, transform: 'translate3d(200%,0,0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                leave={{ opacity: 0, transform: 'translate3d(0,0,0)' }}
              >
                {pages[this.state.index]}
              </Transition>
            </SlideItem>
          </WelcomeContainer>
        </WelcomeSliderContainer>
      );
    } else {
      welcomeSlider = null;
    }

    // returns main app
    return (
      <AppContainer className="App">
        {/* Spring to animate in the top data (very sutble) */}
        <Spring delay={1000} from={{opacity: 0, paddingTop: "-100px"}} to={{opacity: 1, paddingTop: "24px" }}>
          {styles =>
            <TopBar style={styles}>
              <p><span>{localStorage.getItem('username')}</span> | <span>{localStorage.getItem('location_name')}</span></p>
              <p>{this.getTheDate()}</p>
            </TopBar>
          }
        </Spring>
        <Header className="App-header">
          <img src={logo} alt="posh weather logo. Golden P with Posh weather written below."/>
        </Header>
        <MainContentContainer>
          {DlcView}
          {bareView}
          {ExtendedView}
          {DailyForecast}
          {WeeklyForecast}
          {ExtensiveWeather}
          {ClassyAudio}
          {welcomeSlider}
        </MainContentContainer>
        <FooterContainer classname="loading-component">
          <ul>
            <li>Built by <a href="https://lukesecomb.digital" target="_blank">Luke Secomb</a></li>
            <li onClick={() => this.handleRemoveDLC()}>reset Weather Expansion Data</li>
            <li>Powered by <a href="https://darksky.net/poweredby/" target="_blank" rel="nofollow noreferrer">Dark Sky</a></li>
          </ul>
        </FooterContainer>
      </AppContainer>
    );
  }
}

export default App;

// all of the styling for the above components
// use of styled components instead of traditional CSS (or SASS)
// ${variables} are imported at the top
//  - colours
//  - fonts
//  - sizes

const UserInput = styled.input`
  color: ${colors.gold};
  background-color: transparent;
  border: 0px solid white;
  border-bottom: 2px solid ${colors.gold};
  font-size: 2.25rem;
  width: 100%;
  &:focus {
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 0;  
    border-bottom: 1px solid ${colors.gold};
  }
`
const DlcButton = styled.button`
  cursor: pointer;
  margin: 0 auto 48px auto;
  display: block;
  border: 2px solid ${colors.gold};
  border-radius: 24px;
  padding: 8px 16px;
  background-color: transparent;
  color: ${colors.gold};
  transition: .25s;
  &:hover {
    background-color: ${colors.gold_sub};
    padding: 8px 20px;
    transition: .25s;
  }
  &:focus {
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 0;
  }
`
const CurrentWeather = styled.h1`
  font-family: serif;
  font-size: 5rem;
  color: ${colors.white};
  @media (min-width: ${view.tablet}) {
    font-size: 7.5rem;
  }
`
const H2f = styled.h2`
  font-size: 1.75rem;
  font-family: serif;
  color: ${colors.white};
  text-align: center;
  width: 80%;
  margin: 0 auto;
  @media (min-width: ${view.tablet}) {
    font-size: 2.5rem;
  }
`
const H3f = styled.h3`
  font-family: sans-serif;
  color: ${colors.gold};
  text-align: center;
  font-size: 1.25rem;
`
const H5f = styled.h5`
  font-family: serif;
  color: ${colors.white};
  text-align: center;
  font-size: 1.25rem;
`
const SerifText = styled.p`
  font-family: serif;
  color: ${colors.white};
`
const LineHR = styled.hr`
  width: 80%;
  border-color: ${colors.gold};
  @media (min-width: ${view.desktop}) {
    width: 50%;
  }
`
const LineHR100 = styled.hr`
  width: 100%;
  position: sticky;
  border-color: ${colors.gold};
`
const GraphDiv = styled.div`
  width: 75%;
  border-bottom: 2px solid ${colors.gold};
  height: 75px;
  display: grid;
  padding: 0;
  margin: 0 auto;
  p {
    align-self: flex-end;
    text-align: center;
    margin: 0;
    padding: 0;
  }
  div {
    align-self: flex-end;
    width: 90%;
    height: 100%;
    margin: 0 auto;
    background-color: ${colors.gold};
    opacity: .5;
  }
`
const DlcViewContainer = styled.div`
  > h2 {
    margin-bottom: 48px;
  }
  section {
    div {
      margin-bottom: 96px;
      h2 {
        margin: 24px auto;
      }
      h3 {
        position: relative;
        width: 100%;
        input {
          position: absolute;
        }
        button {
          background-color: transparent;
          color: ${colors.gold};
        }
      }

    }
  }
`
const ClassyAudioContainer = styled.div`
  div {
    width: 80%;
    margin: 24px auto;
    @media (min-width: ${view.desktop}) {
      width: 50%;
    }
  }
`
const WeeklyForecastContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (min-width: ${view.desktop}) {
    width: 50%;
  }
  > div {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      height: 5px;
      width: 0;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 12px ${colors.darkGrey};
      box-shadow: inset 0 0 12px ${colors.darkGrey};
      background-color: ${colors.darkGrey};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${colors.gold};
      border: 0 solid ${colors.gold};
    }
    section {
      min-width: 850px;
      display: grid;
      grid-template-columns: 100%;
      ul {
        list-style-type: none;
        padding: 0;
        margin: 24px 0;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: 1;
        color: ${colors.white};
        li {
          min-width: 150px;
          @media (min-width: ${view.desktop}) {
            min-width: 150px;
          } 
          h3 {
            margin: 0 auto 8px auto;
            align-self: flex-end;
          }
          h2 {
            margin: 24px auto;
          }
        }
      }
    }
  }
`
const DailyForecastContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (min-width: ${view.desktop}) {
    width: 50%;
  }
  > div {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      height: 5px;
      width: 0;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 12px ${colors.darkGrey};
      box-shadow: inset 0 0 12px ${colors.darkGrey};
      background-color: ${colors.darkGrey};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${colors.gold};
      border: 0 solid ${colors.gold};
    }
    section {
      min-width: 1244px;
      display: grid;
      grid-template-columns: 100%;
      ul {
        list-style-type: none;
        padding: 0;
        margin: 24px 0;
        display: grid;
        grid-template-columns: repeat(24, 1fr);
        grid-template-rows: 1;
        color: ${colors.white};
        li {
          min-width: 120px;
          @media (min-width: ${view.desktop}) {
            min-width: 150px;
          }
          h3 {
            margin: 0 auto 8px auto;
            align-self: flex-end;
          }
          h2 {
            margin: 24px auto;
          }
        }
      }
    }
  }
  
`
const ExtensiveWeatherContainer = styled.div`
  section {
    margin: 48px auto;
    div {
      display: grid;
      grid-template-columns: 50% 50%;
      align-content: center;
      margin: 8px auto;
      h3 {
        justify-self: flex-end;
        margin: 0 4px 0 0;
      }
      h5 {
        justify-self: flex-start;
        margin: 0 0 0 4px;
      }
    }
  }
`
const ExtendedViewContaier = styled.div`
  section {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 25% 50% 25%;
    @media (min-width: ${view.desktop}) {
      width: 50%;
    }
    .main_section {
      display: grid;
      grid-template-columns: 100%;
      > div {
        display: grid;
        text-align: center;
        &:nth-of-type(1) {
          h3 {          
            margin: 48px auto 0 auto;
          }
        }
        &:nth-of-type(2) {
          h3 {          
            margin: 8px auto 0 auto;
          }
        }
        h3 {
          align-self: flex-end;
        }
        h2 {
          align-self: flex-start;
          margin: 8px auto 24px auto;
        }
        h1 {
          align-self: flex-start;
          margin: 8px auto 24px auto;
        }
      }
    }
    .side_view_left, .side_view_right {
      display: grid;
      align-content: center;
      h3 {
        margin: 48px auto 0 auto;
      }
      h2 {
        margin: 8px auto 48px auto;
      }
    }
    .side_view_left {
      justify-content: flex-end;
      margin-right: 8px;

    }
    .side_view_right {
      justify-content: flex-start;
      margin-left: 8px;
    }
  }
`
const BareViewContainer = styled.div`
  div {
    display: grid;
    grid-template-rows: 20% 80%;
    h3 {
      align-self: flex-end;
      margin: 48px auto 0 auto;
    }
    h1 {
      align-self: flex-start;
      margin: 12px auto 48px auto;
    }
  }
`
const TopBar = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 1fr 1fr;
  padding: 24px 0;
  @media (min-width: ${view.tablet}) {
    grid-template-columns: 50% 50%;
    grid-auto-rows: 1fr;
    width: 100%;
  }
  p {
    text-transform: uppercase;
    color: ${colors.gold};
    font-size: 1rem;
    padding: 1% 5%;
    margin: 0;
    text-align: center;
    @media (min-width: ${view.tablet}) {
      font-size: 1rem;
      padding: 1% 5%;
    }
    &:nth-of-type(1) {
      @media (min-width: ${view.tablet}) {
        text-align: left;
        align-self: flex-start;
      }
    }
    &:nth-of-type(2) {
      @media (min-width: ${view.tablet}) {
        text-align: right;
        align-self: flex-end;
      }
    }
  }
`
const AppContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: ${fonts.sans};
  min-height: 100vh;
  /* Gradients for dayz */
  background-color: ${colors.gradientGreyDark};
  background: ${colors.gradientGreyDark}k; /* Old browsers */
  background: -moz-linear-gradient(left, ${colors.gradientGreyDark} 0%, ${colors.gradientGreyLight} 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(left, ${colors.gradientGreyDark} 0%, ${colors.gradientGreyLight} 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right, ${colors.gradientGreyDark} 0%, ${colors.gradientGreyLight} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${colors.gradientGreyDark}', endColorstr='${colors.gradientGreyLight}',GradientType=1 ); /* IE6-9 */
`
const MainContentContainer = styled.section`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  overflow: hidden;
  > div {
    margin-bottom: 175px;
  }
`
const Header = styled.header`
  width: 100%;
  height: 10vh;
  padding: 3% 0 10% 0;
  color: ${colors.white};
  display: grid;
  @media (min-width: ${view.tablet}) {
    width: 100%;
    height: 12vh;
    padding: 3% 0 4% 0;
  }
  img {
    justify-content: center;
    width: auto;
    height: 100%;
    margin: 0 auto;
  }
`
const WelcomeSliderContainer = styled.div`
  width: 90%;
  min-height: 250px;
  padding: 125px 5% 10% 5%;
  position: relative;
  display: block;
  @media (min-width: ${view.mobile}) {
    width: 80%;
    min-height: 250px;
    padding: 20% 10% 10% 10%; 
  }
  @media (min-width: ${view.tablet}) {
    width: 70%;
    min-height: 250px;
    padding: 15% 15% 10% 15%; 
  }
  @media (min-width: ${view.desktop}) {
    width: 50%;
    min-height: 250px;
    padding: 10% 25% 10% 25%; 
  }
`
const LocationOptions = styled.li`
  list-style-type: none;
  font-size: 2.25rem;
  color: ${colors.gold_sub};
  transition: .5s;
  cursor: pointer;
  &:hover {
    color: ${colors.gold};
    transition: .5s;
  }
`
const WelcomeContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: ${fonts.serif};
    h2 {
        color: white;
        position: absolute;
        top: 0;
    }
    button {
        position: absolute;
        top: -10%;
        width: auto;
        font-size: 1rem;
    }
`
const SlideItem = styled.div`
  color: white;
  position: absolute;
  width: 100%;
  height: 450px;
  display: block;
  justify-content: center;
  align-content: center;
  will-change: transform, opacity;
  div {
    p {
      text-align: left;
      color: ${colors.lightGrey};
      font-size: 2.25rem;
    }
    button {
      position: absolute;
      width: auto;
      font-size: 1rem;
    }
  }
`
const FooterContainer = styled.footer`
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: ${fonts.sans};
  position: relative;
  bottom: 0;
  left: 0;
  ul {
    list-style-type: none;
    padding: 24px 48px;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    opacity: .5;
    transition: .5s;
    &:hover {
      opacity: 1;
      transition: .5s;
    }
    li {
      color: ${colors.white};
      font-size: .75rem;
      &:nth-of-type(2) {
        cursor: pointer;
      }
      a {
        color: ${colors.gold};
        text-decoration: none;
        transition: .5s;
        opacity: 1;
        &:hover {
          opacity: .5;
          transition: .5s;
        }
      }
      &:nth-child(1) {
        text-align: left;
      }
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(3) {
        text-align: right;
      }
    }
  }
`