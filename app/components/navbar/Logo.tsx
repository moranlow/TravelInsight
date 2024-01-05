"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
	const router = useRouter();
	return (
		<Image
			alt="Logo"
			className="hidden md:block cursor-pointer"
			height="150"
			width="150"
			src="/images/logo.svg"
			onClick={() => router.push("/")}
		/>
	);
};

export default Logo;
