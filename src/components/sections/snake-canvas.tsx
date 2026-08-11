"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";

const CELL = 10;
const SNAKE_COLOR = "#10b981";
const FOOD_COLOR = "#6ee7b7";
const TICK_MS = 140;
const GAME_OVER_MS = 2300;

const DEATH_MESSAGES = [
  "> 404: Snake not found",
  "> Solid Snake got EATED >:(",
  "$ rm -rf snake.exe (segmentation fault)",
  "> Uncaught Error: Snake is not defined",
  "$ git blame snake.js -> você",
];

interface Point {
  x: number;
  y: number;
}

type Direction = "up" | "down" | "left" | "right";
type Mode = "auto" | "countdown" | "playing" | "gameover";

const DELTA: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function randomFood(cols: number, rows: number, snake: Point[]): Point {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
  } while (occupied.has(`${food.x},${food.y}`));
  return food;
}

function freshGame(cols: number, rows: number) {
  const startX = Math.floor(cols / 2);
  const startY = Math.floor(rows / 2);
  const snake: Point[] = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];
  return {
    snake,
    direction: "right" as Direction,
    food: randomFood(cols, rows, snake),
  };
}

function chooseDirection(
  head: Point,
  food: Point,
  occupied: Set<string>,
  cols: number,
  rows: number,
  current: Direction
): Direction {
  const dx = food.x - head.x;
  const dy = food.y - head.y;

  const preferred: Direction[] = [];
  if (Math.abs(dx) >= Math.abs(dy)) {
    preferred.push(dx > 0 ? "right" : "left");
    preferred.push(dy > 0 ? "down" : "up");
  } else {
    preferred.push(dy > 0 ? "down" : "up");
    preferred.push(dx > 0 ? "right" : "left");
  }
  preferred.push(current, "up", "down", "left", "right");

  const safe = (dir: Direction) => {
    if (dir === OPPOSITE[current]) return false;
    const delta = DELTA[dir];
    const next = {
      x: (head.x + delta.x + cols) % cols,
      y: (head.y + delta.y + rows) % rows,
    };
    return !occupied.has(`${next.x},${next.y}`);
  };

  for (const dir of preferred) {
    if (safe(dir)) return dir;
  }
  return current;
}

const ARROW_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

