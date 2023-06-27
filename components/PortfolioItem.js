import React from 'react';
import Link from "next/link";
import TaxTag from "@/components/TaxTag";

const PortfolioItem = ({slug, title, description, categories}) => {
	return (
		<div className={'flex flex-col gap-3'}>
			<Link href={`/portfolio/${slug}`}><span className={'text-3xl font-bold'}>{title}</span></Link>
			<div className="ml-4 flex flex-col gap-2">
				<p className={''}>{description}</p>
				<div className={'flex gap-2'}>
					{categories?.map(category => {
						if (category !== null){
							const {_id: id, slug: {current: slug}, displayName, title} = category;
							return <TaxTag key={id} target={`/category/${slug}`} label={displayName ?? title}/>
						}
					})}
				</div>
			</div>
		</div>
	);
};

export default PortfolioItem;