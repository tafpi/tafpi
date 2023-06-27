import React from 'react';
import Link from "next/link";

const TaxTag = ({target = '', extraClasses = '', label = ''}) => {
	const classes = `bg-gray-800 text-gray-300 hover:bg-gray-900 hover:text-white px-2 hover:no-underline ${extraClasses}`;
	if (target) {
		return <Link
			href={target}
			className={classes}>
			{label}
		</Link>
	}
	return <span className={classes}>
		{label}
	</span>
};

export default TaxTag;