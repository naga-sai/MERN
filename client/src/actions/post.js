import axios from 'axios';

export const REMOVE_POST="REMOVE_POST";
export const ADD_POST ="ADD_POST";
export const FETCH_POSTS ="FETCH_POSTS";
export const FETCH_POST ="FETCH_POST";
export const DELETE_POST ="DELETE_POST";

// create Post
export const createPost = (post)=>dispatch=>{
    axios
    .post('http://localhost:3000/api/post/savePost',post)
    .then(res =>
      {
      dispatch({
        type: ADD_POST,
        post: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: ADD_POST,
        post: null
      })
    );
}

// get All posts
export const fetchPosts=()=>dispatch=>{
    axios
    .get('http://localhost:3000/api/post/getAllPosts')
    .then(res =>{
      dispatch({
        type: FETCH_POSTS,
        posts: res.data.result 
      })
    } 
    )
    .catch(err =>{
      console.log(err)
      dispatch({
        type: FETCH_POSTS,
        posts: null
      })
    } 
    );
}

// get post
export const fetchPost=(id)=>dispatch=>{
  axios
  .get('http://localhost:3000/api/post/getPost/'+id)
  .then(res =>{
    dispatch({
      type: FETCH_POST,
      post: res.data.result 
    })
  }
    
  )
  .catch(err =>
    dispatch({
      type: FETCH_POST,
      posts: null
    })
  );
}

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`http://localhost:3000/api/post/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        id
      })
    )
    .catch(err =>
      console.log(err)
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .put(`http://localhost:3000/api/post/updateLikes/${id}`)
    .then(res => dispatch(fetchPosts()))
    .catch(err =>
      console.log(err)
    );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`http://localhost:3000/api/post/updatePost/${postId}`, commentData)
    .then(res =>
      {
        console.log("addCom")
        console.log(res.data);
        dispatch({
          type: FETCH_POST,
          post: res.data
        })
      }
    
    )
    .catch(err =>
     console.log(err)
    );
};
