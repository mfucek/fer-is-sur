'use client';

import { useRef, type FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	type DialogContextType
} from '@/deps/shadcn/ui/dialog';
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

	const dialogRef = useRef<DialogContextType>(null);

	return (
		<>
			<Dialog ref={dialogRef}>
				<Button
					variant="solid-weak"
					singleIcon="edit"
					size="sm"
					onClick={() => {
						dialogRef.current?.openDialog();
					}}
				/>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Event</DialogTitle>
						<DialogDescription>Edit an existing event.</DialogDescription>
					</DialogHeader>

					{/* <UpdateEventForm event={data} /> */}
				</DialogContent>
			</Dialog>

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

	if (!data || isLoading)
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		);

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
				{data.map((coupon) => {
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
