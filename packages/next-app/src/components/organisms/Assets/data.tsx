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

export const protocolFilter = {
  defaultValue: [],
  options: Object.entries(protocols).map(([protocol, { name }]) => {
    return { label: name, value: protocol };
  }),
};

export const networkFilter = {
  defaultValue: [],
  options: Object.entries(networks).map(([chainId, { name }]) => {
    return { label: name, value: chainId };
  }),
};
