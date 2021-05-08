import { callAPI } from "../helper";

export const onShowReport = () => {
  return callAPI(`report`, "GET");
};
