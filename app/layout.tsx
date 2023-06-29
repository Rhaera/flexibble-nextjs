import Footer from "@/components/Footer"
import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
    title: "Flexibble",
    description: "Showcase and discover remarkable developer projects"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}

export default RootLayout
