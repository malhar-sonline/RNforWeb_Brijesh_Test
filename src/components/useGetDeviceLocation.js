import Geolocation from '@react-native-community/geolocation';
import { useEffect } from 'react';
import { useState } from 'react';

export default function useGetDeviceLocation() {
  const [deviceCurrentLocation, setDeviceCurrentLocation] = useState({});
  useEffect(() => {
    // if (Platform.OS !== 'web')
    getLocation();
  }, []);

  /**
   * invoke funtion for get user current lat long
   * @param latitude
   * @param longitude
   */
  const getLocation = () => {
    Geolocation.getCurrentPosition(info => {
        /**
        * update date into state
        * @param latitude
        * @param longitude
        */
      setDeviceCurrentLocation({
        lat: info.coords.latitude,
        lng: info.coords.longitude,
      });
    });
  };

  return {
    deviceCurrentLocation,
    getLocation,
  };
}
