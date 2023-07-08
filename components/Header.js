import React, {useEffect, useState} from 'react';
import Link from "next/link";

const Header = () => {
	const [isHome, setIsHome] = useState(false);
	useEffect(() => {
		setIsHome(window.location.pathname === '/');
	}, [])
	return (
		isHome ? <></> :
		<div className={'fixed w-full bg-white/90'}>
			<div className={'container max-w-screen-lg mx-auto px-4 py-1'}>
				<div className="flex justify-between">
					<Link href={'/'} className={'font-mono text-lg leading-none w-min hover:bg-teal-200 hover:no-underline'}>Tilemachos Pothitos</Link>
					<Link href={'/'}>Home</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;