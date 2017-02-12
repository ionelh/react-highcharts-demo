'use strict';

import {createSelector} from 'reselect';
import utils from './../utils/utils';

function getChartDataModel() {
  return {
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      borderWidth: 0,
      padding: 30
    },
    title: {
      text: 'Average daily temperatures'
    },
    xAxis: {
      title: {
        text: 'Day of month'
      },
      categories: [...new Array(31)].map((item, index) => index + 1)
    },
    yAxis: {
      title: {
        text: 'Temperature (Celsius)'
      }
    },
    series: [
      // {
      //   name: 'January 2017',
      //   data: []
      // }
    ]
  };
} 

const temperaturesSelector = state => state.temperatures.data;

export const selectChartConfig = createSelector(
  temperaturesSelector,
  data => {
    const result = data.reduce((prevYearValue, yearItem, yearIndex) => {
      if (yearItem.results && yearItem.results.length > 0) {
        const crtSeries = yearItem.results.reduce((prevValue, item, index) => {
          if (!prevValue.name) {
            const date = new Date(item.date.substring(0, 7));
            prevValue.name = `${utils.months[date.getMonth()]} ${date.getFullYear()}`;
          }
          prevValue.data.push(item.value);
          return prevValue;
        }, {
          name: '',
          data: []
        });
        
        prevYearValue.series.push(crtSeries);
      }
      
      return prevYearValue;
    }, getChartDataModel());
    
    return result;
  }
);
