import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentItem from '../post/CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);
    return loading || post === null ? (<Spinner />) : (<Fragment>
        <Link to="/posts" className="btn">
            Back to Posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem key={Comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>);
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
