import { Listings as ListingsData } from '../../graphql/queries/Listings/__generated__/Listings';

export function calcMid(listings: ListingsData['listings']['result'] | null) {
  if (listings) {
    let maxDistanceAwayFromMid = 0;
    let distanceTotals = [0, 0];
    for (let listing of listings) {
      distanceTotals[0] += listing.latitude;
      distanceTotals[1] += listing.longitude;
    }
    distanceTotals[0] /= listings.length;
    distanceTotals[1] /= listings.length;
    for (let listing of listings) {
      let currDistanceAwayFromMid = calcDist(distanceTotals, [
        listing.latitude,
        listing.longitude,
      ]);
      if (currDistanceAwayFromMid > maxDistanceAwayFromMid) {
        maxDistanceAwayFromMid = currDistanceAwayFromMid;
      }
    }

    return [...distanceTotals, maxDistanceAwayFromMid];
  } else {
    return [0, 0, 0];
  }
}

const calcDist = ([lat1, lon1]: number[], [lat2, lon2]: number[]): number => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const calcZoom = (maxDistance: number): number => {
  if (maxDistance < 20000) return 10.5;
  if (maxDistance < 20000) return 9;
  if (maxDistance < 100000) return 8.5;
  if (maxDistance < 250000) return 7;
  if (maxDistance < 700000) return 5.5;
  if (maxDistance < 1000000) return 4.5;
  if (maxDistance < 1500000) return 4.5;

  return 3;
};
