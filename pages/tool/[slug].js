import {client} from "@/lib/data";
import Link from "next/link";
import PortfolioItem from "@/components/PortfolioItem";

export const getStaticPaths = async () => {
	const tools = await client.fetch(`*[_type=='tool']{slug{current}}`);
	const paths = tools.map(tool => {
		return {
			params: {
				slug: tool?.slug.current
			}
		}
	})
	return {
		paths, fallback: true, // false or "blocking"
	}
}

export const getStaticProps = async (ctx) => {
	const tool = await client.fetch(`*[_type=='tool'&& slug.current=='${ctx.params.slug}'][0]{title,slug{current},displayName}`);
	const portfolioItems = await client.fetch(`
		*[count((tools[]->slug.current)[@ in ["${ctx.params.slug}"]]) > 0]{
			_id, title, slug, description, category[]->{_id, title, slug, displayName}, tools[]->{_id, title, slug, displayName}
		}
	`)
	return {
		props: {
			tool,
			portfolioItems
		}
	}
}

const Tool = ({tool, portfolioItems}) => {
	if (!tool || !portfolioItems) return null;
	const {title, displayName} = tool;
	return (
		<div className={'basic-layout'}>
			<div className="container mx-auto px-4 mb-8">
				<Link href={'/'}>home</Link>
				<h1 className={'py-24 mb-4 normal-case'}><span className={'text-gray-500'}>Tool: </span>{displayName ?? title}
				</h1>
				<div className="ml-6 grid gap-8">
					{portfolioItems.map(item => {
						const {_id: id, title, slug: {current: slug}, description, category: categories, tools} = item;
						return (
							<PortfolioItem key={id} title={title} slug={slug} description={description} categories={categories} tools={tools}/>
						)
					})}
				</div>
			</div>
		</div>
	);
};

export default Tool;