export const getName = (id) => {
  return fetch(`/api/names/channel/${id}`).then((res) => res.json())
}