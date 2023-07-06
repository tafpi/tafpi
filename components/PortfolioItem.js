import React from 'react';
import Link from "next/link";
import TaxTag from "@/components/TaxTag";
import Image from "next/image";

const PortfolioItem = ({slug, title, description, imageSrc, externalLink, categories, tools}) => {
	return (
		<div className={'flex flex-col gap-3 items-start'}>
			<Link href={`/portfolio/${slug}`}><span className={'text-3xl font-bold'}>{title}</span></Link>
			<div className="pl-4 w-full grid lg:grid-cols-2 gap-4">
				<div className="lg:order-2">
					{imageSrc && <Image src={imageSrc} width={300} height={300} alt={''} className={'shadow-lg'}/>}
				</div>
				<div className="flex flex-col gap-4">
					<p className={''}>{description}</p>
					{categories && (
						<div className={'flex flex-wrap gap-2'}>
							<span>categories: </span>
							{categories?.map(category => {
								if (category !== null){
									const {_id: id, slug: {current: slug}, displayName, title} = category;
									return <TaxTag key={id} target={`/category/${slug}`} label={displayName ?? title}/>
								}
							})}
						</div>
					)}
					{tools && (
						<div className={'flex flex-wrap gap-2'}>
							<span>tools: </span>
							{tools?.map(tool => {
								if (tool !== null){
									const {_id: id, slug: {current: slug}, displayName, title} = tool;
									return <TaxTag key={id} target={`/tool/${slug}`} label={displayName ?? title} extraClasses={'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900'}/>
								}
							})}
						</div>
					)}
					{externalLink && (
						<div>
							link to project: <a href={externalLink} target={'_blank'} referrerPolicy={'no-referrer'} className={'underline hover:no-underline'}>{externalLink}</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PortfolioItem;