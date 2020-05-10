import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Typography } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';
import { useViewport } from '../../../../lib/utils';

const { Title } = Typography;

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
      <Title level={3}>Location</Title>
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
          <EnvironmentFilled style={{ fontSize: '30px', color: '#2d3436' }} />
        </Marker>
      </ReactMapGL>
    </div>
  );
};
