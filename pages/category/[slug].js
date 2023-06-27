import {client} from "@/lib/data";
import Link from "next/link";
import PortfolioItem from "@/components/PortfolioItem";

export const getStaticPaths = async () => {
	const categories = await client.fetch(`*[_type=='category']{slug{current}}`);
	const paths = categories.map(category => {
		return {
			params: {
				slug: category?.slug.current
			}
		}
	})
	return {
		paths, fallback: true, // false or "blocking"
	}
}

export const getStaticProps = async (ctx) => {
	const category = await client.fetch(`*[_type=='category'&& slug.current=='${ctx.params.slug}'][0]{title,slug{current},displayName}`);
	const portfolioItems = await client.fetch(`
		*[count((category[]->slug.current)[@ in ["${ctx.params.slug}"]]) > 0]{
			_id, title, slug, category[]->{_id, title, slug, displayName}
		}
	`)
	return {props: {
		category,
		portfolioItems
	}}
}

const Category = (props) => {
	const {
		category: {
			title, displayName
		},
		portfolioItems
	} = props;
	return (
		<div className={'bg-black text-gray-200 min-h-screen py-8'}>
			<div className="container mx-auto px-4 mb-8">
				<Link href={'/'}>home</Link>
				<h1 className={'py-24 mb-4 normal-case'}><span className={'text-gray-500'}>Category: </span>{displayName ?? title}</h1>
				{portfolioItems.map(item => {
					const {_id: id, title, slug: { current: slug }, category: categories} = item;
					return (
						<PortfolioItem key={id} title={title} slug={slug} categories={categories} />
					)
				})}
			</div>
		</div>
	);
};

export default Category;