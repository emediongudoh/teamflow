import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'

// Third party import
import { ThemeProvider } from '@/components/providers/theme-provider'

// Custom import
import { siteConfig } from '@/config/site'

const siteFont = localFont({
    src: '../public/fonts/OperatorMono.woff2',
})

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={siteFont.className}>
                <ThemeProvider
                    attribute='class'
                    forcedTheme='dark'
                    storageKey='teamflow-theme'
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
