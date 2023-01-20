import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { createTheme } from '@mui/material/styles';
import ThemePallete from 'dan-api/palette/themePalette';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { blue } from '@mui/material/colors';
import data1 from './sampleData';

const useStyles = makeStyles()(() => ({
  chartFluid: {
    width: '100%',
    minWidth: 500,
    height: 450
  }
}));

const theme = createTheme(ThemePallete.yellowCyanTheme);
const color = ({
  main: theme.palette.primary.main,
  maindark: theme.palette.primary.dark,
  secondary: theme.palette.secondary.main,
  third: blue[500],
});

function CompossedLineBarArea() {
  const { classes } = useStyles();
  return (
    <div className={classes.chartFluid}>
      <ResponsiveContainer>
        <ComposedChart
          width={800}
          height={450}
          data={data1}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis dataKey="name" tickLine={false} />
          <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <CartesianAxis vertical={false} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amt" fillOpacity="0.8" fill={color.main} stroke="none" />
          <Bar dataKey="pv" barSize={60} fillOpacity="0.8" fill={color.secondary} />
          <Line type="monotone" dataKey="uv" strokeWidth={4} stroke={color.third} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CompossedLineBarArea;
