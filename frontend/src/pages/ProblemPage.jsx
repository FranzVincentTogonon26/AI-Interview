import React, { useEffect, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

import { PROBLEMS } from '../data/problems'
import Navbar from '../components/Navbar'
import ProblemDesciption from '../components/ProblemDesciption'
import CodeEditor from '../components/CodeEditor'
import OutputPanel from '../components/OutputPanel'
import { executeCode } from '../lib/piston'

function ProblemPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  // Assigned Default
  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  // Update the problem and code when the URL parameter changes
  useEffect(() => {
    if(id && PROBLEMS[id]){
        setCurrentProblemId(id)
        setCode(PROBLEMS[id].starterCode[selectedLanguage])
        setOutput(null)
    }
  }, [id, selectedLanguage])

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  }

  const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 }
    });
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 }
    });
  }

  const normalizeOutput = (output) => {
    return output.trim()
                 .split("\n")
                 .map((line) => 
                    line.trim()
                        .replace(/\[\s+/g, "[")
                        .replace(/\s+\]/g, "[")
                        .replace(/\s*,\s*/g, ",")
                  ).filter((line) => line.lenght > 0).join("\n");
  }

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizeActual = normalizeOutput.apply(actualOutput);
    const normalizeExpected = normalizeOutput.apply(expectedOutput);
    return normalizeActual == normalizeExpected;
  }

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    // Check if code executed successfully
    if(result.success){
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testPassed = checkIfTestsPassed(result.output, expectedOutput);

      if(testPassed){
        triggerConfetti();
        toast.success('All tests passed!..')
      } else {
        toast.error('Test Failed. Check your output..')
      }

    } else {
      toast.error(`Error: ${result.error}`);
    }

  }

  return (
    <div className="h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1">
          <PanelGroup direction='horizontal'>
            <Panel defaultSize={40} minSize={30}>
              <ProblemDesciption 
                problem={currentProblem} 
                currentProblemId={currentProblemId}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            </Panel>
            <PanelResizeHandle className='w-0.5 bg-gray-300 hover:bg-gray-500 transition-colors cursor-col-resize' />
            <Panel defaultSize={60} minSize={30}>
              <PanelGroup direction='vertical'>
                <Panel defaultSize={70} minSize={30}>
                  <CodeEditor
                   selectedLanguage={selectedLanguage}
                   code={code}
                   isRunning={isRunning}
                   onLanguageChange={handleLanguageChange}
                   onCodeChange={setCode}
                   onRunCode={handleRunCode}
                  />
                </Panel>
                <PanelResizeHandle className='h-0.5 bg-gray-300 hover:bg-gray-500 transition-colors cursor-row-resize' />
                <Panel defaultSize={30} minSize={30}>
                  <OutputPanel output={output} />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
    </div>
  )
}

export default ProblemPage