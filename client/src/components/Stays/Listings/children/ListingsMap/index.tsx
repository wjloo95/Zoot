import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { EnvironmentFilled } from '@ant-design/icons';
import {
  Listings as ListingsData,
  Listings_listings_result,
} from '../../../../../lib/graphql/queries/Listings/__generated__/Listings';
import { ListingCard } from '../../../../../lib/components';
import { useViewport, calcMid, calcZoom } from '../../../../../lib/utils';
import { Link } from 'react-router-dom';

interface IProps {
  listings: ListingsData['listings']['result'] | null;
  selectedListing: Listings_listings_result | null;
  setSelectedListing: (listing: Listings_listings_result | null) => void;
}

const MAX_ZOOM = 18;

export const ListingsMap = ({
  listings,
  selectedListing,
  setSelectedListing,
}: IProps) => {
  const [latitude, longitude, max] = calcMid(listings);
  let currZoom = calcZoom(max);

  const initialViewport = {
    latitude,
    longitude,
    zoom: currZoom,
    maxZoom: MAX_ZOOM,
  };
  const [viewport, setViewport] = useViewport(initialViewport);
  if (!listings || !listings.length) {
    return null;
  }

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
          offsetTop={-25}
          offsetLeft={-12.5}
        >
          <EnvironmentFilled
            style={{
              fontSize: '25px',
              color: `${
                selectedListing?.id === listing.id
                  ? 'var(--light-secondary-color)'
                  : 'var(--dark-font-color)'
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
        // mapStyle="mapbox://styles/mapbox/bright-v8"
        mapStyle="mapbox://styles/wjloo95/cka0ndtyh0hwl1jp8gnbnyept"
        width={'100%'}
        height={'800px'}
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
