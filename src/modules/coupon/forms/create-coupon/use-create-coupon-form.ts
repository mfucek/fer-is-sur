import { useDialog } from '@/deps/shadcn/ui/dialog';
import { api } from '@/deps/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import {
	couponCreateSchema,
	type TCouponCreateSchema
} from '../../schemas/coupon-create-schema';

export const useCreateCouponForm = () => {
	// React Hook Form
	const form = useForm<TCouponCreateSchema>({
		resolver: zodResolver(couponCreateSchema),
		defaultValues: {
			discountAmount: 0,
			discountPercent: 0,
			maxUses: 0
		}
	});
	const { handleSubmit } = form;

	// Dialog
	const { closeDialog } = useDialog();

	// TRPC
	const utils = api.useUtils();
	const { mutateAsync: createCoupon, isPending } =
		api.coupon.create.useMutation();

	// Form submission
	const onValid: SubmitHandler<TCouponCreateSchema> = async (data) => {
		await createCoupon(data);
		utils.coupon.list.invalidate();
		closeDialog();
	};

	const onInvalid: SubmitErrorHandler<TCouponCreateSchema> = (errors) => {
		console.log(errors);
	};

	const handleFormSubmit = handleSubmit(onValid, onInvalid);

	const isSaving = isPending;

	return { form, handleFormSubmit, isSaving };
};
