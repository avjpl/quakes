const axios = require('axios');
const moment = require('moment');

const base = 'https://earthquake.usgs.gov/fdsnws/event/1/';
const query = 'query?format=geojson&starttime=2014-01-01&endtime=2014-01-02';

const formatTime = time => moment(time).format('MMMM Do YYYY, h:mm:ssa');

axios({
  method: 'get',
  url: `${base}${query}`,
})
.then(({data: { features }}) => {
  const {
    id,
    properties: {
      mag,
      place,
      time,
    }
  } = features[0];

  const customPayload = {
    magnitude: mag,
    location: place,
    when: formatTime(time),
    time,
    id,
  };

  console.info(customPayload);
});
