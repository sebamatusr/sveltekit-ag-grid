<script lang="ts">
    export let text = "not clicked";
    export let myFunc: any;
    export let albumId: number;

    export async function onClick() {
        if(myFunc)
        {
            text = "called func with id "+{albumId};
            //const res = await myFunc(albumId);
        }
        else
        {
            text = "clicked but no function";
        }
    }
  </script>
  
  <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" on:click={onClick}>
    {text}
  </button>