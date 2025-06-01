import { motion, AnimatePresence } from "framer-motion";
import type { Job } from "../types/Job";

const JobModal = ({
  job,
  onClose,
}: {
  job: Job | null;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {job && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className="bg-white max-h-[90vh] overflow-y-auto rounded-xl p-6 w-full max-w-3xl shadow-lg relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.button
              className="cursor-pointer absolute top-4 right-4 text-black text-xl"
              onClick={onClose}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              ✕
            </motion.button>

            <h2 className="text-2xl font-semibold mb-[2vh] font-[var(--font-calsans)]">
              {job.title}
            </h2>
            <p className="text-lg text-gray-700 mb-1">{job.company_name}</p>
            <p className="mb-1">{job.candidate_required_location}</p>
            <p className="mb-2 text-blue-600 font-semibold mb-[2vh]">{job.salary}</p>
            <div
              className="prose prose-sm max-w-full font-[var(--font-dmsans)] mb-[6vh]"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition"
            >
              Candidatar-se
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;
