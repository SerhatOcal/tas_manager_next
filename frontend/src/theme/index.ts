import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#F7FAFC',
        color: '#1A202C',
      },
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: {
    primary: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
    secondary: {
      50: '#F5F7FA',
      100: '#E4E7EB',
      200: '#CBD2D9',
      300: '#9AA5B1',
      400: '#7B8794',
      500: '#616E7C',
      600: '#52606D',
      700: '#3E4C59',
      800: '#323F4B',
      900: '#1F2933',
    },
    accent: {
      50: '#FFE3EC',
      100: '#FFB8D2',
      200: '#FF8CBA',
      300: '#F364A2',
      400: '#E8368F',
      500: '#DA127D',
      600: '#BC0A6F',
      700: '#A30664',
      800: '#870557',
      900: '#620042',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      defaultProps: {
        colorScheme: 'purple',
        size: 'lg',
      },
      variants: {
        solid: (props: { colorScheme: string }) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: `${props.colorScheme}.600`,
            _disabled: {
              bg: `${props.colorScheme}.500`,
            },
          },
          _active: {
            bg: `${props.colorScheme}.700`,
          },
        }),
      },
    },
    Card: {
      baseStyle: {
        container: {
          backgroundColor: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: 'xl',
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'purple.500',
        size: 'lg',
      },
      variants: {
        outline: {
          field: {
            backgroundColor: 'white',
            borderRadius: 'md',
            _focus: {
              boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)',
            },
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {
        fontSize: 'sm',
        fontWeight: 'medium',
        color: 'gray.700',
      },
    },
  },
}) 