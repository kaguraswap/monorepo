import { collection, query, where, WhereFilterOp } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { Order } from "../../../common/entities/order";
import { HomeTemplate, HomeTemplateProps } from "../components/templates/Home";
import { db } from "../lib/firebase";

const HomePage: NextPage<HomeTemplateProps> = () => {
  const router = useRouter();
  const [syncedOrdersState, setSynceOrdersState] = React.useState<Order[]>([]);

  const [queryConditions, setQueryConditions] = React.useState([where("isValid", "==", true)]);

  const [orderDocs] = useCollectionData(query(collection(db, "orders"), ...queryConditions));
  React.useEffect(() => {
    if (!orderDocs) {
      return;
    }

    setSynceOrdersState(orderDocs as Order[]);
  }, [orderDocs]);

  React.useEffect(() => {
    const { chainId, direction } = router.query;
    const queryList = [{ property: "isValid", operator: "==" as WhereFilterOp, value: true as unknown }];
    if (chainId) {
      queryList.push({ property: "chainId", operator: "==", value: chainId });
    }
    if (direction) {
      queryList.push({ property: "direction", operator: "==", value: direction });
    }
    const queryConditions = queryList.map((condition) =>
      where(condition.property, condition.operator, condition.value)
    );
    setQueryConditions(queryConditions);
  }, [router]);

  return <HomeTemplate orders={syncedOrdersState} />;
};

export default HomePage;
