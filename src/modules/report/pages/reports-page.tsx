'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/deps/shadcn/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/deps/shadcn/ui/chart';

const chartData = [
	{ week: '25/01', confirmed: 186, cancelled: 80 },
	{ week: '25/02', confirmed: 305, cancelled: 200 },
	{ week: '25/03', confirmed: 237, cancelled: 120 },
	{ week: '25/04', confirmed: 73, cancelled: 190 },
	{ week: '25/05', confirmed: 209, cancelled: 130 },
	{ week: '25/06', confirmed: 214, cancelled: 140 }
];

const chartConfig = {
	confirmed: {
		label: 'Confirmed',
		color: 'hsl(var(--color-success))'
	},
	cancelled: {
		label: 'Cancelled',
		color: 'hsl(var(--color-danger))'
	}
} satisfies ChartConfig;

export function Component() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Area Chart - Gradient</CardTitle>
				<CardDescription>
					Showing total reservations for the last 6 months
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="week"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							// tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<defs>
							<linearGradient id="fillCancelled" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-danger)"
									stopOpacity={0}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-danger)"
									stopOpacity={0}
								/>
							</linearGradient>
							<linearGradient id="fillConfirmed" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-success)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-success)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<Area
							dataKey="confirmed"
							type="natural"
							fill="url(#fillConfirmed)"
							fillOpacity={0.4}
							stroke="var(--color-success)"
							stackId="a"
						/>
						<Area
							dataKey="cancelled"
							type="natural"
							fill="url(#fillCancelled)"
							fillOpacity={0.4}
							stroke="var(--color-danger)"
							// stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex text-neutral items-center gap-2 font-medium leading-none">
							Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
						</div>
						<div className="flex items-center gap-2 leading-none text-neutral-strong">
							January - June 2024
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}

export const ReportsPage = () => {
	return (
		<div>
			<Component />
		</div>
	);
};
