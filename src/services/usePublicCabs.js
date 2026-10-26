import { useEffect, useState } from 'react';
import api from './api';
import { vehicles as fallbackVehicles } from '../Components/data/cabsData';

export default function usePublicCabs() {
  const [vehicles, setVehicles] = useState(fallbackVehicles);
  useEffect(() => {
    let active = true;
    api.get('/cabs').then(result => { if (active && Array.isArray(result.cabs)) setVehicles(result.cabs); }).catch(() => {});
    return () => { active = false; };
  }, []);
  return vehicles;
}
