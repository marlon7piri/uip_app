import React from 'react';
import { Skeleton, Box } from '@mui/material';

const SkeletonLoading = () => {
  return (
    <Box display="flex" flexDirection="row" gap={2} padding={2} >
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="rectangular" width="100%" height={200}/>
      
    </Box>
  );
};

export default SkeletonLoading;
