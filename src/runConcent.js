import { run } from "concent";
import calcModel from "./model";

run(
  {
    calc: calcModel
  },
  {
    isHot: true
  }
);
