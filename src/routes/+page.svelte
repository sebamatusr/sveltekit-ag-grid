<script lang="ts">
	import { onMount } from 'svelte';
    import { Grid } from 'ag-grid-community';
    import type { GridOptions } from 'ag-grid-community'
    import 'ag-grid-community/styles/ag-grid.css';
    import 'ag-grid-community/styles/ag-theme-alpine.css';
	import type { PageData } from './$types';
	import { ButtonRenderer } from '$lib/CellRenderers/ButtonRenderer';
	import Button from '$lib/Button.svelte';
	import { cellRendererFactory } from '$lib/CustomComponentRendererFactory';

    export let data: PageData;
    export let grid: Grid;

    export const loadLyrics = async (albumId: any) => {
        return await fetch('api/tracklist?id='+albumId)
    }

    let gridOptions: GridOptions = {
        context: {
            loadLyrics: loadLyrics
        },
        columnDefs: [
            {field: 'id', headerName: 'ID', editable: false},
            {field: 'userId', headerName: 'User Id'},
            {field: 'title', headerName: 'Title', editable: true},
            // pass svelte Component using specific renderer
            // {field: 'buttonRender', headerName: 'Button', cellRenderer: ButtonRenderer}
            // use factory to create and pass svelte Component
            {field: 'buttonRender', headerName: 'Button', cellRenderer: cellRendererFactory((c, p) => {
                new Button({
                    target: c.eGui,
                    props: {
                        text: 'Factory!',
                        myFunc: undefined,
                        albumId: p.data.id
                    }
                });
            }),}
            

        ],
        rowData: data.props.albums,
		getRowId: (params) => params.data.id
    }

    onMount(() => {
        const gridEl = document.getElementById("my-grid");
        if(!gridEl)
        {
            throw new Error("Grid element not found");
        }

        grid = new Grid(gridEl, gridOptions);
    })
</script>

<div id="not-my-grid" class="px-4">
    <h1 class="is-size-1"> Albums</h1>
	<div id="my-grid" style="height: 500px; width: 100%" class="ag-theme-alpine column is-10"/>
    <h1 class="is-size-1"> END</h1>
</div>


