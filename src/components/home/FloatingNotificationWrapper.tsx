'use client';

import dynamic from 'next/dynamic';

const FloatingNotification = dynamic(() => import('./FloatingNotification'), {
  ssr: false,
});

export default function FloatingNotificationWrapper() {
  return <FloatingNotification />;
}
