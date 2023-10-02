    /**
     * Base class for embedding a svelte component within an AGGrid cell.
     */
    import type {
        ICellRendererComp,
        ICellRendererParams
      } from "ag-grid-community";
  
      /**
       * Class for defining a cell renderer.
       * If you don't need to define a separate class you could use cellRendererFactory 
       * to create a component with the column definitions.
       */
      export abstract class AbstractCellRenderer implements ICellRendererComp {
  
        eGui: HTMLElement
        protected value: unknown
  
        constructor(parentElement = "span") {
          // create empty span (or other element) to place svelte component in
          this.eGui = document.createElement(parentElement);
        }
  
        init(params: ICellRendererParams) {
          this.value = params.value;
          this.createComponent(params);
        }
  
        getGui() {
          return this.eGui;
        }
  
        refresh(params: ICellRendererParams) {
          this.value = params.value;
          this.eGui.innerHTML = '';
  
          return true;
        }
  
        /**
         * Define and create the svelte component to use in the cell
         * @example
         * // This is all you need to do within this method: create the component with new, specify the target
         * // is the class, and pass in props via the params.
         * new Button({
         *    target: this.eGui,
         *    props: {
         *        text: params.data?.text,
         * }
         * @param params params for rendering the cell, including the value for the cell
         */
        abstract createComponent(params: ICellRendererParams): void
      }
  
      /**
       * Creates a cell renderer using the given callback for how to initialise a svelte component.
       * See AbstractCellRenderer.createComponent
       * @param svelteComponent function for how to create the svelte component
       * @returns 
       */
      export function cellRendererFactory(svelteComponent: (cell: AbstractCellRenderer, params: ICellRendererParams) => void) {
        class Renderer extends AbstractCellRenderer {
          createComponent(params: ICellRendererParams < unknown, unknown > ): void {
            svelteComponent(this, params)
          }
        }
        return Renderer;
      }