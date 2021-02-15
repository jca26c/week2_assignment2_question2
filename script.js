 require([
      "esri/Map",
      "esri/layers/CSVLayer",
      "esri/views/MapView",
      "esri/config",
      "esri/core/urlUtils",
      "dojo/domReady!"
    ], function(
      Map,
      CSVLayer,
      MapView,
      esriConfig,
      urlUtils
    ) {

      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
     var url = "https://raw.githubusercontent.com/gbrunner/Advanced_Python_for_GIS_and_RS/master/Week%202/stl_crime_wgs_84.csv";
     esriConfig.request.corsEnabledServers.push('https://rawgit.com');

      // Paste the url into a browser's address bar to download and view the attributes
      // in the CSV file. These attributes include:
      // * mag - magnitude
      // * type - earthquake or other event such as nuclear test
      // * place - location of the event
      // * time - the time of the event

        const template = {
          title: "Earthquake Info",
          content: "Magnitude {mag} {type} hit {place} on {time}."
        };

        const csvLayer = new CSVLayer({
          url: url,
          copyright: "USGS Earthquakes",
          popupTemplate: template
        });

        var symbol = {
          type: "simple-marker", 
          color:"red",
          size: 3
        };

      csvLayer.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: symbol
      };

      var map = new Map({
        basemap: "topo-vector",
        layers: [csvLayer]
      });

      var view = new MapView({
        container: "viewDiv",
        center: [-90.2362060546875, 38.63081814300356],
        zoom: 11,
        map: map
      });

    });
