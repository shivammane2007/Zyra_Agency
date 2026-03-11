'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { TextDisperse } from '@/components/ui/text-disperse'

export default function DefaultDemo() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center">
			<div
				aria-hidden="true"
				className={cn(
					'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
					'bg-[radial-gradient(ellipse_at_center,var(--color-foreground)/0.1,transparent_50%)]',
					'blur-[30px]'
				)}
			/>
			<div className="w-[50vw]">
				<TextDisperse className="text-[6vw]">+923123456789</TextDisperse>
			</div>
		</div>
	)
}