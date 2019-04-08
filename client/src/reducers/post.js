import { DELETE_POST  , FETCH_POSTS, ADD_POST, FETCH_POST } from "./../actions/post";

const initialAppState = {
  posts: [],
  post: {}
};
const reducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.post]
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts:action.posts
      }
    case FETCH_POST:
      return {
        ...state,
        post:action.post
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.id)
      };
    default:
      return state;
  }
};
export default reducer;
