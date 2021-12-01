import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  postUpdated } from './postsSlice'
import { useHistory } from 'react-router'

export const EditPostForm = ({ match }) => {
	const { postId } = match.params

	const post = useSelector((state) => state.posts.find(post => post.id === postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const dispatch = useDispatch()
	const history = useHistory()

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
					id: postId,
          title,
          content,
        })
      )

			history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit post</h2>

      <form>
        <label htmlFor="post-title">Title: </label>
        <input
          id="post-title"
          name="post-title"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="post-content">Content: </label>
        <textarea
          id="post-content"
          name="post-content"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked}>Save post</button>
      </form>
    </section>
  )
}
