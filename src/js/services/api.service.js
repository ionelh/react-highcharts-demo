'use strict';

const BASE_PATH = 'https://www.ncdc.noaa.gov/cdo-web/api/v2';
const API_TOKEN = 'AYNgIjnftHFnRKdKmvCUAjcAorKkFsYx';

// In case you run out of API requests (they're limited to 1000 / day) use this to get a mocked response
function getMockedResponse() {
  const mockedResponse = {
    metadata: {
      resultset: {
        offset: 1,
        count: 31,
        limit: 31
      }
    },
    results: []
  };
  
  for (let i = 1; i <= 31; i += 1) {
    const day = i < 10 ? `0${i}` : i;
    mockedResponse.results.push({
      date: `2017-01-${day}T00:00:00`,
      datatype: 'TAVG',
      station: 'GHCND:ROE00100902',
      attributes: 'H,,S,',
      value: Math.round(Math.random() * 40) - 20 // random number [-20, 20]
    });
  }
  
  return mockedResponse;
}

function generateParams(year, month, cityId) {
  month = month < 10 ? `0${month}` : month;
  const lastDayInMonth = new Date(year, month, 0).getDate();
  
  return [
    'datasetid=GHCND',
    `startdate=${year}-${month}-01`,
    `enddate=${year}-${month}-${lastDayInMonth}`,
    'units=metric',
    'datatypeid=TAVG',
    'limit=31',
    `locationid=${cityId}`
  ];
}

function getYearsArr(yearsBack) {
  const crtYear = new Date().getFullYear();
  const yearsArr = [];
  
  for (let i = 0; i < yearsBack; i += 1) {
    yearsArr.push(crtYear - i);
  }
  
  return yearsArr;
}

const Api = (() => {
  const call = (url) => (
    new Promise((resolve, reject) => {
      const headers = new Headers();
      const options = {};
      headers.append('token', API_TOKEN);
      options.headers = headers;
      
      fetch(url, options)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            response.json()
              .then(jsonResponse => {
                resolve(jsonResponse);
              })
              .catch(ex => {
                reject(ex);
              });
          } else {
            response.json()
              .then(jsonResponse => {
                reject(jsonResponse);
              })
              .catch(ex => {
                reject(ex);
              });
          }
        }, reason => {
          reject(reason);
        })
        .catch(ex => {
          reject(ex);
        });
    })
  );
  
  return {
    getTemperature: (month, yearsBack, cityId) => {
      const promises = getYearsArr(yearsBack).map((year) => (
        call(`${BASE_PATH}/data?${generateParams(year, month, cityId).join('&')}`)
      ));
      
      return Promise.all(promises);
      
      // use this in case run out of requests but still want to play around with mocked data
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve([
      //       getMockedResponse(),
      //       getMockedResponse(),
      //       getMockedResponse(),
      //       getMockedResponse()
      //     ]);
      //   }, 500);
      // });
    }
  };
})();

export default Api;
