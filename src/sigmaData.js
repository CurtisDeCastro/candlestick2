import React from 'react';
import {
	client,
	useConfig,
	useElementColumns,
	useElementData,
  } from "@sigmacomputing/plugin";

export const sigmaData = () => {
  const config = useConfig();
  const sigmaData = useElementData(config.source);
  console.log(sigmaData);
  return (
    <div>sigmaData</div>
  )
}
