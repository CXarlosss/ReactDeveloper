import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import useOrder from "../hooks/useOrder";

const OrderContext = createContext({} as ReturnType<typeof useOrder>);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const orderState = useOrder();
  return (
    <OrderContext.Provider value={orderState}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
