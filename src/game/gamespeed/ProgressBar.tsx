import React from 'react';
import styled from 'styled-components/macro';

interface ProgressBarProps {
  lastWorldTick: number;
  worldTick: number;
  onWorldTickChange: (worldTick: number) => void;
}

export const ProgressBar = ({ lastWorldTick, worldTick, onWorldTickChange }: ProgressBarProps) => {
  const setWorldTick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.target.value, 10);
    if (!Number.isNaN(value)) {
      onWorldTickChange(value);
    }
  };

  return (
    <ProgressBarContainer>
      <ProgressBarSlider type="range" min={0} max={lastWorldTick} value={worldTick} onChange={setWorldTick} />
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: white;
`;

const ProgressBarSlider = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  margin: 0;
`;
