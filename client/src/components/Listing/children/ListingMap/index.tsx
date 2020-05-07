import React, { useState } from 'react';
import ReactMapGL, { ViewportProps } from 'react-map-gl';
import { Typography } from 'antd';

const { Title } = Typography;

interface IProps {
  latitude: number;
  longitude: number;
}

export const ListingMap = ({ latitude, longitude }: IProps) => {
  const initialViewport = {
    latitude,
    longitude,
    zoom: 10,
  };
  const [viewport, setViewport] = useState(initialViewport);
  return (
    <div className="listing-details__map">
      <Title level={3}>Location</Title>
      <ReactMapGL
        mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        width={'100%'}
        height={400}
        {...viewport}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      />
    </div>
  );
};
