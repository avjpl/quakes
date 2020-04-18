const { RESTDataSource } = require('apollo-datasource-rest');
const moment = require('moment');

const formatTime = time => moment(time).format('MMMM Do YYYY, h:mm:ssa');

class QuakeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://earthquake.usgs.gov/fdsnws/event/1/';
  }

  async getAllQuakes() {
    const { features } = await this.get('query?format=geojson&starttime=2014-01-01&endtime=2014-01-02');

    return Array.isArray(features)
      ? features.map(quake => this.quakeReducer(quake))
      : [];
  }

  quakeReducer = ({
    id = 0,
    properties: {
      mag,
      place,
      time,
    }
  }) => ({
    id,
    cursor: time + "",
    magnitude: mag,
    location: place,
    when: formatTime(time),
  });
}

module.exports = QuakeAPI;
