import React, {useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['CULTURE & ARTS', 'HEALTHY LIVING', 'STYLE', 'WORLDPOST', 'U.S. NEWS', 'QUEER VOICES', 'GOOD NEWS', 'WOMEN', 'MEDIA', 'LATINO VOICES', 'COLLEGE', 'TASTE', 'DIVORCE', 'STYLE & BEAUTY', 'POLITICS', 'MONEY', 'THE WORLDPOST', 'PARENTS', 'SCIENCE', 'RELIGION', 'WELLNESS', 'IMPACT', 'TECH', 'BUSINESS', 'CRIME', 'WEIRD NEWS', 'WORLD NEWS', 'ARTS & CULTURE', 'ENVIRONMENT', 'PARENTING', 'FOOD & DRINK', 'FIFTY', 'HOME & LIVING', 'COMEDY', 'SPORTS', 'GREEN', 'EDUCATION', 'ENTERTAINMENT', 'WEDDINGS', 'BLACK VOICES', 'ARTS', 'TRAVEL'];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}