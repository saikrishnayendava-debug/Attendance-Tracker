import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RotateCcw, Trophy, Play } from 'lucide-react';
import Navbar from './Navbar';

const WaterSortPuzzle = () => {
  const TUBE_CAPACITY = 4;
  const STORAGE_KEY = 'waterSortLevel';
  
  const generateLevels = () => {
    const levels = [];
    
    const colorPalette = [
      '#fca7e3', '#07f5e5', '#00d0ff', '#e06900', 
      '#eb056c', '#ffcc00', '#ad00f7', '#0262f2',
      '#ffe0a3', '#00f583', '#4d151a', '#a9e6e8',
      '#ff3308', '#c70039', '#2e2025', '#581845',
      '#99ff00', '#009100', '#00a2fa', '#787fb3'
    ];
    
    for (let level = 1; level <= 100; level++) {
      let numColors, numTubes;
      
      if (level <= 3) {
        numColors = 4;
        numTubes = 6;
      } else if (level <= 6) {
        numColors = 5;
        numTubes = 7;
      } else if (level <= 10) {
        numColors = 6;
        numTubes = 8;
      } else if (level <= 15) {
        numColors = 7;
        numTubes = 9;
      } else if (level <= 20) {
        numColors = 8;
        numTubes = 10;
      } else if (level <= 25) {
        numColors = 9;
        numTubes = 11;
      } else if (level <= 30) {
        numColors = 10;
        numTubes = 12;
      } else if (level <= 35) {
        numColors = 11;
        numTubes = 13;
      } else if (level <= 40) {
        numColors = 12;
        numTubes = 14;
      } else if (level <= 45) {
        numColors = 13;
        numTubes = 15;
      } else {
        numColors = 14;
        numTubes = 16;
      }
      
      if (level % 5 === 0) {
        numTubes = numColors + 2;
      }
      
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        for (let j = 0; j < TUBE_CAPACITY; j++) {
          colors.push(colorPalette[i % colorPalette.length]);
        }
      }
      
      for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
      }
      
      const tubes = [];
      let colorIndex = 0;
      
      for (let i = 0; i < numColors; i++) {
        const tube = [];
        for (let j = 0; j < TUBE_CAPACITY; j++) {
          tube.push(colors[colorIndex++]);
        }
        tubes.push(tube);
      }
      
      const emptyTubes = numTubes - numColors;
      for (let i = 0; i < emptyTubes; i++) {
        tubes.push([]);
      }
      
      levels.push({
        id: level,
        tubes: tubes,
        moves: 0
      });
    }
    
    return levels;
  };

  const loadLevel = async () => {
    try {
      const redgNo = localStorage.getItem("redgNo");
      const password = localStorage.getItem("password");
      if (!redgNo || !password) {
        const local = localStorage.getItem(STORAGE_KEY);
        const parsed = local ? parseInt(local, 10) : NaN;
        return (parsed >= 1 && parsed <= 100) ? parsed : 1;
      }
      const saved = await axios.post('https://database-9qqy.onrender.com/getLevel', {
        redgNo, password
      });
      if (saved) {
        const level = saved.data.level || 1;
        if (level >= 1 && level <= 100) {
          return level;
        }
      }
    } catch (error) {
      console.error('Error loading level:', error);
    }
    return 1;
  };

  const saveLevel = async(level) => {
    try {
      const redgNo = localStorage.getItem("redgNo");
      const password = localStorage.getItem("password");
      if (redgNo && password) {
        await axios.post('https://database-9qqy.onrender.com/postLevel', {
          redgNo, password, level
        });
      }
      else localStorage.setItem(STORAGE_KEY, level.toString());
    } catch (error) {
      console.error('Error saving level:', error);
    }
  };

  const [levels] = useState(generateLevels());
  const [currentLevel, setCurrentLevel] = useState(1);
  const [tubes, setTubes] = useState(() => levels[0].tubes);
  const [selectedTube, setSelectedTube] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let cancelled = false;
    loadLevel().then((level) => {
      if (cancelled) return;
      const lvl = Math.max(1, Math.min(100, level));
      setCurrentLevel(lvl);
      setTubes(levels[lvl - 1].tubes);
    });
    return () => { cancelled = true; };
  }, [levels]);

  useEffect(() => {
    checkWinCondition();
  }, [tubes, moveCount]);

  const checkWinCondition = () => {
    const allComplete = tubes.every(tube => {
      if (tube.length === 0) return true;
      if (tube.length !== TUBE_CAPACITY) return false;
      return tube.every(color => color === tube[0]);
    });
    
    if (allComplete && moveCount > 0) {
      setIsComplete(true);
    }
  };

  const canPour = (fromTube, toTube) => {
    if (fromTube.length === 0) return false;
    if (toTube.length >= TUBE_CAPACITY) return false;
    if (toTube.length === 0) return true;
    
    const fromColor = fromTube[fromTube.length - 1];
    const toColor = toTube[toTube.length - 1];
    
    return fromColor === toColor;
  };

  const countSameColorFromTop = (tube) => {
    if (tube.length === 0) return 0;
    const topColor = tube[tube.length - 1];
    let count = 0;
    for (let i = tube.length - 1; i >= 0; i--) {
      if (tube[i] === topColor) count++;
      else break;
    }
    return count;
  };

  const handleTubeClick = (index) => {
    if (isComplete) return;

    if (selectedTube === null) {
      if (tubes[index].length > 0) {
        setSelectedTube(index);
      }
    } else {
      if (selectedTube === index) {
        setSelectedTube(null);
        return;
      }

      const fromTube = [...tubes[selectedTube]];
      const toTube = [...tubes[index]];

      if (canPour(fromTube, toTube)) {
        setHistory([...history, tubes]);
        
        const colorsToPour = countSameColorFromTop(fromTube);
        const spaceAvailable = TUBE_CAPACITY - toTube.length;
        const pourCount = Math.min(colorsToPour, spaceAvailable);

        for (let i = 0; i < pourCount; i++) {
          toTube.push(fromTube.pop());
        }

        const newTubes = [...tubes];
        newTubes[selectedTube] = fromTube;
        newTubes[index] = toTube;

        setTubes(newTubes);
        setMoveCount(moveCount + 1);
      }

      setSelectedTube(null);
    }
  };

  const resetLevel = () => {
    const freshTubes = levels[currentLevel - 1].tubes;
    setTubes(freshTubes);
    setSelectedTube(null);
    setMoveCount(0);
    setIsComplete(false);
    setHistory([]);
  };

  const nextLevel = () => {
    if (currentLevel < 100) {
      const nextLvl = currentLevel + 1;
      setCurrentLevel(nextLvl);
      setTubes(levels[nextLvl - 1].tubes);
      setSelectedTube(null);
      setMoveCount(0);
      setIsComplete(false);
      setHistory([]);
      saveLevel(nextLvl);
    }
  };

  const undo = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const previousState = newHistory.pop();
      setTubes(previousState);
      setHistory(newHistory);
      setMoveCount(Math.max(0, moveCount - 1));
      setSelectedTube(null);
    }
  };

  const clearProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setCurrentLevel(1);
      setTubes(levels[0].tubes);
      setMoveCount(0);
      setIsComplete(false);
      setHistory([]);
      setSelectedTube(null);
    } catch (error) {
      console.error('Error clearing progress:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-xs font-bold">
        <Navbar/>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Water Sort Puzzle</h1>
          <div className="flex justify-center items-center gap-6 text-lg">
            <span className="px-4 py-2 text-sm bg-[#222528] opacity-80 text-white rounded-lg shadow">Level: {currentLevel}/100</span>
            <span className="px-4 py-2 text-sm bg-[#222528] opacity-80 text-white rounded-lg shadow">Moves: {moveCount}</span>
          </div>
        </div>

        {isComplete && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-black border border-[#222528] text-slate-200 rounded-2xl p-8 text-center shadow-2xl max-w-md">
              
              <h2 className="text-lg font-bold  mb-2">Level Complete!</h2>
              <p className=" mb-6">Completed in {moveCount} moves</p>
              {currentLevel < 100 ? (
                <button
                  onClick={nextLevel}
                  className="px-5 py-1 bg-green-500 text-white rounded-md font-bold hover:bg-green-600 transition flex items-center gap-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  Next Level
                </button>
              ) : (
                <div>
                  <p className="text-xl font-bold text-purple-600 mb-4">🎉 All Levels Complete! 🎉</p>
                  <button
                    onClick={clearProgress}
                    className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                  >
                    Play Again from Level 1
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-30 mb-6">
          {tubes.map((tube, index) => (
            <div
              key={index}
              onClick={() => handleTubeClick(index)}
              className={`relative cursor-pointer transition-all ${
                selectedTube === index ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div
                className={`w-16 h-56 border-4 rounded-b-3xl bg-slate-600 bg-opacity-40 relative overflow-hidden ${
                  selectedTube === index ? 'border-blue-500 shadow-lg' : 'border-gray-400'
                }`}
              >
                {tube.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="absolute w-full   transition-all duration-300"
                    style={{
                      height: `${100 / TUBE_CAPACITY}%`,
                      bottom: `${(colorIndex * 100) / TUBE_CAPACITY}%`,
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 ">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="px-3 py-1 bg-[#03ff81] text-black rounded font-extrabold hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            
          <RotateCcw className="w-5 h-5" />
            Undo
          </button>
          <button
            onClick={resetLevel}
            className="px-3 py-1 bg-[#03ff81] text-black rounded font-extrabold hover:bg-red-600 transition flex items-center gap-2"
          >
            Reset Level
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default WaterSortPuzzle;
