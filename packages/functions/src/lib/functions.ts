import * as _functions from "firebase-functions";

import { FIREBASE_REGION } from "../../../common/configs/app";

export const functions = _functions.region(FIREBASE_REGION);
