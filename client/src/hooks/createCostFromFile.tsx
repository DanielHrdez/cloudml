import { createEffect, createSignal } from "solid-js";
import { fetchCostFromJSON } from "../logic/fetchAPI";
import { parseCSVCost } from "../logic/parseCSVCost";

export function createCostFromFile() {
  const [cost, setCost] = createSignal(0);
  const [file, setFile] = createSignal<File>();
  const reader = new FileReader();
  reader.onload = (e) => {
    const timeCapacityObject = parseCSVCost(e.target!.result!);
    fetchCostFromJSON(timeCapacityObject).then((cost) => setCost(cost));
  };
  createEffect(() => {
    if (file()) reader.readAsText(file()!);
  });
  return { cost, setFile };
}
