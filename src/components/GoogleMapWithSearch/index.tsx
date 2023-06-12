// External import
import React, { useEffect, useState } from "react";
import {} from "google-maps";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../palette";

const useStyles = makeStyles({
  map: {
    height: "400px",
  },
  searchInputWrapper: {
    padding: "28px",
    width: "100%",
    maxWidth: "370px",
  },
  textFieldWrapper: {
    backgroundColor: colors.white,
  },
});

export default function GoogleWithSearch({
  onSelectLocation,
  height,
  noSearch = false,
  disableDefaultUI = false,
  defaultMarkerLocation,
}: Props) {
  const classes = useStyles();

  const [searchText, setSearchText] = useState("");

  const initMap = () => {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      mapTypeControl: false,
      disableDefaultUI: disableDefaultUI,
    });

    if (defaultMarkerLocation) {
      new google.maps.Marker({
        map,
        title: defaultMarkerLocation.name,
        position: { lat: defaultMarkerLocation.lat, lng: defaultMarkerLocation.lng },
      });

      map.setCenter({ lat: defaultMarkerLocation.lat, lng: defaultMarkerLocation.lng });
      map.setZoom(18);
    }

    if (!noSearch) {
      // Create the search box and link it to the UI element.
      const input = document.getElementById("pac-input") as HTMLInputElement;
      const inputWrapper = document.getElementById("search-input-wrapper") as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputWrapper);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
      });

      let markers: google.maps.Marker[] = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        if (onSelectLocation) {
          onSelectLocation(places[0].name);
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry) {
            return;
          }
          const icon = {
            url: place.icon as string,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };

          // Create a marker for each place.
          markers.push(
            new google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            }),
          );

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <>
      {!noSearch && (
        <div id={"search-input-wrapper"} className={classes.searchInputWrapper}>
          <TextField
            classes={{ root: classes.textFieldWrapper }}
            id="pac-input"
            label="Select your location"
            variant="outlined"
            placeholder={"Select your location"}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            fullWidth
          />
        </div>
      )}
      <div id="map" className={classes.map} style={{ height: `${height ? height : 400}px` }} />
    </>
  );
}

interface Marker {
  lat: number;
  lng: number;
  name?: string;
}

interface Props {
  onSelectLocation?: (name: string) => void;
  height?: number;
  noSearch?: boolean;
  disableDefaultUI?: boolean;
  defaultMarkerLocation?: Marker;
}
