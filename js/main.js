function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.56, lng: -96.0},
    zoom: 4,
     streetViewControl: false,
  });

  var infoWin = new google.maps.InfoWindow();
  var markers = jobData.map(function(location, i) {
            var marker = new google.maps.Marker({
              position: location.location,
              title: location.title,
              links: location.links,
            });
            google.maps.event.addListener(marker, 'click', function(evt) {
              infoWin.setContent('<a target="_blank" href="' + location.links + '">' + location.title + '</a>');
              infoWin.open(map, marker);
            })
            return marker;
          });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    zoomOnClick: false
  })

  google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {
      var content = '';
      // Convert the coordinates to an MVCObject
      var info = new google.maps.InfoWindow;
      info.set('position', cluster.center_);
      //Get markers
      var marks = cluster.getMarkers();

      for (var z = 0; z < marks.length; z++) {
          // content.push(marks.title);
          // content = makeClusterInfo(marks, z);
          content += '<a target="_blank" href="' + marks[z].links + '">' +
            marks[z].title + '</a><br>';
      }

      infoWin.close(); // closes previously opened infowindows
      infoWin.setContent(content);
      infoWin.open(map, info);
      google.maps.event.addListener(map, 'zoom_changed', function() {
          infowindow.close()
      });
    });
}

var jobData = [
  {
    id: 1,
    title: 'Junior Front-End Web Developer',
    stringLocal: 'US-TX-Stafford',
    location: {lat: 29.62573, lng:-95.565703},
    links: 'https://careers-iesresidential.icims.com/jobs/4346/junior-front-end-web-developer/job',
  },
  {
    id: 2,
    title: 'Residential Electrician-Denver, Colorado',
    stringLocal: 'US-CO-Denver',
    location: {lat: 39.761849, lng:-104.880625},
    links: 'https://careers-iesresidential.icims.com/jobs/4337/residential-electrician-denver%2c-colorado/job',
  },
  {
    id: 3,
    title: 'Material Purchaser',
    stringLocal: 'US-GA-Auburn',
    location: {lat: 34.01635, lng:-83.830907},
    links: 'https://careers-iesresidential.icims.com/jobs/4329/material-purchaser/job',
  },
  {
    id: 4,
    title: 'Administrative Assistant- San Antonio, TX',
    stringLocal: 'US-TX-San Antoio',
    location: {lat: 29.472403, lng:-98.525142},
    links: 'https://careers-iesresidential.icims.com/jobs/4325/administrative-assistant--san-antonio%2c-tx/job',
  },
  {
    id: 5,
    title: 'Estimator-Auburn Georgia',
    stringLocal: 'US-GA-Auburn',
    location: {lat: 34.01635, lng:-83.830907},
    links: 'https://careers-iesresidential.icims.com/jobs/4296/estimator-auburn-georgia/job',
  },
  {
    id: 6,
    title: 'Residential Electrician-Buda Tx',
    stringLocal: 'US-TX-Buda',
    location: {lat: 30.084169, lng:-97.845255},
    links: 'https://careers-iesresidential.icims.com/jobs/4288/residential-electrician-buda-tx/job',
  },
  {
    id: 7,
    title: 'Administrative Assistant',
    stringLocal: 'US-TX-Stafford',
    location: {lat: 29.62573, lng:-95.565703},
    links: 'https://careers-iesresidential.icims.com/jobs/4277/administrative-assistant/job',
  },
  {
    id: 8,
    title: 'Residential Electrician-Webster Tx',
    stringLocal: 'US-TX-Webster',
    location: {lat: 29.532072, lng:-95.116478},
    links: 'https://careers-iesresidential.icims.com/jobs/4263/residential-electrician-webster-tx/job',
  },
];

var main = document.getElementById('#main');

function createButtons() {
  for (var i=0; i<jobData.length; i++) {
    var local = jobData[i].stringLocal.split('-');
    var title = jobData[i].title.split('-');
    // console.log(local);
    var newDiv = document.createElement("a");
    newDiv.setAttribute('href', jobData[i].links);
    var heading = "<h4 class='title'>" + title[0] + "</h4>";
    var city = "<h5>" + local[2] + ', ' + local[1] + "</h5>";
    var button = "<h3>Click to Apply</h3>";
    newDiv.setAttribute('href', jobData[i].links);
    newDiv.setAttribute('target', '_blank');
    // newDiv.innerHTML = "<a target='_blank' href='"+ jobData[i].links + "'>" +
    //     heading + city + button + "</a>";
    newDiv.innerHTML = heading + city + button;
    newDiv.className = 'button';
    document.body.appendChild(newDiv, main);
  }
}

createButtons();
