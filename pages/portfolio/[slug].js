import {client} from "@/lib/data";
import Link from "next/link";
import TaxTag from "@/components/TaxTag";

export const getStaticPaths = async () => {
	const portfolioSlugs = await client.fetch(`*[_type=='portfolioItem']{slug{current}}`);
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
	const item = await client.fetch(`*[_type=='portfolioItem' && slug.current=='${ctx.params.slug}'][0]{title, category[]->{_id, title, slug, displayName}, content}`)
	return {props: {item}}
}

const PortfolioItem = (props) => {
	const {
		item: {
			title, content, category: categories
		}
	} = props;
	return (
		<div className={'bg-black text-gray-200 min-h-screen py-8'}>
			<div className="container mx-auto px-4 mb-8">
				<Link href={'/'}>home</Link>
				<h1 className={'mb-4'}><span className={'text-gray-500'}>Project: </span>{title}</h1>
				<div className={'flex gap-2'}>
					{categories?.map(category => {
						return <TaxTag key={category._id} target={`/category/${category.slug.current}`} label={category.displayName ?? category.title} />
					})}
				</div>
				<p>
					{content?.map(chunk => {
						return (
							chunk.children.map(child => {
								return child.text;
							})
						)
					})}
				</p>
			</div>
		</div>
	);
};

export default PortfolioItem;