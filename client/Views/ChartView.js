/**
 * Wrap D3 charting components in a simple Backbone view interface
 *
 * Provides a redrawing path, data sync, and fallback for non-d3 browsers.
 *
 * Views that extend ChartView should implement their own "draw" function and go to work.
 *
 * var collection = new Backbone.Collection([ ["Maria", 33], ["Heather", 29] ]);
 * var view = new MyChartView({ $el: $("#topper-chart"), collection: collection});
 *
 **/

var ChartView = Backbone.View.extend({
  constructor: function(options) {
    this.default_options = {
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      },
      type: ""
    };

    this.options = $.extend(true, this.default_options, options);

    // Fallback if d3 is unavailable, add some formatters otherwise.
    if (!this.d3) {
      this.draw = this.fallback_draw;
    }
    else {
      this.formatNumber = d3.format(".lf");
      this.formatCommas = d3.format(",");
      this.formatPercent = d3.format("%");
    }
    Backbone.View.apply(this, arguments);
  },
  initialize: function(options) {
    // Wrap chart

    this.get_dimensions();

    if (this.collection)
      this.collection.on("sync", _.bind(this.render, this, true));
    else if (this.options.data)
      this.data = this.options.data;

    $(window).on("resize", _.debounce(_.bind(this.render, this, false), 50));

    this.$chart_container = this.$el.parent();
    this.chart_container = this.$chart_container.get(0);
    this.$chart_container.on("resize", _.debounce(_.bind(this.render, this, false), 50));

  },
  get_dimensions: function() {
    this.$chart_container = this.$el.parent();
    this.chart_container = this.$chart_container.get(0);

    var wrapperWidth = this.$chart_container.width();
    var wrapperHeight = this.$chart_container.height();
    wrapperHeight = wrapperWidth * 5/9;

    var width = wrapperWidth - this.options.margin.left - this.options.margin.right;
    var height = wrapperHeight - this.options.margin.bottom - this.options.margin.top;

    this.$el
      .height(wrapperHeight)
      .width(wrapperWidth)
      ;

    this.dimensions = {
      width: width,
      height: height,
      wrapperWidth: wrapperWidth,
      wrapperHeight: wrapperHeight
    };
  },
  // The render function wraps drawing with responsivosity
  render: function(animated) {
    console.log('animated: ',animated);

    if (this.collection)
    this.data = this.collection.toJSON();
    this.$el.empty();
    this.get_dimensions();
    this.draw(animated);
    return this.el;
  },
  draw: function(animated) {
    console.log("override ChartView's draw function with your d3 code");
    return this;
  },
  fallback_draw: function() {
    this.$el.html(
      '<div class="alert"><p><strong>Warning!</strong> You are using an unsupported browser. ' +
      'Please upgrade to Chrome, Firefox, or Internet Explorer version 9 or higher to view ' +
      'charts on this site.</p></div>');
    return this;
  },
  d3: function() {
    return (typeof d3 !== 'undefined');
  }
});