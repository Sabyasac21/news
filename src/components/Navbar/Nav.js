import React from 'react';
import logo from '../../Assets/app_logo.jpg';
import searchIcon from '../../Assets/search_icon.jpg'
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setShowBackdrop } from '../../Redux/categorySlice';
import nav_backdrop_icon from '../../Assets/nav_backdrop_icon.png';

const Nav = () => {
  const dispatch = useDispatch()
  const backdrop = useSelector((state)=>state.category.showBackdrop)
  
  // const handleKeyDown = (e)=>{
  //   if (e.key==='Enter'){
  //     dispatch(setCategory(e.target.value))
  //   }
  // }
  const handleBackdrop = ()=>{
    dispatch(setShowBackdrop(!backdrop))

  }
  return (
    <>
    <div className='nav-container'>
        <div className='nav-logo'>
            <img src={logo} alt='logo'/>
        </div>
        {/* <div className='search' onKeyDown={handleKeyDown}>
          
          <div className='search-icon'><img src={searchIcon} alt='/'/></div>
          <input placeholder='Search for topics, places & sources' />
        </div> */}
        <div className='nav-sections-wraper'>
            <div className='backdrop-icon' onClick={handleBackdrop}>
              <img src={nav_backdrop_icon} alt='/'/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Nav