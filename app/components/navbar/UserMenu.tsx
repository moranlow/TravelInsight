"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useCreateModal from "@/app/hooks/useCreateModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const createModal = useCreateModal();
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) return loginModal.onOpen();
		createModal.onOpen();
	}, [currentUser, loginModal, createModal]);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				{currentUser?.creator ? (
					<div
						onClick={() => onRent()}
						className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
					>
						Open new vision for travelling
					</div>
				) : null}
				<div
					onClick={toggleOpen}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-[5vw] bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem
									onClick={() => router.push("/trips")}
									label="My trips"
								/>
								<MenuItem
									onClick={() => router.push("/favorites")}
									label="My favorites"
								/>
								{currentUser?.creator && (
									<>
										<MenuItem
											onClick={() => createModal.onOpen()}
											label="Create new tour"
										/>
										<MenuItem
											onClick={() => router.push("/createdListings")}
											label="Created tours"
										/>
									</>
								)}
								<MenuItem
									onClick={() => signOut()}
									label="Logout"
								/>
							</>
						) : (
							<>
								<MenuItem
									onClick={loginModal.onOpen}
									label="Login"
								/>
								<MenuItem
									onClick={registerModal.onOpen}
									label="Sign Up"
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
