export default {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Median weekly household income: 2009-10 to 2019-20 (2020 dollars)",
  "data": {"url": "data/hhld_income_trend.csv"},
  "mark": {"type": "line", "point": true, "strokeWidth": 3},
  "encoding": {
    "x": {
      "field": "year",
      "type": "ordinal",
      "title": null,
      "axis": {"labelAngle": 0}
    },
    "y": {
      "field": "value",
      "type": "quantitative",
      "title": "Income ($/wk, 2020 dollars)"
    },
    "color": {
      "field": "measure",
      "type": "nominal",
      "title": null,
      "scale": {"range": ["#0072b2", "#d55e00"]}
    }
  },
  "transform": [
    {"fold": ["gross_median", "disp_median"], "as": ["measure", "value"]},
    {"calculate": "datum.measure == 'gross_median' ? 'Gross' : 'Equivalised disposable'", "as": "measure"}
  ],
  "tooltip": [
    {"field": "year", "type": "nominal"},
    {"field": "measure", "type": "nominal"},
    {"field": "value", "type": "quantitative", "format": "$.0f"}
  ],
  "width": 600,
  "height": 300
};