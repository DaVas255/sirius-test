import Button from '@mui/material/Button'
import { useRef } from 'react'

import type { IChips } from '../../types/types'

import styles from './ChipsControls.module.scss'

interface IChipsControlsProps {
	setChipses: React.Dispatch<React.SetStateAction<IChips[]>>
}

export const ChipsControls = ({ setChipses }: IChipsControlsProps) => {
	const idRef = useRef(0)

	const addChip = () => {
		idRef.current += 1
		setChipses(prevChipses => [
			...prevChipses,
			{ id: idRef.current, name: `Чипс ${idRef.current}` }
		])
	}

	const removeChip = () => {
		setChipses(prevChipses => prevChipses.slice(0, prevChipses.length - 1))
	}

	return (
		<div className={styles.chipsControls}>
			<Button
				variant='contained'
				onClick={addChip}
			>
				Добавить
			</Button>
			<Button
				variant='outlined'
				color='error'
				onClick={removeChip}
			>
				Удалить
			</Button>
		</div>
	)
}
