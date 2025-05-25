'use client';

import { type FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
// TODO: Replace this import with the new tRPC React client for the refactored couponRouter when integrated into the main app.
// import { api } from '@/deps/trpc/react';
// For now, this is a placeholder to indicate where the new API would be used.
import {
	Actions,
	ActionsLabel,
	Annotation,
	Content,
	Data,
	Item,
	Items,
	Label,
	Labels,
	List
} from '@/global/components/list';
import { Spinner } from '@/global/components/spinner';
import { type Coupon } from '../../../domain/entities/coupon.entity';

// CouponsList and CouponRowActions are now presentational components.
// They accept data and mutation functions as props, ready for integration with the new tRPC client or any data source.

interface CouponRowActionsProps {
	data: Coupon;
	onDelete: (id: string) => Promise<void>;
	isPending: boolean;
}

const CouponRowActions: FC<CouponRowActionsProps> = ({
	data,
	onDelete,
	isPending
}) => {
	const isDisabled = data.creatorByEmail !== null || (data.uses ?? 0) > 0;

	const handleDelete = async () => {
		await onDelete(data.id);
	};

	return (
		<Button
			variant="solid-weak"
			theme="danger"
			onClick={handleDelete}
			singleIcon="trash"
			size="sm"
			loading={isPending}
			disabled={isDisabled}
		/>
	);
};

interface CouponItemProps {
	coupon: Coupon;
	onDelete: (id: string) => Promise<void>;
	isPending: boolean;
}

const CouponItem: FC<CouponItemProps> = ({ coupon, onDelete, isPending }) => {
	const isExpired =
		coupon.expiresAt && coupon.expiresAt.getTime() < new Date().getTime();

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
			? `${coupon.uses ?? 0} / Unlimited`
			: `${coupon.uses ?? 0} / ${coupon.maxUses}`;

	return (
		<Item key={coupon.id}>
			<Content>
				<Data strong>{coupon.code}</Data>
				<Data>{discountString}</Data>
				<Data>{coupon.creatorByEmail ? 'Customer' : 'Admin'}</Data>
				<Data className={cn(!isExpired && 'text-neutral')}>{expiryString}</Data>
				<Data>
					<Button variant="ghost" size="sm" className="-ml-3">
						{usesString}
					</Button>
				</Data>
			</Content>
			<Actions>
				<CouponRowActions
					data={coupon}
					onDelete={onDelete}
					isPending={isPending}
				/>
			</Actions>
		</Item>
	);
};

interface CouponsListProps {
	coupons: Coupon[];
	isLoading: boolean;
	onDelete: (id: string) => Promise<void>;
	isPending: boolean;
}

export const CouponsList: FC<CouponsListProps> = ({
	coupons,
	isLoading,
	onDelete,
	isPending
}) => {
	return (
		<List>
			<Labels>
				<Label>Code</Label>
				<Label>Discount</Label>
				<Label>Created by</Label>
				<Label>Expires</Label>
				<Label>Uses</Label>
				<ActionsLabel />
			</Labels>

			{isLoading && (
				<Item>
					<Data>
						<Spinner absolutelyCentered />
					</Data>
				</Item>
			)}

			{coupons && (
				<Items>
					{coupons
						.filter((coupon) => !coupon.creatorByEmail)
						.map((coupon) => (
							<CouponItem
								key={coupon.id}
								coupon={coupon}
								onDelete={onDelete}
								isPending={isPending}
							/>
						))}
				</Items>
			)}

			<Annotation>User-generated coupons</Annotation>

			{coupons && (
				<Items>
					{coupons
						.filter((coupon) => coupon.creatorByEmail)
						.map((coupon) => (
							<CouponItem
								key={coupon.id}
								coupon={coupon}
								onDelete={onDelete}
								isPending={isPending}
							/>
						))}
				</Items>
			)}
		</List>
	);
};
