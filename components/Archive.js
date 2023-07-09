import React from 'react';
import PortfolioItem from "@/components/PortfolioItem";
import TaxTag from "@/components/TaxTag";

const Archive = ({slug, type, allLabel, title, tags, items}) => {
	return (
		<>
			<div className={'bg-gray-300 border-b border-gray-400 py-4 lg:py-8'}>
				<div className="container max-w-screen-lg mx-auto px-4">
					<h1 className={'font-mono mb-4'}>
						<span
							className={'text-gray-100'}>
							{type}: </span>
						<span
							className={'font-bold'}>
							{title}</span>
					</h1>
					{tags && (
						<div className={'flex flex-wrap gap-2 gap-y-1 items-center'}>
							<span>{allLabel}: </span>
							{tags?.map(tag => {
								if (tag !== null) {
									const {_id: id, slug: {current: tagSlug}, displayName, title} = tag;
									const isCurrent = tagSlug === slug;
									return <TaxTag key={id} target={`/category/${tagSlug}`} label={displayName ?? title} extraClasses={`${isCurrent ? 'bg-teal-200' : ''}`}/>
								}
							})}
						</div>
					)}
				</div>
			</div>
			<div className={'bg-gray-100 pb-8 lg:pb-16'}>
				<div className="container max-w-screen-lg mx-auto px-4">
					<div className="py-8 md:py-14">
						<div className="grid gap-6 md:gap-12">
							{items.map(item => {
								const {
									_id: id,
									title,
									slug: {current: slug},
									description,
									featuredImage,
									url,
									category: categories,
									tools
								} = item;
								return (
									<PortfolioItem key={id} slug={slug} title={title} description={description} imageSrc={featuredImage}
																 externalLink={url} categories={categories}
																 tools={tools}/>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Archive;