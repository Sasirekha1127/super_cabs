
import { useEffect, useRef, useState } from 'react';
import api from './api';

const withManagedStatus = (items, managed) => {
  Object.defineProperty(items, 'hasManagedItems', {
    value: managed,
    configurable: true,
  });
  return items;
};

export default function usePublicContent(type, fallback = []) {
  const fallbackRef = useRef(fallback);
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    let live = true;

    api
      .get(`/content/public/${type}`)
      .then((result) => {
        if (live && result?.items) {
          const managed = result.items.map((item) => ({
            ...item.data,
            id: item._id,
            slug: item.slug || item.data?.slug,
            title: item.title || item.data?.title,
            isActive: item.isActive,
          }));

          setItems(
            result.hasManagedItems
              ? withManagedStatus(managed, true)
              : fallbackRef.current
          );
        }
      })
      .catch(() => { });

    return () => {
      live = false;
    };
  }, [type]);

  return items;
}
  