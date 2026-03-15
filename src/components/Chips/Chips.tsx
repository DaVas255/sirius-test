import type { IChips } from '../../types/types'

import styles from './Chips.module.scss'

interface IChipsProps extends IChips {
	isActive?: boolean
	onClick?: (id: number) => void
}

export const Chips = ({ id, name, isActive, onClick }: IChipsProps) => {
	return (
		<div
			className={`${styles.chips} ${isActive ? styles.active : ''}`}
			onClick={() => onClick?.(id)}
		>
			{name}
		</div>
	)
}
