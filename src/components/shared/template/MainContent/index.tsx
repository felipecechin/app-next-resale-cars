interface MainContentProps {
    children: React.ReactNode
}

function MainContent({ children }: MainContentProps): JSX.Element {
    return (
        <main className="-mt-14 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </main>
    )
}

export default MainContent;