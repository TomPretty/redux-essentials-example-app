import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const resetForm = () => {
    setTitle('')
    setContent('')
  }

  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()

  const onSavePostClicked = () => {
    if (title && content && userId) {
      dispatch(postAdded(title, content, userId))

      resetForm()
    }
  }

  return (
    <section>
      <h2>Add a new post</h2>

      <form>
        <label htmlFor="post-title">Title: </label>
        <input
          id="post-title"
          name="post-title"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="post-author">Author: </label>
        <select id="post-author" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="post-content">Content: </label>
        <textarea
          id="post-content"
          name="post-content"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked}>
          Save post
        </button>
      </form>
    </section>
  )
}
