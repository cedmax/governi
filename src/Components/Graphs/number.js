import rough from "../../roughjs/src";
import { ranges, roughConfig } from "../../helpers/constants";
import generateColors from "../../helpers/colors";
import { defineRanges, setMapHeight, transform } from "../../helpers/utils";
import { map, legend } from "./parts";

export default async (canvas, gov, geo) => {
  const { data: dataReady, labels } = defineRanges(
    transform(gov, () => 1000),
    ranges
  );
  const colors = generateColors("#010C0E");
  const rc = rough.canvas(canvas, roughConfig);

  legend(rc, canvas, colors, {
    labels,
    title: "Presidenze del consiglio per regione",
    none: "Nessun presidente del consiglio",
    preciseFormatter: (pdc) => `${pdc / 1000} presidenti del consiglio`,
    rangeFormatter: (pdc, pcd) =>
      `${pdc / 1000} o ${pcd / 1000} presidenti del consiglio`,
  });

  map(geo, rc, dataReady, {
    height: setMapHeight(canvas.height),
    colors,
  });
};
