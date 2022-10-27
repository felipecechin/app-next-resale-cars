interface MainContentProps {
    children: React.ReactNode
}

function MainContent({ children }: MainContentProps): JSX.Element {
    return (
        <main className="-mt-20 px-4 pb-12">
            <div className="max-w-7xl mx-auto min-h-[32rem]">
                {children}
            </div>
        </main>
    )
}

export default MainContent;