export function SnakeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const gameRef = useRef<ReturnType<typeof freshGame> | null>(null);
  const dimsRef = useRef({ cols: 0, rows: 0 });
  const modeRef = useRef<Mode>("auto");
  const playerDirectionRef = useRef<Direction>("right");

  const [mode, setMode] = useState<Mode>("auto");
  const [countdown, setCountdown] = useState(3);
  const [deathMessage, setDeathMessage] = useState("");
  const [maxLength, setMaxLength] = useState(0);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  function draw() {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const game = gameRef.current;
    if (!canvas || !ctx || !game) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = SNAKE_COLOR;
    game.snake.forEach((segment, index) => {
      const inset = index === 0 ? 0 : 1;
      ctx.fillRect(
        segment.x * CELL + inset,
        segment.y * CELL + inset,
        CELL - inset * 2 - 1,
        CELL - inset * 2 - 1
      );
    });

    ctx.fillStyle = FOOD_COLOR;
    ctx.fillRect(game.food.x * CELL + 2, game.food.y * CELL + 2, CELL - 4, CELL - 4);
  }

  function handlePlayerDeath(finalLength: number) {
    setMaxLength((prev) => Math.max(prev, finalLength));
    setDeathMessage(
      DEATH_MESSAGES[Math.floor(Math.random() * DEATH_MESSAGES.length)]
    );
    modeRef.current = "gameover";
    setMode("gameover");

    setTimeout(() => {
      const { cols, rows } = dimsRef.current;
      gameRef.current = freshGame(cols, rows);
      draw();
      modeRef.current = "auto";
      setMode("auto");
    }, GAME_OVER_MS);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    function setup() {
      const rect = container!.getBoundingClientRect();
      const cols = Math.max(10, Math.floor(rect.width / CELL));
      const rows = Math.max(10, Math.floor(rect.height / CELL));
      canvas!.width = cols * CELL;
      canvas!.height = rows * CELL;
      dimsRef.current = { cols, rows };
      gameRef.current = freshGame(cols, rows);
    }

    setup();
    draw();

    const interval = setInterval(() => {
      const currentMode = modeRef.current;
      if (currentMode !== "auto" && currentMode !== "playing") return;

      const { cols, rows } = dimsRef.current;
      const game = gameRef.current;
      if (!game) return;

      const occupied = new Set(game.snake.map((p) => `${p.x},${p.y}`));
      const direction =
        currentMode === "auto"
          ? chooseDirection(game.snake[0], game.food, occupied, cols, rows, game.direction)
          : playerDirectionRef.current;

      const delta = DELTA[direction];
      const head = game.snake[0];
      const nextHead: Point = {
        x: (head.x + delta.x + cols) % cols,
        y: (head.y + delta.y + rows) % rows,
      };

      if (occupied.has(`${nextHead.x},${nextHead.y}`)) {
        if (currentMode === "auto") {
          gameRef.current = freshGame(cols, rows);
          draw();
        } else {
          handlePlayerDeath(game.snake.length);
        }
        return;
      }

      const ateFood = nextHead.x === game.food.x && nextHead.y === game.food.y;
      const newSnake = [nextHead, ...game.snake];
      if (!ateFood) newSnake.pop();

      gameRef.current = {
        snake: newSnake,
        direction,
        food: ateFood ? randomFood(cols, rows, newSnake) : game.food,
      };
      draw();
    }, TICK_MS);

    function handleKeyDown(event: KeyboardEvent) {
      if (modeRef.current !== "playing") return;
      const next = ARROW_TO_DIRECTION[event.key];
      if (!next) return;
      event.preventDefault();
      if (next !== OPPOSITE[playerDirectionRef.current]) {
        playerDirectionRef.current = next;
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    const resizeObserver = new ResizeObserver(() => {
      setup();
      draw();
    });
    resizeObserver.observe(container);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setup/draw/game loop intentionally run once; live state is read via refs
  }, []);

  function handlePlayClick() {
    const { cols, rows } = dimsRef.current;
    gameRef.current = freshGame(cols, rows);
    playerDirectionRef.current = "right";
    draw();

    modeRef.current = "countdown";
    setMode("countdown");
    setCountdown(3);

    let remaining = 3;
    const countdownInterval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        modeRef.current = "playing";
        setMode("playing");
      } else {
        setCountdown(remaining);
      }
    }, 1000);
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[220px] w-full overflow-hidden rounded-md border border-slate-800 bg-slate-950/90"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />

      {mode === "auto" && (
        <div className="absolute right-2 top-2">
          <button
            type="button"
            onClick={handlePlayClick}
            className="flex items-center gap-1 rounded border border-slate-700 bg-slate-900/80 px-2 py-1 font-mono text-[10px] text-emerald-400 transition-colors hover:border-emerald-500/60"
          >
            <Play size={11} />
            play
          </button>
        </div>
      )}

      <AnimatePresence>
        {mode === "countdown" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-slate-950/80"
          >
            <motion.span
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-4xl font-bold text-emerald-400"
            >
              {countdown}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mode === "gameover" && (
          <motion.div
            initial={{ backgroundColor: "rgba(239,68,68,0)" }}
            animate={{
              backgroundColor: [
                "rgba(239,68,68,0.85)",
                "rgba(2,6,23,0.9)",
                "rgba(239,68,68,0.5)",
                "rgba(2,6,23,0.92)",
              ],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.15, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center"
          >
            <p className="font-mono text-2xl font-bold tracking-widest text-red-500 [text-shadow:0_0_8px_rgba(239,68,68,0.8)]">
              GAME OVER
            </p>
            <p className="font-mono text-xs text-emerald-400">{deathMessage}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
              recorde: {maxLength}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
