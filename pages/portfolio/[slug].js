import {client} from "@/lib/data";
import TaxTag from "@/components/TaxTag";
import Image from "next/image";
import Layout from "@/components/Layout";

const PortfolioItem = ({item}) => {
	if (!item) return null;
	const {
		title, content, featuredImage: imageSrc, images, url: externalLink, category: categories, tools
	} = item;
	return (
		<Layout>
			<div className={'bg-gray-300 border-b border-gray-400 py-4 lg:py-8'}>
				<div className="container max-w-screen-lg mx-auto px-4">
					<p className={'text-gray-200 font-mono font-bold text-6xl text-right opacity-75'}>Project</p>
				</div>
			</div>
			<div className={'bg-gray-100 pb-8 lg:pb-16'}>
				<div className={'container max-w-screen-lg mx-auto px-4'}>
					<div className={'relative -top-6'}>
						<h1
							className={'text-3xl sm:text-4xl lg:text-5xl bg-teal-200 border border-gray-600 rounded inline-block py-2 px-4 pl-36 -ml-36 xl:pl-4 xl:-ml-4 mb-4 lg:mb-8 font-mono font-normal shadow-[5px_6px_0px_#00000040]'}
						>
							{title}
						</h1>
					</div>
					<div className={'flex flex-col gap-4 lg:gap-8'}>
						<p className={'max-w-xl'}>
							{content?.map(chunk => {
								return (
									chunk.children.map(child => {
										return child.text;
									})
								)
							})}
						</p>
						<div className={'flex flex-col gap-2'}>
							{categories && (
								<div className={'flex flex-wrap gap-2 gap-y-1 items-center'}>
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
								<div className={'flex flex-wrap gap-2 gap-y-1 items-center'}>
									<span>tools: </span>
									{tools?.map(tool => {
										if (tool !== null) {
											const {_id: id, slug: {current: slug}, displayName, title} = tool;
											return <TaxTag key={id} target={`/tool/${slug}`} label={displayName ?? title}
																		 extraClasses={'bg-gray-300'}/>
										}
									})}
								</div>
							)}
						</div>
						{externalLink && (
							<div>
								link to project: <a href={externalLink} target={'_blank'}
																		referrerPolicy={'no-referrer'}
																		className={'underline hover:no-underline'}>{externalLink}</a>
							</div>
						)}
						{imageSrc && <Image src={imageSrc} width={'900'} height={'900'} className={'border'} alt={''}/>}
						{images?.map(image => {
							return <Image key={image.id} src={image.asset.url} width={'900'} height={'900'} className={'border'}
														alt={''}/>
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
};

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
	const item = await client.fetch(`
	*[_type=='portfolioItem' && !(_id in path("drafts.**")) && slug.current=='${ctx.params.slug}'][0]{
		_id, title, slug, content, 
		'thumbnailImage': thumbnailImage.asset->url, 
		'featuredImage': featuredImage.asset->url,
		images[]{asset->{url}},
		url, category[]->{_id, title, slug, displayName}, tools[]->{_id, title, slug, displayName}
		}`)
	return {props: {item}}
}

export default PortfolioItem;