// import { api } from '@/deps/trpc/react';
// const { data: me } = api.auth.me.useQuery();
// (rest of the file should be commented out or refactored to not use api.auth)

// import { FC, PropsWithChildren } from 'react';
//
// export const Protected: FC<PropsWithChildren> = ({ children }) => {
// 	const { data: me } = api.auth.me.useQuery();
//
// 	if (!me || me.session === null) {
// 		return null;
// 	}
//
// 	if (me.session) return children;
// };
