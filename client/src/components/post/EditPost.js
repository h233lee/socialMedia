import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost, editPost } from '../../actions/post';
import Spinner from '../layout/Spinner';

const EditPost = ({
  post: { post, loading },
  getPost,
  editPost,
  match,
  history,
}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    getPost(match.params.id);
    if (!loading) {
      setText(post.text);
    }
  }, [loading, getPost, match.params.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    editPost(post._id, text, history);
  };

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts">
        <button className="btn btn-light my-1">Back To Posts</button>
      </Link>
      <h1 className="large text-primary">Edit Your Post</h1>
      <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          required
          value={text}
          placeholder={post.text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" />
      </form>
    </Fragment>
  );
};

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost, editPost })(
  withRouter(EditPost)
);
