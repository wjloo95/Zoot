import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { EnvironmentFilled } from '@ant-design/icons';
import { useViewport } from '../../../../../lib/utils';

interface IProps {
  latitude: number;
  longitude: number;
}

export const ListingMap = ({ latitude, longitude }: IProps) => {
  const initialViewport = {
    latitude,
    longitude,
    width: '100%',
    height: 400,
    zoom: 11,
    maxZoom: 18,
    minZoom: 4,
  };

  const [viewport, setViewport] = useViewport(initialViewport);

  return (
    <div className="listing-details__map">
      <h2>Location</h2>
      <ReactMapGL
        mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
        // mapStyle="mapbox://styles/mapbox/bright-v8"
        mapStyle="mapbox://styles/wjloo95/cka0ndtyh0hwl1jp8gnbnyept"
        {...viewport}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker latitude={latitude} longitude={longitude}>
          <EnvironmentFilled
            style={{ fontSize: '30px', color: 'var(--light-secondary-color)' }}
          />
        </Marker>
      </ReactMapGL>
    </div>
  );
};
