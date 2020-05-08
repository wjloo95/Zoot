import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { HomeFilled } from '@ant-design/icons';
import {
  Listings as ListingsData,
  Listings_listings_result,
} from '../../../../lib/graphql/queries/Listings/__generated__/Listings';
import { ListingCard } from '../../../../lib/components';
import { useViewport } from '../../../../lib/utils';
import { Link } from 'react-router-dom';

interface IProps {
  latitude: number;
  longitude: number;
  listings: ListingsData['listings']['result'] | null;
  selectedListing: Listings_listings_result | null;
  setSelectedListing: (listing: Listings_listings_result | null) => void;
}

const DEFAULT_ZOOM = 9;
const MAX_ZOOM = 18;
const MIN_ZOOM = 4;

export const ListingsMap = ({
  latitude,
  longitude,
  listings,
  selectedListing,
  setSelectedListing,
}: IProps) => {
  const initialViewport = {
    latitude,
    longitude,
    zoom: DEFAULT_ZOOM,
    maxZoom: MAX_ZOOM,
    minZoom: MIN_ZOOM,
  };
  const [viewport, setViewport] = useViewport(initialViewport);

  const closePopup = () => {
    setSelectedListing(null);
  };

  const popupElement = selectedListing ? (
    <Popup
      latitude={selectedListing.latitude}
      longitude={selectedListing.longitude}
      onClose={closePopup}
      tipSize={0}
      sortByDepth={true}
      captureScroll={true}
      dynamicPosition={false}
      closeButton={true}
      closeOnClick={false}
      className="map-popup"
    >
      <Link to={`/listing/${selectedListing.id}`}>
        <ListingCard listing={selectedListing} map />
      </Link>
    </Popup>
  ) : null;

  const coordinateMarkers = listings
    ? listings.map((listing) => (
        <Marker
          key={listing.id}
          latitude={listing.latitude}
          longitude={listing.longitude}
        >
          <HomeFilled
            style={{
              fontSize: '30px',
              color: `${
                selectedListing?.id === listing.id ? '#0984e3' : '#2d3436'
              }`,
              cursor: 'pointer',
            }}
            onClick={() => {
              setSelectedListing(listing);
            }}
          />
        </Marker>
      ))
    : null;

  return (
    <div className="map">
      <ReactMapGL
        mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
        mapStyle="mapbox://styles/mapbox/bright-v8"
        width={'100%'}
        height={'700px'}
        {...viewport}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {coordinateMarkers}
        {popupElement}
      </ReactMapGL>
    </div>
  );
};