import Head from 'next/head'
import {client} from "@/lib/data";
import PortfolioItem from "@/components/PortfolioItem";
import Layout from "@/components/Layout";

export default function Home(props) {
	const {portfolioItems} = props;
	return (
		<>
			<Head>
				<title>Tilemachos Pothitos - Portfolio</title>
				<meta name="description" content="This is a webpage about the projects I have participated in."/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				{/*<link rel="icon" href="/favicon.ico"/>*/}
			</Head>
			<Layout>
				<section className={'container max-w-screen-lg mx-auto py-8 md:py-12 lg:py-16 px-4'}>
					<div className="flex flex-col justify-center">
						<div className="flex-shrink inline-flex flex-col w-fit mb-6">
							<h1 className={'flex-shrink w-min sm:w-auto mr-12 mb-4 text-4xl md:text-5xl lg:text-6xl'}>Tilemachos
								Pothitos</h1>
							<h2
								className={'ml-12 mr-auto sm:ml-auto sm:mr-0 text-lg md:text-xl font-light border-b-4 border-teal-200'}>Front-End
								Developer</h2>
						</div>
						<p className={'max-w-xl ml-6'}>
							Studied product and systems design, working on front-end development.
							<br/>
							Experience driven and scholastic with an eye for functional details.
							<br/>
							Likes interactive stuff that make sense.
						</p>
					</div>
				</section>
				<section className={'bg-gray-100 py-8 md:py-14'}>
					<div className={'container max-w-screen-lg mx-auto px-4'}>
						<div className="flex flex-col justify-center">
							<h2 className={'mb-8 md:mb-14'}>
								Work
							</h2>
							<div className="grid gap-6 md:gap-12">
								{portfolioItems.map(item => {
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
				</section>
			</Layout>
		</>
	)
}

export async function getStaticProps() {
	const portfolioItems = await client.fetch(`
	*[_type=='portfolioItem' && !(_id in path("drafts.**"))]|order(publishedDate desc){
		_id, title, slug, description, url,
		'featuredImage': featuredImage.asset->url, 
		category[]->{_id, title, slug, displayName}, 
		tools[]->{_id, title, slug, displayName}}
		`);
	return {
		props: {
			portfolioItems
		}
	};
}
