import { doc, getDoc } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { Order } from "../../../../common/entities/order";
import { OrderTemplate } from "../../components/templates/Order";
import { db } from "../../lib/firebase";

export interface OrderPageProps {
  order: Order;
}

const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
  const orderId = order.id as string;
  const [syncedOrderState, setSyncedOrderState] = React.useState<Order>(order);
  const [orderDoc] = useDocumentData(doc(db, "orders", orderId));
  React.useEffect(() => {
    if (!orderDoc) {
      return;
    }
    setSyncedOrderState(orderDoc as any);
  }, [order, orderDoc]);

  return <>{syncedOrderState && <OrderTemplate order={syncedOrderState} />}</>;
};

export default OrderPage;

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params || typeof context.params.orderId !== "string") {
    return {
      notFound: true,
    };
  }
  const orderDoc = await getDoc(doc(db, "orders", context.params.orderId));
  const orderDocData = orderDoc.data();
  return {
    props: {
      order: JSON.parse(JSON.stringify(orderDocData)),
    },
    revalidate: 150,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
