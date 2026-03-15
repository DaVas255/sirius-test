import { useState } from 'react'

import type { IChips } from '../../types/types'
import { ChipsControls } from '../ChipsControls/ChipsControls'
import { ChipsList } from '../ChipsList/ChipsList'

export const ChipsComponent = () => {
	const [chipses, setChipses] = useState<IChips[]>([])
	const [activeChipsId, setActiveChipsId] = useState<number | null>(null)

	const handleChipsClick = (id: number) => {
		setActiveChipsId(prevId => (prevId === id ? null : id))
	}

	return (
		<>
			<ChipsControls setChipses={setChipses} />
			<ChipsList
				chipses={chipses}
				activeChipsId={activeChipsId}
				handleChipsClick={handleChipsClick}
			/>
		</>
	)
}
