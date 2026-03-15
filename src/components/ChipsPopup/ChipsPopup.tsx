import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'

import type { IChips } from '../../types/types'
import { Chips } from '../Chips/Chips'

interface IChipsPopupProps {
	chips: IChips[]
	activeChipId?: number | null
	onChipClick?: (id: number) => void
	anchorEl: HTMLButtonElement | null
	open: boolean
	onClose: () => void
}

export const ChipsPopup = ({
	chips,
	activeChipId,
	onChipClick,
	anchorEl,
	open,
	onClose
}: IChipsPopupProps) => {
	if (!chips.length) return null

	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={onClose}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				{chips.map(chip => (
					<Chips
						key={chip.id}
						{...chip}
						isActive={activeChipId === chip.id}
						onClick={id => {
							onChipClick?.(id)
							onClose()
						}}
					/>
				))}
			</Box>
		</Popover>
	)
}
