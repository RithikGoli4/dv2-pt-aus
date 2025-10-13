export default {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Weekly household income trends (2000-01 to 2019-20, 2019-20 dollars)",
  "data": {"url": "data/hhld_income_full.csv"},
  "mark": {"type": "line", "point": true, "strokeWidth": 2.5},
  "encoding": {
    "x": {
      "field": "year",
      "type": "ordinal",
      "title": null,
      "axis": {"labelAngle": -45}
    },
    "y": {
      "field": "value",
      "type": "quantitative",
      "title": "Income ($/wk, 2019-20 dollars)"
    },
    "color": {
      "field": "measure",
      "type": "nominal",
      "title": null,
      "scale": {
        "domain": [
          "Gross (mean)",
          "Gross (median)",
          "Equivalised disposable (mean)",
          "Equivalised disposable (median)"
        ],
        "range": ["#0072b2", "#d55e00", "#f0e442", "#56b4e9"]
      }
    }
  },
  "transform": [
    {
      "fold": [
        "gross_mean",
        "gross_median",
        "disp_mean",
        "disp_median"
      ],
      "as": ["measure", "value"]
    },
    {
      "calculate": "datum.measure == 'gross_mean' ? 'Gross (mean)' : datum.measure == 'gross_median' ? 'Gross (median)' : datum.measure == 'disp_mean' ? 'Equivalised disposable (mean)' : 'Equivalised disposable (median)'",
      "as": "measure"
    }
  ],
  "tooltip": [
    {"field": "year", "type": "nominal"},
    {"field": "measure", "type": "nominal"},
    {"field": "value", "type": "quantitative", "format": "$.0f"}
  ],
  "width": 700,
  "height": 400
};