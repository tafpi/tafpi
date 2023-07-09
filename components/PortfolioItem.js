import React, {useState} from 'react';
import Link from "next/link";
import TaxTag from "@/components/TaxTag";
import Image from "next/image";

const PortfolioItem = ({slug, title, description, imageSrc, externalLink, categories, tools}) => {
	const [hovered, setHovered] = useState(false);
	const hoverHandler = (e) => {
		setHovered(e.type === 'mouseenter');
	}
	return (
		<div
			className={`flex flex-col items-start transition bg-white border border-gray-400 shadow-[5px_6px_0px_#aaa] rounded-2xl mt-5 ml-3 ${hovered ? 'border-gray-900 shadow-[5px_6px_0px_#666]' : ''}`}
			style={{marginBottom: '6px', marginRight: '5px'}}
		>
			<Link href={`/portfolio/${slug}`} className={'bg-gray-200 hover:bg-teal-200 border border-gray-600 rounded hover:no-underline transition py-1 px-3 -mt-5 -ml-3'} onMouseEnter={hoverHandler}
						onMouseLeave={hoverHandler}><span className={'text-xl md:text-3xl font-mono'}>{title}</span></Link>
			<div className="p-3 sm:p-4 md:p-5 w-full grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-4">
				<div className="sm:order-2 sm:col-span-2 md:order-2 md:col-span-1 md:row-span-2 lg:col-span-2">
					{imageSrc && (
						<Link href={`/portfolio/${slug}`} className={'inline-block transition border relative group'} onMouseEnter={hoverHandler}
									onMouseLeave={hoverHandler}>
							<Image src={imageSrc} width={550} height={550} alt={''} className={`grayscale`}/>
							<span className={'opacity-0 transition group-hover:opacity-100 absolute w-full h-full top-0 left-0 bg-teal-400/25 mix-blend-overlay'}> </span>
						</Link>
					)}
				</div>
				<div className={'sm:order-1 sm:pb-4 md:order-1 lg:col-span-3'}>
					<p className={'font-mono text-lg'}>{description}</p>
				</div>
				<div className={'sm:order-3 sm:col-span-3 md:col-span-1 md:order-3 lg:col-span-3 flex flex-col gap-4'}>
					{categories && (
						<div className={'flex flex-wrap gap-2'}>
							<span>categories: </span>
							{categories?.map(category => {
								if (category !== null) {
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
								if (tool !== null) {
									const {_id: id, slug: {current: slug}, displayName, title} = tool;
									return <TaxTag key={id} target={`/tool/${slug}`} label={displayName ?? title}
																 extraClasses={'bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-900'}/>
								}
							})}
						</div>
					)}
					{externalLink && (
						<div className={'max-w-full'}>
							link to project: <br className={'sm:hidden'}/><a href={externalLink} target={'_blank'} referrerPolicy={'no-referrer'}
																	className={'break-all underline hover:no-underline'}>{externalLink}</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PortfolioItem;