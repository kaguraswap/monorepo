import { doc } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { Order } from "../../../../common/entities/order";
import { OrderTemplate } from "../../components/templates/Order";
import { db } from "../../lib/firebase";

export interface OrderPageProps {
  orderId: string;
}

const OrderPage: NextPage<OrderPageProps> = ({ orderId }) => {
  const [syncedOrderState, setSyncedOrderState] = React.useState<Order>();
  const [orderDoc] = useDocumentData(doc(db, "orders", orderId));

  React.useEffect(() => {
    if (!orderDoc) {
      return;
    }
    setSyncedOrderState(orderDoc as any);
  }, [orderId, orderDoc]);

  return <>{syncedOrderState && <OrderTemplate order={syncedOrderState} />}</>;
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params || typeof context.params.orderId !== "string") {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      orderId: context.params.orderId,
    },
  };
};
