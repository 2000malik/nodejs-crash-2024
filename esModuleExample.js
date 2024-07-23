const post = [
  {
    id: "1",
    name: "Malik",
  },
  {
    id: "2",
    name: "ojo",
  },
];
export const getPostLength = () => post.length; // export without default
const getPosts = () => post; // export as default
export default getPosts;
