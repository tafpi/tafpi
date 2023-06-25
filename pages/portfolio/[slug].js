import {client} from "@/lib/data";
import Link from "next/link";

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
	const item = await client.fetch(`*[_type=='portfolioItem' && slug.current=='${ctx.params.slug}'][0]{title, category[]->{_id, title, slug}, content}`)
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
				<h1 className={'mb-4'}>{title}</h1>
				<div className={'flex gap-2'}>
					{categories.map(category => {
						return <Link key={category._id} href={`/category/${category.slug.current}`}
												 className={'bg-gray-800 text-gray-300 px-2 rounded'}>{category.title}</Link>
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