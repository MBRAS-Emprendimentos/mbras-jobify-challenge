'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import JobDescription from "@/components/JobList/JobDescription/JobDescription";
import JobItem from "@/components/JobList/JobItem/JobItem";

export default function JobList({ jobs, categories }) {
    const router = useRouter();
    const [currentJob, setCurrentJob] = useState(jobs[0]);
    const [position, setPosition] = useState('');
    const [category, setCategory] = useState('');
    const [jobList, setJobList] = useState(jobs);
    const [clickedJob, setClickedJob] = useState(false);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false)
    const limit = 10;

    const onClickJob = (jobId) => {
        const currentJobInfo = jobList.find((job) => job.id === jobId);
        setCurrentJob(currentJobInfo);
        setClickedJob(true);
    };

    const onHandleSearch = async () => {
        setOffset(0);
        setLoading(true);
        const response = await fetch(`https://remotive.com/api/remote-jobs?limit=${limit}&search=${position}&category=${category}`);
        const data = await response.json();
        setJobList(data.jobs);
        setCurrentJob(data.jobs[0]);
        setLoading(false);
    };

    const onHandleLoadMore = async () => {
        setLoading(true);
        const newOffset = offset + limit;
        const response = await fetch(`https://remotive.com/api/remote-jobs?limit=${limit}&search=${position}&category=${category}&offset=${newOffset}`);
        const data = await response.json();
        setJobList((prev) => [...prev, ...data.jobs]);
        setOffset(newOffset);
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center h-dvh ">
            <div className="flex flex-col lg:w-10/12">
                <div className="m-2 flex items-center justify-evenly gap-6">
                    <div className="w-1/2">
                        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                        <input
                            id="text-input"
                            type="text"
                            placeholder="Digite o cargo desejado"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="block w-full rounded-lg border border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-gray-700"
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="select-input" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                        <select
                            id="select-input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="block w-full rounded-lg border border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-gray-700"
                        >
                            <option value="">Selecione...</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-6 mb-6">
                    <button
                        onClick={() => setJobList(jobs)}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                        Limpar busca
                    </button>
                    <button
                        onClick={onHandleSearch}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Buscar
                    </button>
                </div>
            </div>
            <div className="lg:flex lg:w-10/12 max-w-10/12 h-dvh">
                <div className={`mr-6 h-1/2 w-full lg:w-1/3 lg:overflow-auto ${clickedJob ? 'hidden lg:inline' : ''}`}>
                    <ul>
                        {jobList.map((job) => (
                            <li
                                className={`hover:bg-blue-500/20 mb-2  ${job.id !== currentJob.id ? 'lg:border-b lg:border-blue-500' : ''}`}
                                key={job.id}
                                onClick={() => onClickJob(job.id)}
                            >
                                <JobItem
                                    job={job}
                                    isCurrentJob={job.id === currentJob.id}
                                    saveJob={(e) => saveJob(e, job.id)}
                                />
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={onHandleLoadMore}
                        disabled={loading}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        {loading ? "Carregando..." : "Carregar Mais"}
                    </button>
                </div>
                <JobDescription clickedJob={clickedJob} onBack={() => setClickedJob(false)} currentJob={currentJob} />
            </div>
        </div>
    );
}