var splitGeometry = null;
var splitFeatureId = null;
function splitGeometryDone(e) {
  splitGeometry = e.layer.toGeoJSON();

  if (document.getElementById("showSplitEditFeature")) {
    document.getElementById("showSplitEditFeature").click();
  }
}
