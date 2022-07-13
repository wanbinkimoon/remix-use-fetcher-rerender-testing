import { useFetcher } from '@remix-run/react';
import React, { useContext, useEffect } from 'react';
import { UNSAFE_LocationContext, useLocation } from 'react-router-dom';

export default function TestRoute() {
  return (
    <div>
      <DataComponent />
      <LocationComponent />
    </div>
  );
}

const LocationComponent = React.memo(() => {
  const locationContext = useContext(UNSAFE_LocationContext);
  const location = useLocation();

  // This prints 3 times: once on the initial page load, once when the fetcher
  // starts loading, and once when the fetcher is done loading.
  useEffect(() => {
    console.log('LocationContext changed');
  }, [locationContext]);

  // useLocation's value doesn't change, this only prints once during the
  // initial render.
  useEffect(() => {
    console.log('Location changed');
  }, [location]);

  // This also prints 3 times with the exact same output, even if we remove the
  // useContext call above.
  //
  // Even though useLocation doesn't change, react devtools say this component
  // is rendering due to "context changes". Removing the useLocation() call
  // makes this render just once.
  console.log('Location: ', JSON.stringify(location));
  return <div />;
});

const DataComponent = () => {
  const fetcher = useFetcher();
  useEffect(() => {
    fetcher.load('/resources/users');
  }, []);

  return <div>{JSON.stringify(fetcher.data)}</div>;
};
