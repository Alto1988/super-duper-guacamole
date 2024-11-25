import * as React from 'react';
import { useColorScheme } from '../../../../../../material-components-reuse/material-ui/packages/mui-material/src/styles';
import MenuItem from '../../../../../../material-components-reuse/material-ui/packages/mui-material/src/MenuItem';
import Select, { SelectProps } from '../../../../../../material-components-reuse/material-ui/packages/mui-material/src/Select';

export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) =>
        setMode(event.target.value as 'system' | 'light' | 'dark')
      }
      SelectDisplayProps={{
        // @ts-ignore
        'data-screenshot': 'toggle-mode',
      }}
      {...props}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}
