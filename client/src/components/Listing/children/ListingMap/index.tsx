import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Typography } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';

const { Title } = Typography;

interface IProps {
  latitude: number;
  longitude: number;
}

export const ListingMap = ({ latitude, longitude }: IProps) => {
  const initialViewport = {
    latitude,
    longitude,
    zoom: 11,
    maxZoom: 18,
    minZoom: 4,
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
          console.log(viewport);
          setViewport(viewport);
        }}
      >
        <Marker latitude={latitude} longitude={longitude}>
          <EnvironmentFilled style={{ fontSize: '30px', color: '#2d3436' }} />
        </Marker>
      </ReactMapGL>
    </div>
  );
};
