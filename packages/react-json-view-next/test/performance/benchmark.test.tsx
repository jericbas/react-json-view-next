import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { JsonViewer } from '../../src';
import { withVirtualizer } from '../../src/plugins/virtual';
import {
  createDeepNestedJson,
  createLargeArray,
  createMediumJson,
  createSmallJson
} from './benchmarkPayloads';

interface BenchmarkStat {
  scenario: string;
  iterations: number;
  domElements: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  p95: number;
}

function calculateStats(
  scenario: string,
  iterations: number,
  times: number[],
  domElements: number
): BenchmarkStat {
  const sorted = [...times].sort((a, b) => a - b);
  const mean = sorted.reduce((sum, val) => sum + val, 0) / sorted.length;
  const median = sorted[Math.floor(sorted.length / 2)]!;
  const min = sorted[0]!;
  const max = sorted[sorted.length - 1]!;
  const p95Index = Math.min(Math.floor(sorted.length * 0.95), sorted.length - 1);
  const p95 = sorted[p95Index]!;

  return {
    scenario,
    iterations,
    domElements,
    mean: Number(mean.toFixed(2)),
    median: Number(median.toFixed(2)),
    min: Number(min.toFixed(2)),
    max: Number(max.toFixed(2)),
    p95: Number(p95.toFixed(2))
  };
}

function measureScenario(
  scenario: string,
  iterations: number,
  renderFn: () => { container: HTMLElement }
): BenchmarkStat {
  const times: number[] = [];
  let domElements = 0;

  // Warmup
  const initial = renderFn();
  domElements = initial.container.querySelectorAll('*').length;
  cleanup();

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    times.push(end - start);
    cleanup();
  }

  return calculateStats(scenario, iterations, times, domElements);
}

describe('Performance Benchmark Suite (Modern React 19)', () => {
  afterEach(() => {
    cleanup();
  });

  const benchmarkResults: BenchmarkStat[] = [];

  it('measures Small JSON scenario (~10 key-values)', () => {
    const payload = createSmallJson();
    const stat = measureScenario('Small JSON (~10 key-values, mixed types)', 25, () =>
      render(<JsonViewer src={payload} name="root" />)
    );
    benchmarkResults.push(stat);
    expect(stat.mean).toBeLessThan(100);
  });

  it('measures Medium JSON scenario (50 items array)', () => {
    const payload = createMediumJson(50);
    const stat = measureScenario('Medium JSON (50 items array, ~250 nodes)', 15, () =>
      render(<JsonViewer src={payload} name="root" />)
    );
    benchmarkResults.push(stat);
    expect(stat.mean).toBeLessThan(500);
  }, 20000);

  it('measures Deep Nested JSON scenario (25 recursive levels)', () => {
    const payload = createDeepNestedJson(25);
    const stat = measureScenario('Deep Nested JSON (25 recursive levels)', 15, () =>
      render(<JsonViewer src={payload} name="root" />)
    );
    benchmarkResults.push(stat);
    expect(stat.mean).toBeLessThan(200);
  });

  it('measures Large Array scenario (500 items, default group 100)', () => {
    const payload = createLargeArray(500);
    const stat = measureScenario('Large Array (500 items, default group 100)', 10, () =>
      render(<JsonViewer src={payload} name="root" groupArraysAfterLength={100} />)
    );
    benchmarkResults.push(stat);
    expect(stat.mean).toBeLessThan(50);
  });

  it('measures Large Array scenario (500 items, fully ungrouped)', () => {
    const payload = createLargeArray(500);
    const stat = measureScenario('Large Array (500 items, fully ungrouped)', 5, () =>
      render(<JsonViewer src={payload} name="root" groupArraysAfterLength={false} />)
    );
    benchmarkResults.push(stat);
    expect(stat.mean).toBeLessThan(2500);
  }, 30000);

  it('measures Large Array scenario (500 items, collapsed root)', () => {
    const payload = createLargeArray(500);
    const stat = measureScenario('Large Array (500 items, collapsed root)', 15, () =>
      render(<JsonViewer src={payload} name="root" collapsed={true} />)
    );
    benchmarkResults.push(stat);
    expect(stat.mean).toBeLessThan(50);
  });

  it('measures Large Array scenario (500 items, Virtualized Plugin)', () => {
    const payload = createLargeArray(500);
    const stat = measureScenario('Large Array (500 items, Virtualized Plugin)', 15, () =>
      render(
        <JsonViewer
          src={payload}
          name="root"
          plugins={[withVirtualizer({ itemHeight: 24, maxHeight: 400 })]}
        />
      )
    );
    benchmarkResults.push(stat);
    console.log('\n--- MODERN BENCHMARK RESULTS ---');
    console.table(benchmarkResults);
    expect(stat.mean).toBeLessThan(50);
  });
});
