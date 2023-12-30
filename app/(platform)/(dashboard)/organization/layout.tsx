import { Sidebar } from '../_components/sidebar'

export default function OrganizationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className='raisinBlack fixed left-0 hidden h-screen w-72 overflow-y-auto p-4 shadow-md md:flex'>
                <Sidebar />
            </div>

            <div className='p-4 md:ml-72'>{children}</div>
        </>
    )
}
