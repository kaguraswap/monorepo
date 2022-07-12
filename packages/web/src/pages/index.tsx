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
  const queryList = [{ property: "isValid", operator: "==" as WhereFilterOp, value: true as any }];
  const [queryConditions, setQueryConditions] = React.useState([where("isValid", "==", true)]);

  const [orderDocs] = useCollectionData(query(collection(db, "orders"), ...queryConditions));
  React.useEffect(() => {
    if (!orderDocs) {
      return;
    }

    setSynceOrdersState(orderDocs as any);
  }, [orderDocs]);

  React.useEffect(() => {
    const { chainId, direction } = router.query;
    if (chainId) {
      queryList.push({ property: "chainId", operator: "==" as WhereFilterOp, value: chainId as string });
    }
    if (direction) {
      queryList.push({ property: "direction", operator: "==" as WhereFilterOp, value: direction as string });
    }
    const queryConditions = queryList.map((condition) =>
      where(condition.property, condition.operator, condition.value)
    );
    setQueryConditions(queryConditions);
  }, [router]);

  return <HomeTemplate orders={syncedOrdersState} />;
};

export default HomePage;
