import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './FilterSections.css';
import { setCategory, setPage } from '../../Redux/categorySlice';

const FilterSections = () => {
  const category = useSelector((state)=>state.category.category)
  
  const dispatch = useDispatch()

  const handleCategoryChange = (e)=>{
    dispatch(setCategory(e.target.value))
    dispatch(setPage(1))
  }
  // console.log(category);
  return (
    <div className='filter-wrapper'>
      <select value={category} onChange={handleCategoryChange}>
      <option value=''>--Choose Category--</option>
        <option value='Technology'>Technology</option>
        <option value='Education'>Education</option>
        <option value='Entertainment'>Entertainment</option>
        <option value='Tourism'>Tourism</option>
        <option value='Science'>Science </option>
        <option value='Sports'>Sports</option>
      </select>
      
    </div>
  )
}

export default FilterSections