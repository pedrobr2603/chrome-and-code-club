
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Automotive theme colors
				racing: {
					red: '#FF1744',
					blue: '#00E5FF',
					orange: '#FF6D00',
					yellow: '#FFD600',
				},
				carbon: {
					900: '#0A0A0A',
					800: '#1A1A1A',
					700: '#2A2A2A',
					600: '#3A3A3A',
					500: '#4A4A4A',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(255, 23, 68, 0.5)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(255, 23, 68, 0.8)'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'neon-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 5px #00E5FF, 0 0 10px #00E5FF, 0 0 15px #00E5FF'
					},
					'50%': {
						boxShadow: '0 0 10px #00E5FF, 0 0 20px #00E5FF, 0 0 30px #00E5FF'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite'
			},
			backgroundImage: {
				'racing-gradient': 'linear-gradient(135deg, #FF1744, #FF6D00)',
				'neon-gradient': 'linear-gradient(135deg, #00E5FF, #FFD600)',
				'carbon-gradient': 'linear-gradient(135deg, #0A0A0A, #2A2A2A)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
