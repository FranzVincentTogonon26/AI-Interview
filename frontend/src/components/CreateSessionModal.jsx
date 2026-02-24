import React from 'react'
import { PROBLEMS } from '../data/problems'
import { Code2Icon, PlusIcon } from 'lucide-react';
import { LoaderIcon } from 'react-hot-toast';

function CreateSessionModal({
    isOpen,
    onClose,
    roomConfig,
    setRoomConfig,
    onCreateRoom,
    isCreating,
}) {
 
  const problems = Object.values(PROBLEMS);

  if(!isOpen) return null;

  return (
    <div className="modal modal-open">
        <div className="modal-box max-2xl rounded-lg">
            <h3 className="font-bold text-2xl mb-6 text-gray-800 tracking-tight">Create New Session</h3>
            <div className="space-y-8">
                <div className="space-y-2">
                    <label className="label">
                        <span className="label-text font-semibold text-gray-800 tracking-tight">Select Problem</span>
                        <span className="label-text-alt text-error">*</span>
                    </label>
                    <select 
                        className="select w-full rounded-lg border select-md" 
                        value={roomConfig.problem}
                        onChange={(e) => {
                            const selectedProblem = problems.find( prob => `${prob.title}(${prob.difficulty})` === e.target.value );
                            setRoomConfig({
                                difficulty: selectedProblem?.difficulty,
                                problem: e.target.value
                            })
                        }}
                    >
                        <option value="" className='rounded-lg py-2.5'>Choose a coding problem..</option>
                        {
                            problems.map((problem) => (
                                <option key={problem.id} value={problem.value} className='rounded-lg py-2.5'>
                                    {problem.title}
                                    ({problem.difficulty})
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Room Summary */}
                {
                    roomConfig.problem && (
                        <div className="alert rounded-lg">
                            <Code2Icon className='size-5' />
                            <div className='space-y-1 text-normal text-gray-800'>
                                <p className="font-semibold">Room Summary:</p>
                                <p>Problem: <span className="font-medium">{roomConfig.problem}</span></p>
                                <p>Max Participants: <span className="font-medium">2 ( 1-on-1 session ) </span></p>
                            </div>
                        </div>
                    )
                }

            </div>
            
            <div className="modal-action mb-8">
                <button className="btn btn-primary-content rounded-lg border" onClick={onClose}>Cancel</button>
                <button 
                    className="btn btn-success rounded-lg border gap-2 text-white"
                    onClick={onCreateRoom}
                    disabled={isCreating || !roomConfig.problem}
                >
                    {
                        isCreating ? (
                            <LoaderIcon className='size-5 animate-spin' />
                        ) : (
                            <PlusIcon className='size-5' />
                        )
                    }
                    { isCreating ? "Creating..." : "Create" }
                </button>
            </div>

        </div>
        <div className="modal-backdrop" onClick={onClose} />
    </div>
  )
}

export default CreateSessionModal