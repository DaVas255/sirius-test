import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ChipsComponent } from './components/ChipsComponent/ChipsComponent'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChipsComponent />
	</StrictMode>
)
