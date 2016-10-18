import {clone, reduce, keys, isUndefined, isArray, toNumber} from 'lodash';

const convertPostaltoFIPS = require('us-abbreviations')('postal','fips');
const convertPostaltoFull = require('us-abbreviations')('postal','full');

const us = {
    name: 'states50',
    proj: 'albersUsa',
    translate: [320, 180],
    precision: 1,
    scale: 730,
    topojson : require('./../mapfiles/us-50/us-simple.json'),
    feature: 'states',
    adjustLabels: function(adjusty=0,adjustx=0, label) {

      if (label == 'VT') {
        adjusty = -25;
      }
      if (label == 'NH') {
        adjustx = 25;
        adjusty = -5;
      }
      if (label == 'MA') {
        adjusty = -3;
        adjustx = 26;
      }
      if (label == 'RI') {
        adjustx = 16;
        adjusty = 2;
      }
      if (label == 'CT') {
        adjustx = 12;
        adjusty = 12;
      }
      if (label == 'NJ') {
        adjustx = 15;
      }
      if (label == 'DC') {
        label = '';
      }
      if (label == 'DE') {
        adjustx = 31;
        adjusty = -5;
      }
      if (label == 'MD') {
        adjustx = 31;
        adjusty = 10;
      }
      if (label == 'FL') {
        adjustx = 9;
      }
      if (label == 'LA') {
        adjustx = -4;
      }
      if (label == 'HI') {
        adjustx = -12;
      }

      return [adjusty,adjustx,label];
    },
    matchLogic(input) {
      return convertPostaltoFIPS(input) || convertPostaltoFull(input) || input;
    },
    test: function(column_val, polygon_val) {
      // loop through object .. find the key val of the one you want..
      const column_val_converted = this.matchLogic(column_val); //

      return (toNumber(column_val_converted) === toNumber(polygon_val));
    }
  }

module.exports = us;