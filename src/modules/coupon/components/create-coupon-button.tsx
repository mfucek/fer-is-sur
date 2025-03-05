'use client';

import { Button } from '@/deps/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/deps/shadcn/ui/dialog';
import { Icon } from '@/global/components/icon';
import { CreateCouponForm } from '../forms/create-coupon/create-coupon-form';

export const CreateCouponButton = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="md">
					Add Coupon
					<Icon icon="add" />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Coupon</DialogTitle>
					<DialogDescription>Create a new coupon.</DialogDescription>
				</DialogHeader>

				<CreateCouponForm />
			</DialogContent>
		</Dialog>
	);
};
