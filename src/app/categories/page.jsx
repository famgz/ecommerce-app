'use client';

import {
  faPenToSquare,
  faPlus,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { withSwal } from 'react-sweetalert2';

function CategoriesPage({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios.get('/api/categories').then((res) => setCategories(res.data));
  }

  function resetEditStates() {
    setEditedCategory(null);
    setName('');
    setParentCategoryId('');
    setProperties([])
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

    const data = {
      name,
      parentCategoryId,
      properties
    }

    // create new category
    if (!editedCategory) {
      await axios.post('/api/categories', data);
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
        ...data
      });
    }

    getCategories();
    resetEditStates();
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
    setProperties(ct.properties || [])
  }

  function addProperty() {
    setProperties((prev) => [...prev, { name: '', values: '' }]);
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => prev.filter((_, i) => i !== indexToRemove));
  }

  function handlePropertyChange(index, newData, type) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index][type] = newData;
      return properties;
    });
  }

  return (
    <div className='container'>
      <h1>Categories</h1>

      {/* Create/update category */}
      <form onSubmit={saveCategory}>
        <div className='grid gap-2 line-below pb-7'>
          <div>
            <span className='label'>
              {editedCategory
                ? `Edit category "${editedCategory.name}"`
                : 'Create new category'}
            </span>

            <div className='flex gap-1'>
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
            </div>
          </div>

          {/* Category properties */}
          <div className='mt-3'>
            <span className='label'>Properties</span>
            <button type='button' className='btn-white' onClick={addProperty}>
              <FontAwesomeIcon icon={faPlus} className='size-3' />
              <span>Add new property</span>
            </button>
          </div>

          <div className='grid gap-2'>
            {properties.length > 0 &&
              properties.map((ppt, index) => (
                <div key={index} className='flex gap-1'>
                  <input
                    type='text'
                    value={ppt.name}
                    onChange={(ev) =>
                      handlePropertyChange(index, ev.target.value, 'name')
                    }
                    placeholder='property name (ex.: color, size)'
                  />
                  <input
                    type='text'
                    value={ppt.values}
                    placeholder='values, comma separated'
                    onChange={(ev) =>
                      handlePropertyChange(index, ev.target.value, 'values')
                    }
                  />
                  <button
                    className='btn-white'
                    type='button'
                    onClick={() => removeProperty(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
          </div>

          {/* Buttons */}
          <div className='flex gap-2 justify-center mt-5'>
            <button type='submit' className='btn-primary w-full'>
              Save
            </button>
            <button
              onClick={resetEditStates}
              type='reset'
              className='btn-white w-full'
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {/* Categories list */}
      <div className='flex flex-col gap-2 mt-7'>
        <div className='grid grid-cols-[4fr_1fr] flex-1'>
          <div className='grid grid-cols-2'>
            <span className='label'>Name</span>
            <span className='label'>Parent category</span>
          </div>
        </div>
        {categories?.length > 0 &&
          categories.map((ct) => (
            <div
              key={ct._id}
              className='grid grid-cols-[4fr_1fr] w-full'
            >
              <div className='grid grid-cols-2 line-below'>
                {/* category name */}
                <span className='flex-1 font-semibold'>{ct.name}</span>

                {/* category parent */}
                <span className=''>{ct?.parent?.name || '-'}</span>
              </div>

              <div className='flex gap-1 justify-end'>
                {/* edit button */}
                <button
                  onClick={() => editCategory(ct)}
                  className='btn-primary !h-full'
                >
                  <FontAwesomeIcon icon={faPenToSquare} className='size-3' />
                  {/* <span>Edit</span> */}
                </button>

                {/* delete button */}
                <button
                  className='btn-white'
                  onClick={() => deleteCategory(ct)}
                >
                  <FontAwesomeIcon icon={faTrash} className='size-3' />
                  {/* <span>Delete</span> */}
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
