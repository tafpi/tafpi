import {client} from "@/lib/data";
import Link from "next/link";
import TaxTag from "@/components/TaxTag";
// import React from "@types/react";
import Image from "next/image";

export const getStaticPaths = async () => {
	const portfolioSlugs = await client.fetch(`*[_type=='portfolioItem' && !(_id in path("drafts.**"))]{slug{current}}`);
	const paths = portfolioSlugs.map(portfolioSlug => {
		return {
			params: {
				slug: portfolioSlug?.slug.current
			}
		}
	})
	return {
		paths, fallback: true, // false or "blocking"
	}
}

export const getStaticProps = async (ctx) => {
	const item = await client.fetch(`*[_type=='portfolioItem' && !(_id in path("drafts.**")) && slug.current=='${ctx.params.slug}'][0]{_id, title, slug, content, 'featuredImage': featuredImage.asset->url, url, category[]->{_id, title, slug, displayName}, tools[]->{_id, title, slug, displayName}}`)
	return {props: {item}}
}

const PortfolioItem = ({item}) => {
	if (!item) return null;
	const {
		title, content, featuredImage: imageSrc, url: externalLink, category: categories, tools
	} = item;
	return (
		<div className={'basic-layout'}>
			<div className="container mx-auto px-4 mb-8">
				<Link href={'/'}>home</Link>
				<h1 className={'pt-24 pb-8 mb-4 mb-4'}><span className={'text-gray-500'}>Project: </span>{title}</h1>
				<div className="flex flex-col gap-4">
					<p className={'max-w-xl'}>
						{content?.map(chunk => {
							return (
								chunk.children.map(child => {
									return child.text;
								})
							)
						})}
					</p>
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
																 extraClasses={'bg-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'}/>
								}
							})}
						</div>
					)}
					{externalLink && (
						<div>
							link to project: <a href={externalLink} target={'_blank'}
																	referrerPolicy={'no-referrer'} className={'underline hover:no-underline'}>{externalLink}</a>
						</div>
					)}
					{imageSrc && <Image src={imageSrc} width={'900'} height={'400'} alt={''}/>}
				</div>
			</div>
		</div>
	);
};

export default PortfolioItem;