import { useCallback, useEffect, useRef, useState } from 'react'

import type { IChips } from '../../types/types'
import { Chips } from '../Chips/Chips'
import { ChipsPopup } from '../ChipsPopup/ChipsPopup'

import styles from './ChipsList.module.scss'

interface IChipsListProps {
	chipses: IChips[]
	activeChipsId: number | null
	handleChipsClick: (id: number) => void
}

export const ChipsList = ({
	chipses,
	activeChipsId,
	handleChipsClick
}: IChipsListProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [visibleChips, setVisibleChips] = useState<IChips[]>([])
	const [hiddenChips, setHiddenChips] = useState<IChips[]>([])
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const calculateVisibleChips = useCallback(() => {
		if (!containerRef.current || chipses.length === 0) {
			setVisibleChips([])
			setHiddenChips([])
			return
		}

		const container = containerRef.current
		const containerWidth = container.offsetWidth

		const tempElement = document.createElement('div')
		tempElement.style.visibility = 'hidden'
		tempElement.style.position = 'absolute'
		tempElement.style.width = '50px'
		tempElement.style.whiteSpace = 'nowrap'
		tempElement.style.padding = '8px 16px'
		tempElement.style.fontSize = '14px'
		tempElement.style.borderRadius = '20px'
		tempElement.style.border = '2px solid transparent'
		container.appendChild(tempElement)

		const visible: IChips[] = []
		const hidden: IChips[] = []
		let totalWidth = 0
		const gap = 10

		const moreButtonWidth = 40

		for (let i = 0; i < chipses.length; i++) {
			const chip = chipses[i]
			tempElement.textContent = chip.name
			const chipWidth = tempElement.offsetWidth

			if (
				totalWidth + chipWidth + (i > 0 ? gap : 0) + moreButtonWidth <=
				containerWidth
			) {
				visible.push(chip)
				totalWidth += chipWidth + (i > 0 ? gap : 0)
			} else {
				hidden.push(...chipses.slice(i))
				break
			}
		}

		container.removeChild(tempElement)

		setVisibleChips(visible)
		setHiddenChips(hidden)
	}, [chipses])

	useEffect(() => {
		calculateVisibleChips()

		const handleResize = () => {
			calculateVisibleChips()
			setAnchorEl(null)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [calculateVisibleChips])

	const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClosePopup = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)

	if (chipses.length === 0) {
		return <div className={styles.empty}>Нет чипсов</div>
	}

	return (
		<>
			<div ref={containerRef}>
				<div className={styles.chipsList}>
					{visibleChips.map(chip => (
						<Chips
							key={chip.id}
							id={chip.id}
							name={chip.name}
							isActive={activeChipsId === chip.id}
							onClick={handleChipsClick}
						/>
					))}

					{hiddenChips.length > 0 && (
						<button
							className={styles.moreButton}
							onClick={handleMoreClick}
						>
							+{hiddenChips.length}
						</button>
					)}
				</div>
			</div>

			<ChipsPopup
				chips={hiddenChips}
				activeChipId={activeChipsId}
				onChipClick={handleChipsClick}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClosePopup}
			/>
		</>
	)
}
