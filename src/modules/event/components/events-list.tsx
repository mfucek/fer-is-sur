'use client';

import { Icon } from '@/global/components/icon';
import { SectionList } from '@/global/components/section-list';
import { Spinner } from '@/global/components/spinner';
import { Button } from '@/lib/shadcn/ui/button';
import { api } from '@/lib/trpc/react';

export const EventsList = () => {
	const { data, isLoading } = api.event.list.useQuery();

	if (!data) return <Spinner />;

	return (
		<SectionList
			data={data}
			rows={(item) => {
				return (
					<div className="flex flex-col gap-1">
						<div className="flex flex-row gap-2">
							<div>
								<p className="title-3">{item.title}</p>
							</div>
							<div>
								<p className="body-2 text-neutral-strong truncate">
									{item.description}
								</p>
							</div>
						</div>
						<div className="flex flex-row gap-2">
							<div>
								<p className="caption text-neutral-strong">{item.location}</p>
							</div>
							<div>
								<p className="caption text-neutral-strong">
									{item.date.toLocaleDateString()}
								</p>
							</div>
						</div>
					</div>
				);
			}}
			actions={(data) => {
				const utils = api.useUtils();
				const { mutateAsync: deleteEvent, isPending } =
					api.event.delete.useMutation();

				const handleDelete = async () => {
					try {
						await deleteEvent({ id: data.id });
					} catch (error) {
						console.error(error);
					} finally {
						await utils.event.list.invalidate();
					}
				};

				const handleEdit = () => {};

				return (
					<>
						<Button variant="ghost" onClick={handleEdit} iconOnly size="sm">
							<Icon icon="edit" />
						</Button>
						<Button
							variant="solid-weak"
							theme="danger"
							onClick={handleDelete}
							iconOnly
							size="sm"
							loading={isPending}
						>
							<Icon icon="trash" />
						</Button>
					</>
				);
			}}
		/>
	);
};
