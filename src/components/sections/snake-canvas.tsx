"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

const CELL = 10;
const SNAKE_COLOR = "#10b981";
const FOOD_COLOR = "#6ee7b7";
const TICK_MS = 140;

interface Point {
  x: number;
  y: number;
}

type Direction = "up" | "down" | "left" | "right";

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

export function SnakeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<ReturnType<typeof freshGame> | null>(null);
  const dimsRef = useRef({ cols: 0, rows: 0 });
  const [running, setRunning] = useState(true);
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function setup() {
      const rect = container!.getBoundingClientRect();
      const cols = Math.max(10, Math.floor(rect.width / CELL));
      const rows = Math.max(10, Math.floor(rect.height / CELL));
      canvas!.width = cols * CELL;
      canvas!.height = rows * CELL;
      dimsRef.current = { cols, rows };
      gameRef.current = freshGame(cols, rows);
    }

    function draw() {
      const game = gameRef.current;
      if (!game) return;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      ctx!.fillStyle = SNAKE_COLOR;
      game.snake.forEach((segment, index) => {
        const inset = index === 0 ? 0 : 1;
        ctx!.fillRect(
          segment.x * CELL + inset,
          segment.y * CELL + inset,
          CELL - inset * 2 - 1,
          CELL - inset * 2 - 1
        );
      });

      ctx!.fillStyle = FOOD_COLOR;
      ctx!.fillRect(game.food.x * CELL + 2, game.food.y * CELL + 2, CELL - 4, CELL - 4);
    }

    setup();
    draw();

    const interval = setInterval(() => {
      if (!runningRef.current) return;
      const { cols, rows } = dimsRef.current;
      const game = gameRef.current;
      if (!game) return;

      const occupied = new Set(game.snake.map((p) => `${p.x},${p.y}`));
      const direction = chooseDirection(
        game.snake[0],
        game.food,
        occupied,
        cols,
        rows,
        game.direction
      );
      const delta = DELTA[direction];
      const head = game.snake[0];
      const nextHead: Point = {
        x: (head.x + delta.x + cols) % cols,
        y: (head.y + delta.y + rows) % rows,
      };

      if (occupied.has(`${nextHead.x},${nextHead.y}`)) {
        gameRef.current = freshGame(cols, rows);
        draw();
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

    const resizeObserver = new ResizeObserver(() => {
      setup();
      draw();
    });
    resizeObserver.observe(container);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, []);

  function handleRestart() {
    const { cols, rows } = dimsRef.current;
    gameRef.current = freshGame(cols, rows);
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[220px] w-full overflow-hidden rounded-md border border-slate-800 bg-slate-950/90"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />

      <div className="absolute right-2 top-2 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setRunning((value) => !value)}
          className="flex items-center gap-1 rounded border border-slate-700 bg-slate-900/80 px-2 py-1 font-mono text-[10px] text-emerald-400 transition-colors hover:border-emerald-500/60"
        >
          {running ? <Pause size={11} /> : <Play size={11} />}
          {running ? "pause" : "play"}
        </button>
        <button
          type="button"
          onClick={handleRestart}
          className="flex items-center gap-1 rounded border border-slate-700 bg-slate-900/80 px-2 py-1 font-mono text-[10px] text-emerald-400 transition-colors hover:border-emerald-500/60"
        >
          <RotateCcw size={11} />
          restart
        </button>
      </div>
    </div>
  );
}
