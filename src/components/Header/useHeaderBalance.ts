import { useCallback, useRef, useState } from "react";

/**
 * Estado do saldo exibido no header + refresh (ligar à API depois).
 * useRef evita race em cliques rápidos sem recriar o callback.
 */
export function useHeaderBalance(initialFormatted = "239,49") {
  const [balanceDisplay, setBalanceDisplay] = useState(initialFormatted);
  const [balanceRefreshing, setBalanceRefreshing] = useState(false);
  const busyRef = useRef(false);

  const refreshBalance = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBalanceRefreshing(true);
    try {
      // TODO: await api.getBalance()
      await new Promise((r) => setTimeout(r, 700));
      setBalanceDisplay(initialFormatted);
    } finally {
      busyRef.current = false;
      setBalanceRefreshing(false);
    }
  }, [initialFormatted]);

  return { balanceDisplay, balanceRefreshing, refreshBalance };
}
