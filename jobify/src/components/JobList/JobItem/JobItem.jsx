'use client'

export default function JobItem({ job, isCurrentJob, saveJob }) {
    const publicationDate = new Date(job.publication_date);
    const currentDate = new Date();

    const differenceInMilliseconds = currentDate - publicationDate;
    const daysSincePublication = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));


    return (
        <div className={`flex justify-between items-end rounded-lg px-4 pt-4 ${isCurrentJob ? 'lg:border lg:border-blue-600' : ''}`}>
            <div className="mr-2">
                <div className="flex items-center">
                    <img className="w-8 rounded-md mr-4" src={job.company_logo_url} />
                    <p className="text-sm font-medium text-gray-700">{job.company_name}</p>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.candidate_required_location}</p>
                <p className="text-sm text-gray-600 mb-2">{job.salary}</p>
            </div>
            <div className="flex flex-col items-center justify-between h-max">
                <p className="text-sm text-gray-600 text-center mb-2">{daysSincePublication} <br /> dia(s)</p>
            </div>
        </div>
    );
}