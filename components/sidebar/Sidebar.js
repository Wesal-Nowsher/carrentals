import { useEffect, useRef, useState } from 'react';
import {  useLocation } from 'next/router';


import { useRouter } from 'next/router'
import Link from 'next/link' 

const sidebarNavItems = [
     
    {
        display: 'Categories', 
        to: '/admin/categories',
        section: 'categories'
    },
    {
        display: 'Cars', 
        to: '/admin/cars',
        section: 'Cars'
    },
    {
        display: 'Booking', 
        to: '/admin/booking',
        section: 'booking'
    },
    {
        display: 'Blogs', 
        to: '/admin/blogs',
        section: 'Blogs'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
   
  const router = useRouter()
    

    // change active index
  

    return <div className='sidebar'>
        <div className="sidebar__logo">
           Admin
        </div>
        <div   className="sidebar__menu">
            <div
               
                className="sidebar__menu__indicator"
                
            ></div>
           
            {
              sidebarNavItems &&  sidebarNavItems.map((item, index) => (
                    <Link href={item.to} key={index}>
                        <div className={`sidebar__menu__item cursor-p ${router.pathname===item.to ? "active":""} `}>
                            <div className="sidebar__menu__item__text ">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
};

export default Sidebar;
