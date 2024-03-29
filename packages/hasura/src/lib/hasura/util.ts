import { ParsedUrlQuery } from "querystring";

import { INFINITE_SCROLL_NUMBER } from "../../../../shared/src/configs/app";
import { HasuraCondition } from "./type";

export * from "./type";

export const toHasuraCondition = (parsedUrlQuery: ParsedUrlQuery) => {
  let where: HasuraCondition = {};
  let orderBy: HasuraCondition = {};
  Object.entries(parsedUrlQuery).forEach(([key, value]) => {
    if (!value) {
      return;
    }
    if (key !== "orderBy") {
      where = {
        ...where,
        ...key
          .split("-")
          .reverse()
          .reduce((all, item, i) => {
            return { [item]: i === 0 ? { [typeof value === "object" ? "_in" : "_eq"]: value } : all };
          }, {}),
      };
    } else {
      if (typeof value !== "string") {
        return;
      }

      const values = value.split("-");
      const lastValue = values.pop();
      orderBy = values.reverse().reduce((all, item, i) => {
        return { [item]: i === 0 ? lastValue : all };
      }, {});
    }
  });
  return { where, orderBy, offset: 0, limit: INFINITE_SCROLL_NUMBER };
};
