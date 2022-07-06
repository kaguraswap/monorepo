import type { GetServerSideProps, NextPage } from "next";
import React from "react";

import { Order } from "../../../../common/types/order";
import { nft } from "../../../../common/utils/fixture";
import { OrderTemplate } from "../../components/templates/Order";

export interface OrderPageProps {
  orderId: string;
}

const OrderPage: NextPage<OrderPageProps> = ({ orderId }) => {
  const [orderState, setOrderState] = React.useState<Order>();

  // const app = getFirebaseApp();
  // const key = toKey(nft);
  // const [data] = useDocumentData(doc(getFirestore(app), "orders", key));

  return <>{orderState && <OrderTemplate order={orderState} />}</>;
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
