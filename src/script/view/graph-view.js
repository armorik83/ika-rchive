'use strict';
var Vue   = require('vue');
var Chart = require('chart.js');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = Vue.extend({
  el: function() { return '#js-view-graph'; },
  data: function() {
    return {
      records: RecordModel.data
    };
  },
  watch: {
    records: function() {
      this.drawGraph();
    }
  },
  events: {
    'hook:ready': function() {
      this._ctx = this.$$.graph.getContext('2d');
      this.drawGraph();
    }
  },
  methods: {
    drawGraph: function() {
      var data = {
        labels: RecordModel.toGraphLabel(),
        datasets: [
          {
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            data: RecordModel.toGraphData()
          }
        ]
      };
      var options = {
        bezierCurve:     false,
        scaleLabel:      Util.getRateStr,
        tooltipTemplate: Util.getRateStr
      };
      new Chart(this._ctx).Line(data, options);
    }
  }
});



