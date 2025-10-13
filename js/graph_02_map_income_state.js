export default {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Median personal weekly income by state/territory (Census 2021)",
  "width": 650,
  "height": 500,
  "projection": {"type": "mercator"},
  "data": {
    "url": "data/aus_states_simplified.topojson",
    "format": {"type": "topojson", "feature": "STATE"}
  },
  "transform": [{
    "lookup": "id",
    "from": {
      "data": {"url": "data/inc_by_state_2021.csv"},
      "key": "state_code",
      "fields": ["state_name", "median_income"]
    }
  }],
  "mark": {"type": "geoshape", "stroke": "white", "strokeWidth": 1},
  "encoding": {
    "color": {
      "field": "median_income",
      "type": "quantitative",
      "title": "Median income ($/wk)",
      "scale": {"scheme": "blues", "domain": [700, 1250]}
    },
    "tooltip": [
      {"field": "state_name", "type": "nominal", "title": "State/Territory"},
      {"field": "median_income", "type": "quantitative", "format": "$.0f"}
    ]
  },
  "config": {"view": {"stroke": null}}
};