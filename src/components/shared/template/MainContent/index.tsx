interface MainContentProps {
    children: React.ReactNode
}

function MainContent({ children }: MainContentProps): JSX.Element {
    return (
        <main className="-mt-20 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gray-100 min-h-[32rem] rounded-lg">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default MainContent;