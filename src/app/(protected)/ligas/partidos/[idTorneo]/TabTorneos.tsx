import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPartidos from './TabPartidos';
import TabTablaPosicion from './TabTablaPosicion';
import TabGoleadoresAsistentes from './TabGoleadoresAsistentes';



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
      {value === index && <Box sx={{ p: 5 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabTorneos({ partidosByTorneos, loading }: { partidosByTorneos: any, loading: boolean }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{
        paddingBottom: 1, display: 'flex', justifyContent: 'center',
      }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
          display: 'flex',
          flexDirection: 'column', // Cambia la dirección según el tamaño de pantalla
          gap: { xs: 1, sm: 0 }, // Añade espacio entre elementos en pantallas pequeñas
        }}>

          <Tab label="Posiciones" {...a11yProps(0)} sx={{
            color: '#fcf8f8',

            marginRight: '.5rem',
          }} />

          <Tab label="Partidos" {...a11yProps(1)} sx={{
            color: '#fcf8f8',

            marginRight: '.5rem',
          }} />
          <Tab label="Estadisticas" {...a11yProps(2)} sx={{
            color: '#fcf8f8',

            marginRight: '.5rem',
          }} />
        </Tabs>

      </Box>
      <CustomTabPanel value={value} index={0}>
        <TabTablaPosicion />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabPartidos partidosByTorneos={partidosByTorneos} loading={loading} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TabGoleadoresAsistentes />
      </CustomTabPanel>
    </div >
  );
}
