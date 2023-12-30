import { Navbar } from './_components/navbar'
import { Footer } from './_components/footer'

export default function LandingPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
