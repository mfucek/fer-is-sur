'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { Spinner } from '@/global/components/spinner';
import { api } from '@/presentation/api/trpc/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface PageProps {
	params: Promise<{
		reservationId: string;
	}>;
}

const CancelPage: FC<PageProps> = async ({ params }) => {
	const { reservationId } = await params;
	const router = useRouter();
	const { data: reservation, isLoading } =
		api.reservation.get.useQuery(reservationId);
	const { mutateAsync: cancelReservation, isPending } =
		api.reservation.delete.useMutation();

	if (isLoading) return <Spinner />;
	if (!reservation) return <div>Rezervacija nije pronađena.</div>;

	const handleCancel = async () => {
		await cancelReservation(reservationId);
		router.push('/');
	};

	return (
		<div className="container-sm pad-xl py-40 text-neutral">
			<h1 className="display-3 mb-12">Otkazivanje rezervacije</h1>
			<div className="mb-8">
				Jeste li sigurni da želite otkazati rezervaciju za {reservation.email}?
			</div>
			<Button
				onClick={handleCancel}
				loading={isPending}
				variant="solid"
				theme="danger"
			>
				Otkazuj rezervaciju
			</Button>
		</div>
	);
};

export default CancelPage;
