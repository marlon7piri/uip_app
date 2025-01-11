import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPartidos from './TabPartidos';
import TabTablaPosicion from './TabTablaPosicion';
import TabGoleadoresAsistentes from './TabGoleadoresAsistentes';
import styles from './styles.module.css'
import { getSession } from '@/actions/get-session';
import * as UseCases from '@/config/core/use-cases';
import { fetcherDb } from '@/config/adapters/apiDbAdapter';
import { Partidos } from '@/infraestrcuture/entities/partidos';
import { useParams } from 'next/navigation';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabTorneos({partidosByTorneos,loading}:{partidosByTorneos:any,loading:boolean}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tabla de Posiciones" {...a11yProps(0)}  sx={{
            color: '#fcf8f8',
            background: 'rgba(25, 33, 36, 0.5)',
            fontWeight: '700',
            borderRadius: '1rem',
            margiRight: '.5rem',
          }} />
          <Tab label="Partidos del Torneo" {...a11yProps(1)} sx={{
            color: '#fcf8f8',
            background: 'rgba(25, 33, 36, 0.5)',
            fontWeight: '700',
            borderRadius: '1rem',
            margiRight: '.5rem',
          }}/>
          <Tab label="Goleadores y Asistentes" {...a11yProps(2)} sx={{
            color: '#fcf8f8',
            background: 'rgba(25, 33, 36, 0.5)',
            fontWeight: '700',
            borderRadius: '1rem',
            margiRight: '.5rem',
          }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TabTablaPosicion />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabPartidos partidosByTorneos={partidosByTorneos} loading={loading}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TabGoleadoresAsistentes />
      </CustomTabPanel>
    </Box>
  );
}
