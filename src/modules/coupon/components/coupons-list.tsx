'use client';

import { type FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import {
	Actions,
	ActionsLabel,
	Content,
	Data,
	Item,
	Items,
	Label,
	Labels,
	List
} from '@/global/components/list';
import { Spinner } from '@/global/components/spinner';
import { ListCouponsItem } from '../api/procedures/list';

const CouponRowActions: FC<{ data: ListCouponsItem }> = ({ data }) => {
	const utils = api.useUtils();
	const { mutateAsync: deleteCoupon, isPending } =
		api.coupon.delete.useMutation();

	const handleDelete = async () => {
		try {
			await deleteCoupon({ id: data.id });
		} catch (error) {
			console.error(error);
		} finally {
			await utils.coupon.list.invalidate();
		}
	};

	return (
		<>
			<Button
				variant="solid-weak"
				theme="danger"
				onClick={handleDelete}
				singleIcon="trash"
				size="sm"
				loading={isPending}
			/>
		</>
	);
};

export const CouponsList = () => {
	const { data, isLoading } = api.coupon.list.useQuery();

	return (
		<List>
			<Labels>
				<Label>Code</Label>
				<Label>Discount</Label>
				<Label>Expires</Label>
				<Label>Uses</Label>
				<ActionsLabel />
			</Labels>
			<Items>
				{(!data || isLoading) && (
					<Item>
						<Data>
							<Spinner absolutelyCentered />
						</Data>
					</Item>
				)}

				{data &&
					data.map((coupon) => {
						const isExpired =
							coupon.expiresAt &&
							coupon.expiresAt.getTime() < new Date().getTime();

						const discountString = coupon.discountPercent
							? `${coupon.discountPercent}%`
							: coupon.discountAmount
								? `${coupon.discountAmount} EUR`
								: 'No discount';

						const expiryString = coupon.expiresAt
							? coupon.expiresAt.toLocaleDateString()
							: 'Never';

						const usesString =
							coupon.maxUses === 0
								? `${coupon._count.Reservations} (Unlimited)`
								: `${coupon._count.Reservations} / ${coupon.maxUses}`;

						return (
							<Item key={coupon.id}>
								<Content>
									<Data strong>{coupon.code}</Data>
									<Data>{discountString}</Data>
									<Data className={cn(!isExpired && 'text-neutral')}>
										{expiryString}
									</Data>
									<Data>
										<Button variant="ghost" size="sm" className="-ml-3">
											{usesString}
										</Button>
									</Data>
								</Content>
								<Actions>
									<CouponRowActions data={coupon} />
								</Actions>
							</Item>
						);
					})}
			</Items>
		</List>
	);
};
