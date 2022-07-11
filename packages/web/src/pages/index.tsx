import { collection, query, where } from "firebase/firestore";
import type { NextPage } from "next";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { Order } from "../../../common/entities/order";
import { HomeTemplate, HomeTemplateProps } from "../components/templates/Home";
import { db } from "../lib/firebase";

const HomePage: NextPage<HomeTemplateProps> = () => {
  const [syncedOrdersState, setSynceOrdersState] = React.useState<Order[]>([]);
  const [orderDocs] = useCollectionData(query(collection(db, "orders"), where("isValid", "==", true)));
  React.useEffect(() => {
    if (!orderDocs) {
      return;
    }
    setSynceOrdersState(orderDocs as any);
  }, [orderDocs]);
  return <HomeTemplate orders={syncedOrdersState} />;
};

export default HomePage;
