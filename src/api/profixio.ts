const BASE = import.meta.env.VITE_PROXY_BASE;
const ORG  = import.meta.env.VITE_ORG_CODE;

/** Hämta alla turneringar för organisationen */
export async function getTournaments() {
  // 🎯  Korrekt template-literal med back-ticks + ${}
  const res = await fetch(`${BASE}/organisations/${ORG}/tournaments`);

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();            // { data: [...] }
}

// -------- React-hook (valfritt) --------
import { useState, useEffect } from 'react';

export function useTournaments() {
  const [data, setData]     = useState<any[]>([]);
  const [loading, setLoad]  = useState(true);
  const [error, setError]   = useState<Error | null>(null);

  useEffect(() => {
    getTournaments()
      .then(j => setData(j.data || []))
      .catch(setError)
      .finally(() => setLoad(false));
  }, []);

  return { data, loading, error };
}
