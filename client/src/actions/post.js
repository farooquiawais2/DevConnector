import axios from "axios";
import setAert from './alert';
import { GET_POSTS, GET_POST, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, ADD_COMMENT, REMOVE_COMMENT } from './types';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText }
        });
    }
};

// Get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText }
        }); console.log("I am here...............");
    }
};

// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            //    "id" is post ID & "res.data" returns arrays of likes
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText }
        });
    }
};

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            //    "id" is post ID & "res.data" returns arrays of likes
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText }
        });
    }
};

// Delete post
export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAert('Post removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText }
        });
    }
};

// Add post
export const addPost = formData => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAert('Post added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText }
        });
    }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAert('Comment added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText }
        });
    }
};

// Remove comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAert('Comment removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText }
        });
    }
};