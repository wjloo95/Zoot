import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { EnvironmentFilled } from '@ant-design/icons';
import { Listings as ListingsData } from '../../../../lib/graphql/queries/Listings/__generated__/Listings';

interface IProps {
  latitude: number;
  longitude: number;
  listings: ListingsData['listings']['result'] | null;
}

export const ListingsMap = ({ latitude, longitude, listings }: IProps) => {
  const initialViewport = {
    latitude,
    longitude,
    zoom: 10,
    maxZoom: 18,
    minZoom: 4,
  };
  const [viewport, setViewport] = useState(initialViewport);

  const coordinateMarkers = listings
    ? listings.map((listing) => (
        <Marker
          key={listing.id}
          latitude={listing.latitude}
          longitude={listing.longitude}
        >
          <EnvironmentFilled style={{ fontSize: '30px', color: '#2d3436' }} />
        </Marker>
      ))
    : null;

  return (
    <div className="map">
      <ReactMapGL
        mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        width={'100%'}
        height={600}
        {...viewport}
        onViewportChange={(viewport) => {
          console.log(viewport);
          setViewport(viewport);
        }}
      >
        {coordinateMarkers}
      </ReactMapGL>
    </div>
  );
};
