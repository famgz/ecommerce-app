'use client';

import axios from 'axios';
import { useState } from 'react';

export default function CategoriesPage() {
  const [name, setName] = useState('');

  async function saveCategory() {
    await axios.post('/api/categories', {name})
    setName('')
  }

  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={saveCategory}>
        <label>
          <span>New Category name</span>
          <div className='flex gap-2'>
            <input type='text' placeholder='Category name' value={name} onChange={ev => setName(ev.target.value)}/>
            <button type='submit' className='btn-primary'>
              Save
            </button>
          </div>
        </label>
      </form>
    </div>
  );
}
