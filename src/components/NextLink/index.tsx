import Link, { LinkProps } from "next/link";

import { ReactElement } from "react";

import { isExternalLink } from "utils/isExternalLink";

interface ActiveLinkProps extends LinkProps {
	children: ReactElement;
	target?: string;
}

export const NextLink: React.FC<ActiveLinkProps> = ({
	target = "_self",
	href,
	children,
	...rest
}) => {
	const openInNewTab = target === "_blank";
	const isExternal = isExternalLink(href);
	const rel = openInNewTab ? "noreferrer noopener" : undefined;

	if (isExternal || openInNewTab) {
		return (
			<a {...rest} target={target} href={href as string} rel={rel}>
				{children}
			</a>
		);
	}

	return (
		<Link {...rest} href={href}>
			{children}
		</Link>
	);
};
