import React from 'react';
import Link from "next/link";

const PortfolioItem = ({slug, title, description, categories = [{_id: null, slug: {current: null}, title}]}) => {
	return (
		<div className={'flex flex-col gap-3'}>
			<Link href={`/portfolio/${slug}`}><span className={'text-3xl font-bold'}>{title}</span></Link>
			<div className="ml-4 flex flex-col gap-2">
				<p className={''}>{description}</p>
				<p className={'flex gap-2'}>
					{categories.map(category => {
						return <Link key={category._id} href={`/category/${category.slug.current}`}
												 className={'bg-gray-800 text-gray-300 px-2 rounded'}>{category.title}</Link>
					})}
				</p>
			</div>
		</div>
	);
};

export default PortfolioItem;