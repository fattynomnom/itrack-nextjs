import { defineStyleConfig, extendTheme } from '@chakra-ui/react'
import tailwindConfig from '../tailwind.config'

// #region color scheme
const colors: Record<string, { 500: string }> = {}
Object.entries(tailwindConfig.theme.extend.colors || {}).forEach(
    ([name, value]) => {
        colors[name] = { 500: value }
    }
)
// #endregion

// #region component default styles
const Checkbox = defineStyleConfig({
    defaultProps: {
        colorScheme: 'primary'
    }
})
// #endregion

export const theme = extendTheme({
    fonts: {
        body: 'Montserrat, sans serif'
    },
    colors,
    components: {
        Checkbox
    }
})
