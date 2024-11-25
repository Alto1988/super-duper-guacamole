import * as React from 'react';
import Box from '../../../../../../material-components-reuse/material-ui/packages/mui-material/src/Box';
import Stack from '../../../../../../material-components-reuse/material-ui/packages/mui-material/src/Stack';
import Typography from '../../../../../../material-components-reuse/material-ui/packages/mui-material/src/Typography';

import AutoFixHighRoundedIcon from '../../../../../../material-components-reuse/material-ui/packages/mui-icons-material/src/icon';
import ConstructionRoundedIcon from '../../../../../../material-components-reuse/material-ui/packages/mui-icons-material/src/icon';
import SettingsSuggestRoundedIcon from '../../../../../../material-components-reuse/material-ui/packages/mui-icons-material/src/icon';
import ThumbUpAltRoundedIcon from '../../../../../../material-components-reuse/material-ui/packages/mui-icons-material/src/icon';

import { SitemarkIcon } from './CustomIcons';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Adaptable performance',
    description:
      'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Built to last',
    description:
      'Experience unmatched durability that goes above and beyond with lasting investment.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Great user experience',
    description:
      'Integrate our product into your routine with an intuitive and easy-to-use interface.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Innovative functionality',
    description:
      'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SitemarkIcon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
