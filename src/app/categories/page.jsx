'use client';

import DeleteButton from '@/components/DeleteButton';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { withSwal } from 'react-sweetalert2';

function CategoriesPage({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios.get('/api/categories').then((res) => setCategories(res.data));
  }

  function resetStates() {
    setEditedCategory(null);
    setName('');
    setParentCategoryId('');
  }

  async function saveCategory(ev) {
    ev.preventDefault();

    const desiredParentCategory = categories.find(
      (ct) => ct._id === parentCategoryId
    );
    const isDesiredParentCategoryChild = desiredParentCategory?.parent;

    // redundancy, since the select tag won't offer children categories
    if (isDesiredParentCategoryChild) {
      alert('child category cannot be parent');
      return;
    }

    // create new category
    if (!editedCategory) {
      await axios.post('/api/categories', {
        name,
        parentCategoryId,
      });
    }

    // edit existing category
    else {
      const isEditedCategoryParent = categories.filter(
        (ct) => ct.parent?._id === editedCategory._id
      ).length;

      if (isEditedCategoryParent && parentCategoryId) {
        alert('parent category cannot have parent');
        return;
      }

      await axios.put('/api/categories', {
        _id: editedCategory._id,
        name,
        parentCategoryId: parentCategoryId,
      });
    }

    getCategories();
    resetStates();
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete category "${category.name}"?`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          axios
            .delete('/api/categories?_id=' + category._id)
            .then((res) => console.log('deleted:', res.data))
            .finally(() => getCategories());
        }
      });
  }

  // Send category fields to be edited
  function editCategory(ct) {
    setName(ct.name);
    setEditedCategory(ct);
    setParentCategoryId(ct.parent?._id || '');
  }

  return (
    <div className=''>
      <h1 className='font-bold text-center'>Categories</h1>

      {/* Create new category */}
      <form onSubmit={saveCategory}>
        <label>
          <span>
            {editedCategory
              ? `Edit category "${editedCategory.name}"`
              : 'Create new category'}
          </span>
          <div className='flex gap-2'>
            <input
              type='text'
              placeholder='Category name'
              value={name}
              minLength='3'
              maxLength='30'
              required
              onChange={(ev) => setName(ev.target.value)}
            />
            <select
              className='w-fit'
              value={parentCategoryId}
              onChange={(ev) => setParentCategoryId(ev.target.value)}
            >
              <option value=''>No parent category</option>
              {categories?.length > 0 &&
                categories.map((ct) => {
                  if (ct.parent) {
                    return;
                  }
                  return (
                    <option value={ct._id} key={ct._id}>
                      {ct.name}
                    </option>
                  );
                })}
            </select>
            <button type='submit' className='btn-primary'>
              Save
            </button>
            <button onClick={resetStates} type='reset' className='btn-white'>
              Clear
            </button>
          </div>
        </label>
      </form>

      {/* Categories list */}
      <div className='flex flex-col gap-2 mt-5'>
        <div className='flex-1 grid grid-cols-[3fr_2fr] md:grid-cols-[3fr_1fr]'>
          <div className='label grid grid-cols-2 mr-5'>
            <span>Name</span>
            <span>Parent category</span>
          </div>
        </div>
        {categories?.length > 0 &&
          categories.map((ct) => (
            <div
              key={ct._id}
              className='grid grid-cols-[3fr_2fr] md:grid-cols-[3fr_1fr] w-full'
            >
              <div className='grid grid-cols-2 line-below mr-5'>
                {/* category name */}
                <span className='flex-1'>{ct.name}</span>

                {/* category parent */}
                <span className=''>{ct?.parent?.name || '-'}</span>
              </div>

              <div className='flex gap-1 justify-center'>
                {/* edit button */}
                <button
                  onClick={() => editCategory(ct)}
                  className='btn-primary'
                >
                  <FontAwesomeIcon icon={faPenToSquare} className='size-3' />
                  <span>Edit</span>
                </button>

                {/* delete button */}
                {/* <DeleteButton
                  label={'Delete'}
                  onDelete={() => deleteCategory(ct._id)}
                /> */}
                <button
                  className='btn-white'
                  onClick={() => deleteCategory(ct)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default withSwal(({ swal }, ref) => {
  return <CategoriesPage swal={swal} />;
});
