// import { api } from '@/deps/trpc/react';
// const { mutateAsync: purchaseCoupon, isPending, error } = api.coupon.purchase.useMutation();
// (rest of the file should be commented out or refactored to not use api.coupon.purchase)

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import {
	couponPurchaseSchema,
	TCouponPurchaseSchema
} from '../../schemas/coupon-purchase-schema';

export const useCouponPurchaseForm = (onPurchaseSubmit: () => void) => {
	// React Hook Form
	const form = useForm<TCouponPurchaseSchema>({
		resolver: zodResolver(couponPurchaseSchema),
		defaultValues: {
			creatorEmail: '',
			amount: 35
		}
	});
	const { handleSubmit } = form;

	// Form submission
	const onValid: SubmitHandler<TCouponPurchaseSchema> = async (data) => {
		try {
			// const { paymentUrl } = await purchaseCoupon({
			// 	amount: data.amount,
			// 	creatorEmail: data.creatorEmail,
			// 	recipientEmail: data.recipientEmail,
			// 	recepientMessage: data.recepientMessage
			// });
			onPurchaseSubmit();

			// openTemporaryTab(paymentUrl, `${env.NEXT_PUBLIC_URL}/success`);
		} catch (e) {}
	};

	const onInvalid: SubmitErrorHandler<TCouponPurchaseSchema> = (errors) => {
		console.log(errors);
	};

	const handleFormSubmit = handleSubmit(onValid, onInvalid);

	return {
		form,
		handleFormSubmit,
		isSaving: false,
		globalError: null // error?.message || null
	};
};
