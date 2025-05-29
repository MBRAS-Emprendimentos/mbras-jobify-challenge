import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { search } = req.query;
    const apiUrl = search ? `https://remotive.io/api/remote-jobs?search=${search}` : "https://remotive.io/api/remote-jobs";

    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.status(200).json(data.jobs);
    } catch (error) {
        console.error('Erro ao buscar vagas: ',error);
        res.status(500).json({error: 'Erro ao buscar vagas'});
    }
}