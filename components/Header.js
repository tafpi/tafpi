import React from 'react';
import Link from "next/link";

const Header = () => {
	return (
		<div className={'w-full h-full bg-white/95 border-b border-gray-600'}>
			<div className="container max-w-screen-lg mx-auto px-4 pl-0 lg:pl-2 lg:py-3 flex h-full justify-between items-center">
				<Link href={'/'}
							className={'font-mono h-full text-lg leading-none rounded px-4 lg:px-2 w-min lg:w-auto transition hover:bg-teal-200 hover:no-underline flex flex-col justify-center'}>
					<span>Tilemachos Pothitos</span>
				</Link>
				<Link href={'/'} className={'font-mono'}>Home</Link>
			</div>
		</div>
	);
};

export default Header;