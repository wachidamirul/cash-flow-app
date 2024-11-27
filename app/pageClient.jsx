"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const PageClient = () => {
	const { data: session } = useSession();

	console.log("session from client", session);

	return (
		<div>
			<Button onClick={() => signIn()}>Login</Button>
			<Button onClick={() => signOut()} variant="destructive">
				Logout
			</Button>
		</div>
	);
};

export default PageClient;
