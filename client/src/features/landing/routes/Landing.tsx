import { useEffect } from 'react';
import { Head } from '../../../components/Head';
import { getUUID } from '../../../utils/uuid';

export function Landing() {
  useEffect(() => {
    getUUID();
  }, []);

  return (
    <>
      <Head title="Home" />
      <div>Home page</div>
    </>
  );
}
