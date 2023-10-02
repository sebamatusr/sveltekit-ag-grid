import type { ICellRendererParams } from "ag-grid-community";
import Button from "../Button.svelte";

export class ButtonRenderer {
  eGui: HTMLDivElement;
  value: unknown;
  
  constructor() {
    // create empty div to place svelte component in
    this.eGui = document.createElement("div");
  }

  async init(params: ICellRendererParams) {
    this.value = params.value;

    new Button({
      target: this.eGui,
      props: {
        myFunc: params.context.loadLyrics,
        albumId: params.data.id,
      },
    });
  }

  getGui() {
    return this.eGui;
  }

  refresh(params: ICellRendererParams) {
    this.value = params.value;
    this.eGui.innerHTML = '';

    return true;
  }
}