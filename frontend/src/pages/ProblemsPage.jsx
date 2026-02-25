import React from 'react'
import Navbar from '../components/Navbar'
import { PROBLEMS } from '../data/problems'
import { ChevronRightIcon, Code2Icon } from 'lucide-react';
import { Link } from 'react-router';
import { getDifficultyBadgeClass } from '../lib/utils';

function ProblemsPage() {

  const problems = Object.values(PROBLEMS);
  const easyProblemCount = problems.filter( prob => prob.difficulty === "Easy").length;
  const mediumProblemCount = problems.filter( prob => prob.difficulty === "Medium").length;
  const hardProblemCount = problems.filter( prob => prob.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Practice Problems</h1>
          <p className="text-base-content/70 text-md leading-relaxed">Sharpen your cosing skills with these curated problems.</p>
        </div>
      </div>

      <div className="space-y-4 max-w-7xl mx-auto">
        {
          problems.map(problem => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="card bg-white border border-gray-200 shadow-md rounded-lg  hover:scale-[1.01] transition-transform"
            >
              <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="size-12 rounded-lg bg-info-content flex items-center justify-center">
                          <Code2Icon className='size-6 text-white' />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-lg font-bold text-gray-800">{problem.title}</h2>
                            <span className={`text-xs badge text-white ${getDifficultyBadgeClass(problem.difficulty.toLowerCase())}`}>{problem.difficulty}</span>
                          </div>
                          <p className="text-sm text-base-content/60">{problem.category}</p>
                        </div>
                    </div>
                    <p className="text-base-content/80 mb-3">{problem.description.text}</p>
                  </div>
                  {/* Right */}
                  <div className="flex items-center gap-2 text-gray-800 text-center">
                    <span className="font-medium">Solve</span>
                    <ChevronRightIcon className='size-5' />
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>

      <div className="mt-12 bg-base-100 shadow-md ">
        <div className="card max-w-7xl mx-auto ">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal items-center text-center">
              <div className="stat">
                <div className="stat-title text-lg font-semibold">Total Problems</div>
                <div className="stat-value text-base-content">{problems.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title text-lg font-semibold">Easy</div>
                <div className="stat-value text-primary-content">{easyProblemCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title text-lg font-semibold">Medium</div>
                <div className="stat-value text-warning">{mediumProblemCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title text-lg font-semibold">Hard</div>
                <div className="stat-value text-accent-content">{hardProblemCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProblemsPage