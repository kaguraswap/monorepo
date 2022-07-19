import networks from "../../../../../common/configs/networks.json";
import protocols from "../../../../../common/configs/protocols.json";

export const sortByOptions = {
  defaultValue: "price-low-to-high",
  options: [
    { label: "Price Low to High", value: "price-low-to-high" },
    { label: "Price High to Low", value: "price-high-to-low" },
  ],
};

export const statusFilter = {
  defaultValue: [],
  options: [
    { label: "On Sale", value: "on-sale" },
    { label: "Has Offers", value: "has-offer" },
  ],
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
