//generic fetch function to get data from server
export const fetchData = async ({ setData, url, sgnl }) => {
    const res = await fetch(url, { signal: sgnl });
    setData(await res.json());
}