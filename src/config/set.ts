import { Options } from "react-select";
import { TFTSetSelectValue } from "../interfaces";
import { SET6, SET65, SET7, SET75 } from "./champions";

const tftSetOptions: Options<TFTSetSelectValue> = [
  // {
  //   value: 1,
  //   label: "Set 1: Faction Wars",
  //   champions: [],
  // },
  // {
  //   value: 2,
  //   label: "Set 2: Rise of the elements",
  //   champions: [],
  // },
  // {
  //   value: 3,
  //   label: "Set 3: Galaxies",
  //   champions: [],
  // },
  // {
  //   value: 4,
  //   label: "Set 4: Fates",
  //   champions: [],
  // },
  // {
  //   value: 4.5,
  //   label: "Set 4.5: Fates, Festival of Beasts",
  //   champions: [],
  // },
  // {
  //   value: 5,
  //   label: "Set 5: Reckoning",
  //   champions: [],
  // },
  // {
  //   value: 5.5,
  //   label: "Set 5.5: Reckoning, Dawn of Heroes",
  //   champions: [],
  // },
  {
    value: 6,
    label: "Set 6: Gizmos & Gadgets",
    champions: SET6,
  },
  {
    value: 6.5,
    label: "Set 6.5: Gizmos & Gadgets, Neon Nights",
    champions: SET65,
  },
  {
    value: 7,
    label: "Set 7: Dragonlands",
    champions: SET7,
  },
  {
    value: 7.5,
    label: "Set 7.5: Dragonlands, Uncharted Realms",
    champions: SET75,
  },
];

export default tftSetOptions;
