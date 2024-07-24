import { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import axios from 'axios';

interface Geolocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface Address {
  road?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

const useGeolocation = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (!isGeolocationAvailable) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    if (!isGeolocationEnabled) {
      setError('Geolocation is not enabled');
      return;
    }

    if (coords) {
      const { latitude, longitude } = coords;

      const fetchAddress = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = response.data.address;
          setAddress({
            road: data.road,
            city: data.city,
            state: data.state,
            country: data.country,
            postalCode: data.postcode,
          });
        } catch (error) {
          setError('Failed to fetch address');
        }
      };

      fetchAddress();
    }
  }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

  return { geolocation: coords, address, error };
};

export default useGeolocation;
