export default function JobDescription({ currentJob, clickedJob, onBack }) {

    return (
        currentJob &&
        (
            <>
                <button
                    className={`${clickedJob ? 'lg:hidden' : 'hidden'} flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 py-2 px-3 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    onClick={onBack}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                    Voltar para vagas
                </button>
                <div className={
                    clickedJob ? 'border rounded-lg p-4 shadow-sm  w-full max-w-2xl overflow-auto h-1/2  lg:w-3/4 '
                        : 'border rounded-lg p-4 shadow-sm w-full max-w-2xl lg:w-3/4 overflow-auto h-1/2 hidden lg:flex lg:flex-col'}
                >
                    <div className="border-b border-gray pb-4">
                        <div className="flex items-center">
                            {currentJob.company_logo_url && (
                                <img className="w-8 rounded-md mr-4" src={currentJob.company_logo_url} />
                            )}
                            <p className="text-sm font-medium text-gray-700">{currentJob.company_name}</p>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{currentJob.title}</h3>
                        <p className="text-sm text-gray-600">{currentJob.candidate_required_location}</p>
                    </div>
                    <div className="my-6" dangerouslySetInnerHTML={{ __html: currentJob.description }}></div>
                </div>
            </>
        )
    )
}