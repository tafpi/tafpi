import React from 'react';
import Link from "next/link";

const TaxTag = ({target = '', extraClasses = '', label = ''}) => {
	const classes = `text-sm bg-gray-200 text-gray-600 hover:bg-teal-200 hover:text-black rounded px-2 hover:no-underline ${extraClasses}`;
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