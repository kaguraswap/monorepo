import networks from "../../../../../common/configs/networks.json";
import protocols from "../../../../../common/configs/protocols.json";

export const sortByOptions = {
  defaultValue: "",
  options: [
    { label: "Price Low to High", value: "validOrders_aggregate-min-sortablePrice-asc" },
    { label: "Price High to Low", value: "validOrders_aggregate-min-sortablePrice-desc" },
  ],
};

export const statusFilter = {
  defaultValue: [],
  options: [{ label: "On Sale", value: "sell" }],
};
