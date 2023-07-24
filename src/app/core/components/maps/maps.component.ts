import { Size } from "./../../models/icon.model";
import { HttpClient } from "@angular/common/http";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Observable, map, catchError, of } from "rxjs";
import { MapDirectionsService } from "@angular/google-maps";
import { DistrictService } from "../../services/district.service";

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"],
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() branches: any[] = [];
  @Input() cityLocation: any = { lat: 24.742394, lng: 46.741473, zoom: 11.5 };
  @Input() districtLocation: any = { lat: 24.65, lng: 46.71, zoom: 2 };
  @Input() selectedDistrict: any;
  @Input() financeStats!: boolean;
  @Input() projectsView!: boolean;
  @Output() actionTaken = new EventEmitter();
  @Input() centerPoint: any
  size: Size = new Size(30, 30);
  topSize: Size = new Size(35, 35);
  apiLoaded: Observable<boolean> = of(false);
  showInfoWindow = false;
  selectedBranch: any;
  mapLocation = { lat: 24.742394, lng: 46.741473, zoom: 8 };
  currentLocation: any;
  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  directionReady = false;
  showStatistics = false;
  districts = this.districtService.getDistricts();
  mapDiv!: google.maps.Map;
  isNightMode: boolean = true
  KSA_BOUNDS = {
    north: 32.186356,
    south: 16.343458,
    west: 34.959348,
    east: 55.671963,
  };

  optionStyle = [{
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
    {
      featureType: "water",
      stylers: [{ visibility: "on" }],
    },
  ]

  options = {
    center: this.districtLocation,
    zoom: this.districtLocation.zoom,
    styles: this.optionStyle,
    restriction: {
      latLngBounds: this.KSA_BOUNDS,
      strictBounds: false,
    },
    gestureHandling: "cooperative",
    region: "SA",
  };

  optionStyleNight = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]

  clusterStyles = [{
    height: 32,
    width: 32,
  }]

  clusterOptions = {
    gridSize: 30,
    minimumClusterSize: 2,
    averageCenter: true
  };

  markerOptions = {
    animation: 1.0,
  };


  constructor(
    private httpClient: HttpClient,
    private mapDirectionsService: MapDirectionsService,
    private districtService: DistrictService
  ) {
    console.log(this.financeStats)
    this.init()
  }


  init() {
    this.apiLoaded = this.httpClient
      .jsonp(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBmRo1F-upNGcqaavKjk4hJE3GA-z4K37M&region=SA",
        "callback"
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }


  switchMapView() {
    if (!this.isNightMode) {
      this.isNightMode = true

      this.mapDiv.setOptions({ styles: this.optionStyleNight });
    } else {
      this.isNightMode = false

      this.mapDiv.setOptions({ styles: this.optionStyle });
    }
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["cityLocation"] && !changes["cityLocation"]?.firstChange) {
      console.log("City");
      this.mapLocation = this.cityLocation;
      this.mapDiv.setCenter(this.mapLocation)
      this.mapDiv.setZoom(this.mapLocation.zoom)

    }
    if (
      changes["districtLocation"] &&
      !changes["districtLocation"]?.firstChange
    ) {
      this.mapLocation = this.districtLocation;
      this.mapDiv.setCenter(this.mapLocation)
      this.mapDiv.setZoom(this.mapLocation.zoom)

    }
    if (
      changes["selectedDistrict"] &&
      !changes["selectedDistrict"]?.firstChange
    ) {
      console.log(this.selectedDistrict);
      this.openStatisticsWindow();
    }
    if (changes['centerPoint']) {
      if (this.mapDiv) {
        this.mapDiv.setCenter(this.centerPoint);
      }
    }
    if (changes['financeStats']) {
      this.init()
    }

  }

  openInfoWindow(branch: any) {
    this.selectedBranch = branch;
    this.showInfoWindow = true;
    this.showStatistics = false;
    // this.router.navigate(["/visitor/details"]);
  }

  closeInfoWindow() {
    this.showInfoWindow = false;
  }

  routeToDirection(branch: any) {
    const request: google.maps.DirectionsRequest = {
      destination: { lat: branch.longitude, lng: branch.latitude },
      origin: { lat: this.currentLocation.lat, lng: this.currentLocation.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsResults$ = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));
    this.showInfoWindow = false;
  }

  openStatisticsWindow() {
    this.showStatistics = true;
    this.showInfoWindow = false;
  }

  closeStatistics() {
    this.showStatistics = false;
  }

  openDistrictsInfo(event: any, distric: any) {
    this.mapDiv.setZoom(8);
    this.actionTaken.emit(distric)
    this.mapDiv.setCenter({ lat: distric.longitude, lng: distric.latitude });
    // console.log(this.mapDiv.getZoom())
  }

  onMapReady(map: google.maps.Map) {
    this.mapDiv = map
    // Create the DIV to hold the control.
    const centerControlDiv = document.createElement('div');
    // Create the control.
    const centerControl = this.createCenterControl(this.mapDiv);
    // Append the control to the DIV.
    centerControlDiv.appendChild(centerControl);

    this.mapDiv.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

    if (this.isNightMode) {
      this.mapDiv.setOptions({ styles: this.optionStyleNight });
    }
  }

  createCenterControl(map: any) {
    const controlButton = document.createElement('button');

    // Set CSS for the control.

    controlButton.style.backgroundColor = '#fff';
    controlButton.style.border = '2px solid #fff';
    controlButton.style.borderRadius = '3px';
    controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlButton.style.color = 'rgb(25,25,25)';
    controlButton.style.cursor = 'pointer';
    controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlButton.style.fontSize = '16px';
    controlButton.style.lineHeight = '38px';
    controlButton.style.margin = '8px 8px 9px';
    controlButton.style.padding = '0px 10px';
    controlButton.style.textAlign = 'center';

    controlButton.innerHTML = '<i class="fa-eye fas"></i>';
    controlButton.title = 'Click to toggle Dark/Standard Mode';
    controlButton.type = 'button';

    // Setup the click event listeners: simply set the map to Chicago.
    controlButton.addEventListener('click', () => {
      this.switchMapView()
    });

    return controlButton;
  }

}
