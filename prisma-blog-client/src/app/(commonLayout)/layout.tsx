import { Navbar } from '@/components/layout/navbar'
import React from 'react'

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
