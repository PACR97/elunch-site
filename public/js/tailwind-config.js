/* ===================================
   Tailwind CSS Configuration
   eLunch Website
   =================================== */

tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                brand: {
                    primary: '#F97316',    // Naranja principal
                    dark: '#C2410C',       // Naranja oscuro
                    green: '#16a34a',      // Verde para slider
                }
            },
            animation: {
                'scroll': 'scroll 25s linear infinite',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        }
    }
}
