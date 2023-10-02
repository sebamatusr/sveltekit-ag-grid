
export const load = async () => {
    const albums = await fetch('https://jsonplaceholder.typicode.com/albums');

  return {
    props: {
      albums: await albums.json(),
    },
  };
}

