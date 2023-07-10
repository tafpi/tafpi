import React, {useEffect, useState} from 'react';

const Footer = () => {
	const [copied, setCopied] = useState(false);
	useEffect(() => {
		if (copied) {
			setTimeout(() => {
				setCopied(false);
			}, 1500);
		}
	}, [copied])
	return (
		<footer className={'bg-teal-200 border-t border-teal-400'}>
			<div className={'container max-w-screen-lg mx-auto px-4'}>
				<div className="flex flex-col justify-center py-8 pb-12">
					<h2 className={'mb-2'}>
						Connect
					</h2>
					<div className="flex flex-col items-start sm:flex-row gap-2 sm:gap-4 font-mono">
						<span>
							tilpoth@gmail.com
							{'>'} <button className={'underline hover:no-underline'} title={'copy email address'} onClick={() => {
								navigator.clipboard.writeText('tilpoth@gmail.com').then(
									() => {
										setCopied(true);
										console.log('successfully copied "tilpoth@gmail.com" to your clipboard');
									},
									() => {
										console.log('error copying email to clipboard');
									}
								)
							}}>{copied ? 'copied!' : 'copy'}</button>
						</span>
						<span className={'hidden sm:inline-block'}>||</span>
						<a href="https://www.linkedin.com/in/tilemachos-pothitos-45800426a"
							 className={'underline hover:no-underline'} target={'_blank'} referrerPolicy={'no-referrer'}>linkedin</a>
						<span className={'hidden sm:inline-block'}>||</span>
						<a href="https://itch.io/profile/tuff-pie" className={'underline hover:no-underline'} target={'_blank'}
							 referrerPolicy={'no-referrer'}>itch</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;