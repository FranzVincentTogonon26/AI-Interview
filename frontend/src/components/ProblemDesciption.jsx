import React from 'react'
import { getDifficultyBadgeClass } from '../lib/utils'

function ProblemDesciption({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems
}) {
  return (
    <div className="h-full overflow-y-auto bg-base-200">
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl font-bold text-gray-800">{problem.title}</h1>
          <span className={`text-xs badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-base-content/80 font-semibold">{problem.category}</p>
        <div className="mt-5">
          <select className="select select-md w-full rounded-lg border" value={currentProblemId} onChange={(e) => onProblemChange(e.target.value)}>
            {
              allProblems.map((prob) => (
                <option value={prob.id} key={prob.id} className='rounded-lg py-2.5'>
                  { prob.title } - { prob.difficulty }
                </option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="p-6 space-y-6">
          <div className="bg-base-100 rounded-lg shadow p-5 border border-base-100">
            <h2 className="text-xl font-bold text-gray-800">Description</h2>
            <div className="space-y-4 text-base leading-relaxed mt-3">
              <p className='text-base-content/90 text-sm'>{ problem.description.text }</p>
              {
                problem.description.notes.map((note,index) => (
                  <p className="text-base-content/90 text-sm" key={index}>{note}</p>
                ))
              }
            </div>
          </div>

          {/* EXAMPLES SECTION */}
          <div className="bg-base-100 rounded-lg shadow-sm p-5 border border-base-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Examples</h2>
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="font-semibold text-base-content">Example {idx + 1}</p>
                  </div>
                  <div className="bg-base-200 rounded p-4 font-mono text-sm space-y-3">
                    <div className="flex gap-2">
                      <span className="text-primary-content font-semibold min-w-[70px]">Input:</span>
                      <span>{example.input}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-secondary-content font-semibold min-w-[70px]">Output:</span>
                      <span>{example.output}</span>
                    </div>
                    {example.explanation && (
                      <div className="pt-2 border-t border-base-300 mt-2">
                        <span className="text-base-content/60 font-sans text-sm">
                          <span className="font-semibold">Explanation:</span> {example.explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        {/* CONSTRAINTS */}
        <div className="bg-base-100 rounded-lg shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Constraints</h2>
          <ul className="space-y-2 text-base-content/90">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex gap-2 items-center">
                <div aria-label="success" className="status status-success"></div>
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default ProblemDesciption