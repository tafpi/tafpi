import React, {useRef} from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {useEffect, useState} from "react";

const Layout = ({children}) => {
	const headerRef = useRef();
	const [isHome, setIsHome] = useState(true);
	// const [headerHeight, setHeaderHeight] = useState(false);
	// const resizeHandler = () => {
	// 	setHeaderHeight(headerRef.current?.offsetHeight);
	// }
	useEffect(() => {
		setIsHome(window.location.pathname === '/');
		// setHeaderHeight(headerRef.current?.offsetHeight);
		// window.addEventListener('resize', resizeHandler);
		// return () => {
		// 	window.removeEventListener('resize', resizeHandler);
		// }
	}, [])
	return (
		<main className={''}>
			<header className={'fixed z-50 w-full h-12 lg:h-16 hidden'} style={{display: `${isHome ? 'none' : 'block'}`}} ref={headerRef}><Header/></header>
			<div className={`${isHome ? '' : 'pt-12 lg:pt-16'}`}>
				{children}
			</div>
			<Footer/>
		</main>
	);
};

export default Layout;