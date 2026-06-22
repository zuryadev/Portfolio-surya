import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, ShieldAlert, Wifi, RefreshCw } from 'lucide-react';

interface TerminalAppProps {
  onGamePlayed?: (gameName: string, score: number) => void;
}

interface CommandHistory {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export default function TerminalApp({ onGamePlayed }: TerminalAppProps) {
  const [history, setHistory] = useState<CommandHistory[]>([
    { type: 'success', text: '============= CUSTOM CARBON OS CORE v4.1.2 =============' },
    { type: 'output', text: 'System terminal initialization success.' },
    { type: 'output', text: 'Type "help" to see available commands or "games" to play games.' },
    { type: 'output', text: 'Try "play snake" or "play mario" directly!' },
    { type: 'output', text: '========================================================' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeGame, setActiveGame] = useState<'none' | 'tictactoe' | 'snake' | 'mario' | 'brickbreaker'>('none');
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  
  // Terminal UI Scroll helpers
  const TerminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);

  // --- GAME STATES ---
  
  // 1. TIC TAC TOE State
  const [tttBoard, setTttBoard] = useState<string[]>(Array(9).fill(' '));
  const [tttTurn, setTttTurn] = useState<'X' | 'O'>('X'); // X is user, O is computer
  const [tttStatus, setTttStatus] = useState<string>('Your Turn! Enter position (1-9):');

  // 2. SNAKE State
  const [snake, setSnake] = useState<Array<{ x: number; y: number }>>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 3, y: 2 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [snakeScore, setSnakeScore] = useState(0);
  const [gameIntervalId, setGameIntervalId] = useState<number | null>(null);

  // 3. RETRO MARIO JUMPER State
  const [marioY, setMarioY] = useState(0); // 0 is ground, positive is jumping
  const [marioMaxHeight, setMarioMaxHeight] = useState(4);
  const [marioIsJumping, setMarioIsJumping] = useState(false);
  const [obstacleX, setObstacleX] = useState(15); // grid width is 20
  const [marioScore, setMarioScore] = useState(0);

  // 4. BRICK BREAKER State
  const [paddleX, setPaddleX] = useState(4); // width 10, paddle size 3
  const [ball, setBall] = useState({ x: 5, y: 6, vx: 1, vy: -1 });
  const [bricks, setBricks] = useState<boolean[]>(Array(10).fill(true)); // row of 10 bricks at y=0
  const [breakerScore, setBreakerScore] = useState(0);

  // Auto Scroll
  useEffect(() => {
    if (monitorRef.current) {
      // Scroll the inner container to the bottom smoothly without triggering external page scrolling
      monitorRef.current.scrollTo({
        top: monitorRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history, activeGame, tttStatus]);

  // Click terminal body focus input
  const handleTerminalFocus = () => {
    if (activeGame === 'none') {
      inputRef.current?.focus();
    }
  };

  // Keyboard capture for Snake, Mario and Brick Breaker
  useEffect(() => {
    if (activeGame === 'none') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser default arrow scrolling inside the workspace terminal
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'Escape') {
        exitActiveGame();
        return;
      }

      // Snake Control
      if (activeGame === 'snake') {
        if ((e.key === 'ArrowUp' || e.key === 'w') && direction !== 'DOWN') setDirection('UP');
        if ((e.key === 'ArrowDown' || e.key === 's') && direction !== 'UP') setDirection('DOWN');
        if ((e.key === 'ArrowLeft' || e.key === 'a') && direction !== 'RIGHT') setDirection('LEFT');
        if ((e.key === 'ArrowRight' || e.key === 'd') && direction !== 'LEFT') setDirection('RIGHT');
      }

      // Mario Jumper Control
      if (activeGame === 'mario') {
        if ((e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w') && !marioIsJumping) {
          setMarioIsJumping(true);
          let height = 0;
          const jumpUp = setInterval(() => {
            setMarioY(prev => {
              if (prev >= 3) {
                clearInterval(jumpUp);
                // descend
                const fallDown = setInterval(() => {
                  setMarioY(current => {
                    if (current <= 1) {
                      clearInterval(fallDown);
                      setMarioIsJumping(false);
                      return 0;
                    }
                    return current - 1;
                  });
                }, 90);
                return prev;
              }
              return prev + 1;
            });
          }, 70);
        }
      }

      // Brick Breaker Control
      if (activeGame === 'brickbreaker') {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
          setPaddleX(p => Math.max(0, p - 1));
        }
        if (e.key === 'ArrowRight' || e.key === 'd') {
          setPaddleX(p => Math.min(7, p + 1)); // 10 columns - paddle width of 3
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGame, direction, marioIsJumping, paddleX]);

  // --- TIC TAC TOE LOGIC ---
  const handleTttMove = (position: number) => {
    if (activeGame !== 'tictactoe') return;
    const idx = position - 1;
    if (idx < 0 || idx > 8 || tttBoard[idx] !== ' ') {
      setTttStatus('Invalid index or occupied cell! Command position: 1-9');
      return;
    }

    const newBoard = [...tttBoard];
    newBoard[idx] = 'X';
    setTttBoard(newBoard);

    // Check Win
    if (checkTttWinner(newBoard, 'X')) {
      setTttBoard(newBoard);
      setTttStatus('🎉 YOU WON! Executing tictactoe shutdown.');
      if (onGamePlayed) onGamePlayed('TicTacToe', 100);
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'success', text: 'You beat Carbon AI at Tic-Tac-Toe! Score: +100pts.' }]);
        exitActiveGame();
      }, 1500);
      return;
    }

    if (newBoard.every(cell => cell !== ' ')) {
      setTttBoard(newBoard);
      setTttStatus('🤝 DRAW! Ending session.');
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'output', text: 'Tic-Tac-Toe draw.' }]);
        exitActiveGame();
      }, 1500);
      return;
    }

    // Computer Move
    setTttStatus('Carbon AI making computational model calculations...');
    setTimeout(() => {
      const bestIdx = calculateBestTttMove(newBoard);
      if (bestIdx !== -1) {
        newBoard[bestIdx] = 'O';
        setTttBoard(newBoard);

        if (checkTttWinner(newBoard, 'O')) {
          setTttStatus('💀 YOU LOST. Human models defeated.');
          setTimeout(() => {
            setHistory(prev => [...prev, { type: 'error', text: 'Defeated by Carbon AI at Tic-Tac-Toe.' }]);
            exitActiveGame();
          }, 1500);
          return;
        }
      }

      if (newBoard.every(cell => cell !== ' ')) {
        setTttStatus('🤝 DRAW! Ending session.');
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'output', text: 'Tic-Tac-Toe draw.' }]);
          exitActiveGame();
        }, 1500);
        return;
      }

      setTttStatus('Enter position (1-9):');
    }, 600);
  };

  const calculateBestTttMove = (board: string[]): number => {
    // 1. Try win
    for (let i = 0; i < 9; i++) {
      if (board[i] === ' ') {
        const copy = [...board];
        copy[i] = 'O';
        if (checkTttWinner(copy, 'O')) return i;
      }
    }
    // 2. Block user win
    for (let i = 0; i < 9; i++) {
      if (board[i] === ' ') {
        const copy = [...board];
        copy[i] = 'X';
        if (checkTttWinner(copy, 'X')) return i;
      }
    }
    // 3. Center
    if (board[4] === ' ') return 4;
    // 4. Corners
    const corners = [0, 2, 6, 8];
    const availCorners = corners.filter(c => board[c] === ' ');
    if (availCorners.length > 0) return availCorners[Math.floor(Math.random() * availCorners.length)];
    // 5. Any
    const avail = board.map((cell, idx) => cell === ' ' ? idx : null).filter(val => val !== null) as number[];
    return avail.length > 0 ? avail[Math.floor(Math.random() * avail.length)] : -1;
  };

  const checkTttWinner = (b: string[], ply: 'X' | 'O') => {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return wins.some(([x, y, z]) => b[x] === ply && b[y] === ply && b[z] === ply);
  };

  // --- SNAKE GAME ENGINE ---
  useEffect(() => {
    if (activeGame !== 'snake') return;

    const gameTick = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        
        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Boundary or self-collision check
        if (
          head.x < 0 || head.x >= 12 ||
          head.y < 0 || head.y >= 8 ||
          prevSnake.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
          clearInterval(intervalId);
          setTimeout(() => {
            setHistory(prev => [...prev, { type: 'output', text: `Snake Game Over! Final Score: ${snakeScore}` }]);
            if (onGamePlayed) onGamePlayed('Snake', snakeScore);
            exitActiveGame();
          }, 1000);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Eat food check
        if (head.x === food.x && head.y === food.y) {
          setSnakeScore(s => s + 10);
          // Spawn new food
          generateNewFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = window.setInterval(gameTick, 200);
    setGameIntervalId(intervalId);

    return () => clearInterval(intervalId);
  }, [activeGame, direction, food, snakeScore]);

  const generateNewFood = (currentSnake: Array<{ x: number; y: number }>) => {
    let nextFood;
    let valid = false;
    while (!valid) {
      nextFood = {
        x: Math.floor(Math.random() * 12),
        y: Math.floor(Math.random() * 8)
      };
      // Make sure food is not on snake
      valid = !currentSnake.some(seg => seg.x === nextFood.x && seg.y === nextFood.y);
    }
    if (nextFood) setFood(nextFood);
  };

  // --- RETRO MARIO JUMPER GAME ENGINE ---
  useEffect(() => {
    if (activeGame !== 'mario') return;

    const marioTick = () => {
      setObstacleX(ox => {
        if (ox <= 0) {
          setMarioScore(s => s + 1);
          return 19; // loop obstacle back
        }
        
        // Colllision check: Mario occupies grid x=2, obstacle size occupies grid y=0 (ground)
        if (ox === 2 && marioY === 0) {
          clearInterval(intervalId);
          setTimeout(() => {
            setHistory(prev => [...prev, { type: 'output', text: `Mario Game Over! Final score: ${marioScore}` }]);
            if (onGamePlayed) onGamePlayed('Super Mario', marioScore);
            exitActiveGame();
          }, 1000);
          return ox;
        }
        return ox - 1;
      });
    };

    const intervalId = window.setInterval(marioTick, 130);
    return () => clearInterval(intervalId);
  }, [activeGame, marioY, marioScore]);

  // --- BRICK BREAKER GAME ENGINE ---
  useEffect(() => {
    if (activeGame !== 'brickbreaker') return;

    const breakerTick = () => {
      setBall(prevBall => {
        let { x, y, vx, vy } = prevBall;
        let nextX = x + vx;
        let nextY = y + vy;

        // Bounce left/right boundaries
        if (nextX < 0 || nextX >= 10) {
          vx *= -1;
          nextX = x + vx;
        }

        // Bounce top boundary and check brick hits
        if (nextY < 0) {
          vy *= -1;
          nextY = y + vy;
        } else if (nextY === 0) {
          // Brick row is at y=0, check index matching nextX
          const brickIdx = nextX;
          if (brickIdx >= 0 && brickIdx < 10 && bricks[brickIdx]) {
            // Hit brick!
            setBricks(b => {
              const u = [...b];
              u[brickIdx] = false;
              return u;
            });
            setBreakerScore(s => s + 20);
            vy *= -1;
            nextY = y + vy;
          }
        }

        // Paddle Collision at y=7
        if (nextY === 7) {
          if (nextX >= paddleX && nextX < paddleX + 3) {
            vy *= -1; // bounce up
            nextY = y + vy;
          } else {
            // Ball falls below paddle
            clearInterval(intervalId);
            setTimeout(() => {
              setHistory(prev => [...prev, { type: 'output', text: `Breaker Over! Final Score: ${breakerScore}` }]);
              if (onGamePlayed) onGamePlayed('Brick Breaker', breakerScore);
              exitActiveGame();
            }, 1000);
            return prevBall;
          }
        }

        return { x: nextX, y: nextY, vx, vy };
      });
    };

    const intervalId = window.setInterval(breakerTick, 180);
    return () => clearInterval(intervalId);
  }, [activeGame, paddleX, bricks, breakerScore]);

  // Restart/Exit game helper
  const exitActiveGame = () => {
    setActiveGame('none');
    // Clear interval just in case
    if (gameIntervalId) {
      clearInterval(gameIntervalId);
    }
    setTttBoard(Array(9).fill(' '));
    setTttStatus('Your Turn! Enter position (1-9):');
    setSnake([{ x: 5, y: 5 }]);
    setDirection('RIGHT');
    setMarioY(0);
    setObstacleX(15);
    setPaddleX(4);
    setBall({ x: 5, y: 6, vx: 1, vy: -1 });
    setBricks(Array(10).fill(true));
  };

  // Run a specific game command
  const runGameCommand = (gameName: string) => {
    const cleanName = gameName.toLowerCase().trim();
    if (cleanName === 'tictactoe' || cleanName === 'tic-tac-toe' || cleanName === 'ttt') {
      setActiveGame('tictactoe');
      setHistory(prev => [...prev, { type: 'input', text: 'launch game: tictactoe' }]);
    } else if (cleanName === 'snake') {
      setSnake([{ x: 5, y: 5 }]);
      setDirection('RIGHT');
      setSnakeScore(0);
      setActiveGame('snake');
      setHistory(prev => [...prev, { type: 'input', text: 'launch game: snake' }]);
    } else if (cleanName === 'mario' || cleanName === 'supermario') {
      setMarioScore(0);
      setMarioY(0);
      setObstacleX(18);
      setActiveGame('mario');
      setHistory(prev => [...prev, { type: 'input', text: 'launch game: supermario' }]);
    } else if (cleanName === 'brickbreaker' || cleanName === 'breaker') {
      setBreakerScore(0);
      setPaddleX(4);
      setBall({ x: 5, y: 6, vx: 1, vy: -1 });
      setBricks(Array(10).fill(true));
      setActiveGame('brickbreaker');
      setHistory(prev => [...prev, { type: 'input', text: 'launch game: brickbreaker' }]);
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', text: `Game "${gameName}" not found. Type "games" for a full retro catalog.` }
      ]);
    }
  };

  // Submit terminal inputs
  const handleSubmitCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;

    const parts = cmd.toLowerCase().split(' ');
    const baseCmd = parts[0];

    let response: CommandHistory[] = [{ type: 'input', text: cmd }];

    switch (baseCmd) {
      case 'help':
        response.push(
          { type: 'success', text: 'Available commands:' },
          { type: 'output', text: '  help       - Display available system directories & controls.' },
          { type: 'output', text: '  clear      - Empty system terminal outputs.' },
          { type: 'output', text: '  about      - Output summary information about Surya.' },
          { type: 'output', text: '  skills     - Display verified programmer languages.' },
          { type: 'output', text: '  experience - Show professional roadmap benchmarks.' },
          { type: 'output', text: '  projects   - Output catalog of shipped interactive products.' },
          { type: 'output', text: '  contact    - Print verified links: email, github, socials.' },
          { type: 'output', text: '  games      - List simulated high-speed retro games.' },
          { type: 'output', text: '  play <game>- Launch interactive arcade session inside CRT panel.' }
        );
        break;

      case 'clear':
        setHistory([]);
        setInputValue('');
        return;

      case 'about':
        response.push(
          { type: 'success', text: 'SURYA KUMAR - Full Stack & Interactive Systems Architect' },
          { type: 'output', text: 'Specializes in bridging dynamic front-end canvases and solid state clusters.' },
          { type: 'output', text: 'Current Status: engineering client compiles, launching retro games, open for projects.' }
        );
        break;

      case 'skills':
        response.push(
          { type: 'success', text: 'REGISTERED STACKS:' },
          { type: 'output', text: '  Languages:  TypeScript, JavaScript, Rust, Go, Python, HTML5/CSS3' },
          { type: 'output', text: '  Frameworks: React, Next.js, Node.js, Express, TailwindCSS, Three.js' },
          { type: 'output', text: '  Databases:   PostgreSQL, MongoDB, Redis, Google Cloud Spanner' }
        );
        break;

      case 'experience':
        response.push(
          { type: 'success', text: 'ROADMAP TIMELINE:' },
          { type: 'output', text: '  [2024-Present] Lead Interactive Architect @ Hexagon Creative Labs' },
          { type: 'output', text: '  [2022-2024]    Senior Full-Stack Engineer @ Aether Tech' },
          { type: 'output', text: '  [2020-2022]    Interactive UI Architect @ Ember Graphics' }
        );
        break;

      case 'projects':
        response.push(
          { type: 'success', text: 'SHIPPED PRODUCTS:' },
          { type: 'output', text: '  1. QuantumForge Engine - Fluid physics canvas & vector editor.' },
          { type: 'output', text: '  2. Carbon Terminal & Retro OS - High frame rate web browser terminal.' },
          { type: 'output', text: '  3. Lumen Distributed DB - Resilient clustered edge replication node.' },
          { type: 'output', text: '  4. Aurora Music Synthesizer - Interactive audio frequency canvas.' }
        );
        break;

      case 'contact':
        response.push(
          { type: 'success', text: 'CHANNELS FOR DEPLOYMENT RECRUITMENT:' },
          { type: 'output', text: '  email:    surya15971597@gmail.com' },
          { type: 'output', text: '  github:   https://github.com/surya1597' },
          { type: 'output', text: '  linkedin: https://linkedin.com/in/surya-kumar-1597' },
          { type: 'output', text: '  insta:    https://instagram.com/surya_kumar' }
        );
        break;

      case 'games':
        response.push(
          { type: 'success', text: 'RETRO SIMULATION MODULES AVAILABLE:' },
          { type: 'output', text: '  - snake         (Classic arrow/WASD food collection)' },
          { type: 'output', text: '  - mario         (Press spacebar or ArrowUp to jump obstacles)' },
          { type: 'output', text: '  - tictactoe     (ASCII tic-tac-toe vs Carbon AI model)' },
          { type: 'output', text: '  - brickbreaker  (Left/right arrow paddle to bounce ball, clear bricks)' },
          { type: 'output', text: '  Usage: type "play <game-name>" (e.g. "play snake")' }
        );
        break;

      case 'play':
        if (parts.length < 2) {
          response.push({ type: 'error', text: 'Include simulation module name. E.g., "play snake" or "play mario".' });
        } else {
          setHistory(prev => [...prev, ...response]);
          runGameCommand(parts[1]);
          setInputValue('');
          return;
        }
        break;

      default:
        // Try playing directly without 'play' keyword if user typed 'snake' or 'mario'
        if (['snake', 'mario', 'tictactoe', 'brickbreaker', 'breaker', 'ttt'].includes(baseCmd)) {
          setHistory(prev => [...prev, ...response]);
          runGameCommand(baseCmd);
          setInputValue('');
          return;
        }
        response.push({ type: 'error', text: `Command not found: "${cmd}". Type "help" to view directories.` });
    }

    setHistory(prev => [...prev, ...response]);
    setInputValue('');
  };

  // RENDER INTERACTIVE TIC-TAC-TOE ASCII SCREEN
  const renderTttTerminal = () => {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-black/40 border border-green-500/20 rounded-xl max-w-sm mx-auto font-mono text-center">
        <div className="text-green-400 text-xs uppercase font-extrabold mb-3 tracking-widest flex items-center gap-1.5 animate-pulse">
          <Play size={12} /> Live Tic-Tac-Toe Session
        </div>
        
        {/* Board */}
        <div className="grid grid-cols-3 gap-1.5 bg-brand-charcoal p-3 border border-green-500/20 rounded w-44">
          {tttBoard.map((cell, idx) => (
            <button
              key={idx}
              id={`ttt-cell-${idx + 1}`}
              onClick={() => cell === ' ' && handleTttMove(idx + 1)}
              className="w-11 h-11 bg-brand-dark/90 text-white font-mono font-bold text-lg flex items-center justify-center border border-green-500/10 hover:border-green-400 hover:bg-green-500/10 transition-colors focus:outline-none cursor-pointer"
            >
              <span className={cell === 'X' ? 'text-green-400' : cell === 'O' ? 'text-green-700' : 'text-transparent'}>
                {cell || ' '}
              </span>
            </button>
          ))}
        </div>Items

        <p className="text-[10px] text-green-300 mt-3 whitespace-pre-line font-medium leading-normal bg-[#080808]/85 p-2 w-full border border-green-500/10">
          {tttStatus}
        </p>

        <button
          onClick={exitActiveGame}
          className="mt-3 px-3 py-1 bg-red-500/10 hover:bg-red-500/30 border border-red-500/50 text-red-400 text-[10px] rounded hover:text-white transition-all font-mono uppercase"
        >
          Exit Game (ESC)
        </button>
      </div>
    );
  };

  // RENDER RETRO SNAKE GRID
  const renderSnakeTerminal = () => {
    // Generate 8x12 character matrix
    const grid: string[][] = [];
    for (let r = 0; r < 8; r++) {
      const row: string[] = [];
      for (let c = 0; c < 12; c++) {
        // Snake body
        const isBody = snake.some(s => s.x === c && s.y === r);
        const isHead = snake[0]?.x === c && snake[0]?.y === r;
        const isFood = food.x === c && food.y === r;

        if (isHead) row.push('■');
        else if (isBody) row.push('■');
        else if (isFood) row.push('★');
        else row.push('·');
      }
      grid.push(row);
    }

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-black/40 border border-green-500/20 rounded-xl max-w-sm mx-auto font-mono text-center">
        <div className="text-green-400 text-xs uppercase font-extrabold mb-1 tracking-widest animate-pulse flex items-center gap-1">
          <Play size={12} /> Active Snake Matrix
        </div>
        <div className="text-[10px] text-green-500/80 mb-3">Score: <span className="font-bold text-white">{snakeScore}</span></div>

        {/* Matrix display */}
        <div className="bg-[#050505] px-4 py-2 border border-green-500/15 rounded text-white text-base leading-none tracking-widest w-full max-w-[210px] text-center font-mono select-none">
          {grid.map((row, r) => (
            <div key={r} className="flex justify-between py-0.5">
              {row.map((cell, c) => (
                <span 
                  key={c} 
                  className={
                    cell === '■' ? 'text-green-400' : cell === '★' ? 'text-red-500 font-black animate-ping' : 'text-green-950'
                  }
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Console control pad for mobile user interactions */}
        <div className="mt-3 grid grid-cols-3 gap-1 w-28">
          <div></div>
          <button 
            id="mobile-btn-up"
            onClick={() => direction !== 'DOWN' && setDirection('UP')}
            className="p-1 px-2.5 bg-brand-charcoal/80 border border-green-500/20 rounded text-xs select-none text-green-400 hover:bg-green-500 hover:text-black cursor-pointer"
          >
            ▲
          </button>
          <div></div>
          
          <button 
            id="mobile-btn-left"
            onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
            className="p-1 px-2.5 bg-brand-charcoal/80 border border-green-500/20 rounded text-xs select-none text-green-400 hover:bg-green-500 hover:text-black cursor-pointer"
          >
            ◀
          </button>
          <button 
            id="mobile-btn-down"
            onClick={() => direction !== 'UP' && setDirection('DOWN')}
            className="p-1 px-2.5 bg-brand-charcoal/80 border border-green-500/20 rounded text-xs select-none text-green-400 hover:bg-green-500 hover:text-black cursor-pointer"
          >
            ▼
          </button>
          <button 
            id="mobile-btn-right"
            onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
            className="p-1 px-2.5 bg-brand-charcoal/80 border border-green-500/20 rounded text-xs select-none text-green-400 hover:bg-green-500 hover:text-black cursor-pointer"
          >
            ▶
          </button>
        </div>

        <p className="text-[9px] text-green-600 mt-3 uppercase tracking-wider font-light">
          Use Arrow Keys / WASD. Press ESC to quit.
        </p>

        <button
          onClick={exitActiveGame}
          className="mt-3 px-3 py-1 bg-red-500/10 hover:bg-red-500/30 border border-red-500/50 text-red-500 text-[10px] rounded transition-all font-mono uppercase"
        >
          Exit Game
        </button>
      </div>
    );
  };

  // RENDER DETRO MARIO PLATFORMER
  const renderMarioTerminal = () => {
    // Width 20, Height 5. Mario character: M, Ground obstacle: O
    const grid: string[][] = Array(5).fill(null).map(() => Array(20).fill(' '));

    // Ground level at Index 4
    for (let c = 0; c < 20; c++) {
      grid[4][c] = '_';
    }

    // Mario Y coordinates (0 ground, positive levels)
    const marioRow = 4 - marioY;
    if (marioRow >= 0 && marioRow < 5) {
      grid[marioRow][2] = 'M'; // Mario is fixed at x=2
    }

    // Obstacle X coordinates
    if (obstacleX >= 0 && obstacleX < 20) {
      grid[4][obstacleX] = '#'; // obstacle sits on ground
    }

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-black/40 border border-green-500/20 rounded-xl max-w-sm mx-auto font-mono text-center">
        <div className="text-green-400 text-xs uppercase font-extrabold mb-1 tracking-widest animate-pulse flex items-center gap-1">
          <Play size={12} /> Simulated Super Mario Jumper
        </div>
        <div className="text-[10px] text-green-500/80 mb-3">Score: <span className="font-bold text-white">{marioScore}</span></div>

        {/* Game Stage Screen */}
        <div className="bg-[#050505] p-3 rounded font-mono text-sm leading-none tracking-widest w-full max-w-[240px] text-left border border-green-500/10 shadow-inner select-none h-28 flex flex-col justify-end">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="h-4 flex items-center font-bold">
              {row.map((cell, cIdx) => (
                <span 
                  key={cIdx} 
                  className={
                    cell === 'M' ? 'text-green-400 animate-pulse' : cell === '#' ? 'text-red-500' : 'text-green-950'
                  }
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Jump button */}
        <button
          id="mobile-btn-jump"
          onClick={() => {
            if (!marioIsJumping) {
              setMarioIsJumping(true);
              let h = 0;
              const jUp = setInterval(() => {
                setMarioY(cur => {
                  if (cur >= 3) {
                    clearInterval(jUp);
                    const fDown = setInterval(() => {
                      setMarioY(c => {
                        if (c <= 1) {
                          clearInterval(fDown);
                          setMarioIsJumping(false);
                          return 0;
                        }
                        return c - 1;
                      });
                    }, 90);
                    return cur;
                  }
                  return cur + 1;
                });
              }, 70);
            }
          }}
          className="mt-3 w-32 py-2 bg-green-500 hover:bg-green-400 text-black font-mono text-xs font-bold rounded uppercase cursor-pointer transition-colors"
        >
          JUMP (ARROW UP)
        </button>

        <p className="text-[9px] text-green-600 mt-3 uppercase tracking-wider font-light">
          Jump over incoming '#' traps. Press ESC to quit.
        </p>

        <button
          onClick={exitActiveGame}
          className="mt-3 px-3 py-1 bg-red-500/10 hover:bg-red-500/30 border border-red-500/50 text-red-500 text-[10px] rounded transition-all font-mono uppercase"
        >
          Exit Game
        </button>
      </div>
    );
  };

  // RENDER BRICK BREAKER
  const renderBreakerTerminal = () => {
    // Board width 10, height 8.
    const grid: string[][] = Array(8).fill(null).map(() => Array(10).fill(' '));

    // Render remaining bricks at row 0
    for (let c = 0; c < 10; c++) {
      if (bricks[c]) {
        grid[0][c] = '=';
      }
    }

    // Render ball
    const ballX = Math.max(0, Math.min(9, ball.x));
    const ballY = Math.max(0, Math.min(7, ball.y));
    grid[ballY][ballX] = 'O';

    // Render paddle at row 7
    for (let offset = 0; offset < 3; offset++) {
      const padCol = paddleX + offset;
      if (padCol >= 0 && padCol < 10) {
        grid[7][padCol] = '▲';
      }
    }

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-black/40 border border-green-500/20 rounded-xl max-w-sm mx-auto font-mono text-center">
        <div className="text-green-400 text-xs uppercase font-extrabold mb-1 tracking-widest animate-pulse flex items-center gap-1">
          <Play size={12} /> Brick Breaker Matrix
        </div>
        <div className="text-[10px] text-green-500/80 mb-3">Score: <span className="font-bold text-white">{breakerScore}</span></div>

        {/* Ball Grid screen */}
        <div className="bg-[#050505] p-3 rounded font-mono text-base leading-none tracking-widest w-full max-w-[200px] text-center border border-green-500/15 shadow-inner select-none h-36 flex flex-col justify-between">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-between py-0.5">
              {row.map((cell, cIdx) => (
                <span 
                  key={cIdx} 
                  className={
                    cell === '=' ? 'text-red-500 animate-pulse font-extrabold' : cell === 'O' ? 'text-green-400' : cell === '▲' ? 'text-white' : 'text-green-950'
                  }
                >
                  {cell === ' ' ? '·' : cell}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Pad slide controls */}
        <div className="mt-3 flex gap-3 w-full max-w-[180px]">
          <button 
            id="paddle-left-btn"
            onClick={() => setPaddleX(p => Math.max(0, p - 1))}
            className="flex-1 py-1 bg-brand-charcoal border border-green-500/25 rounded text-xs select-none text-green-400 hover:bg-green-500 hover:text-black cursor-pointer"
          >
            ◀ Paddle
          </button>
          
          <button 
            id="paddle-right-btn"
            onClick={() => setPaddleX(p => Math.min(7, p + 1))}
            className="flex-1 py-1 bg-brand-charcoal border border-green-500/25 rounded text-xs select-none text-green-400 hover:bg-green-500 hover:text-black cursor-pointer"
          >
            Paddle ▶
          </button>
        </div>

        <p className="text-[9px] text-green-600 mt-3 uppercase tracking-wider font-light">
          Tilt side to side. Press ESC to quit.
        </p>

        <button
          onClick={exitActiveGame}
          className="mt-3 px-3 py-1 bg-red-500/10 hover:bg-red-500/30 border border-red-500/50 text-red-500 text-[10px] rounded transition-all font-mono uppercase"
        >
          Exit Game
        </button>
      </div>
    );
  };

  return (
    <div 
      className="bg-[#050505] border border-green-500/25 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_30px_rgba(34,197,94,0.1)] relative select-text"
      onClick={handleTerminalFocus}
    >
      {/* Top Titlebar */}
      <div className="bg-[#121212] px-4 py-2.5 flex items-center justify-between border-b border-green-500/15">
        <div className="flex gap-1.5 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-2 font-mono text-[9px] tracking-wider text-green-400 uppercase font-semibold">CARBON MATRIX CORE TERMINAL</span>
        </div>
        
        <div className="flex items-center gap-1.5 md:gap-3 font-mono text-[9px] text-green-500/65">
          <div className="flex items-center gap-1">
            <Wifi size={10} className="text-green-400 animate-pulse" />
            <span className="text-green-400/80 hidden sm:inline">SECURE SHELL</span>
          </div>
          <div className="w-[1px] h-3 bg-green-500/20" />
          <span className="text-green-400 font-bold">PORT: 3000</span>
        </div>
      </div>

      {/* Screen/Body */}
      <div 
        id="terminal-monitor-screen"
        ref={monitorRef}
        className="flex-1 p-4 font-mono text-xs leading-relaxed min-h-[220px] md:min-h-[260px] max-h-[380px] overflow-y-auto bg-[#020202] text-green-400/90 relative custom-scrollbar"
      >
        {/* Neon Scanline effect */}
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-green-500/[0.025] to-transparent pointer-events-none animate-scanline z-10" />

        {activeGame === 'none' ? (
          <div className="space-y-1">
            {history.map((log, index) => {
              let textClass = 'text-green-300';
              if (log.type === 'input') textClass = 'text-green-400 font-bold';
              else if (log.type === 'error') textClass = 'text-red-400 font-semibold';
              else if (log.type === 'success') textClass = 'text-green-400 font-semibold glow-green-text';
              else if (log.type === 'output') textClass = 'text-green-400/70';

              return (
                <div key={index} className="flex gap-2.5 items-start break-all">
                  {log.type === 'input' && <span className="text-green-600/70">surya@portfolio:~$</span>}
                  <span className={textClass}>{log.text}</span>
                </div>
              );
            })}
            <div ref={TerminalEndRef} />
          </div>
        ) : (
          <div className="py-4">
            {activeGame === 'tictactoe' && renderTttTerminal()}
            {activeGame === 'snake' && renderSnakeTerminal()}
            {activeGame === 'mario' && renderMarioTerminal()}
            {activeGame === 'brickbreaker' && renderBreakerTerminal()}
            <div ref={TerminalEndRef} />
          </div>
        )}
      </div>

      {/* Bottom Command Prompt - only active when not in interactive game */}
      {activeGame === 'none' && (
        <form 
          onSubmit={handleSubmitCommand}
          className="p-3 bg-[#0a0a0a] border-t border-green-500/15 flex items-center gap-2"
        >
          <span className="font-mono text-xs text-green-600/80 shrink-0">surya@portfolio:~$</span>
          <input
            id="terminal-command-input-field"
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type 'help' and press enter..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-green-400 focus:ring-0 placeholder:text-green-900 capitalize-none"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <button 
            type="submit"
            className="px-3.5 py-1.5 bg-green-500/10 hover:bg-green-500 border border-green-500/30 hover:border-green-400 hover:text-black text-green-400 font-mono text-[10px] font-bold rounded transition-all cursor-pointer"
          >
            EXECUTE
          </button>
        </form>
      )}
    </div>
  );
}
