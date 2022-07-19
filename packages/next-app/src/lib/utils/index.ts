import { ParsedUrlQuery } from "querystring";
import { HasuraCondition } from "types/HasuraCondition";

export const parsedUrlQueryToHasuraCondition = (parsedUrlQuery: ParsedUrlQuery) => {
  const condition: HasuraCondition = {};
  Object.entries(parsedUrlQuery).forEach(([key, value]) => {
    if (!value) {
      return;
    }
    const type = typeof value === "object" ? "_in" : "_eq";
    condition[key] = { [type]: value };
  });
  return condition;
};
