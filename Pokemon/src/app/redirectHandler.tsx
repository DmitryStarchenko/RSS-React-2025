'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/' || pathname === '') {
      router.replace('/main');
    }
  }, [pathname, router]);

  return null;
}
