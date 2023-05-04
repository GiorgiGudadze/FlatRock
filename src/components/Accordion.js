import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import SubAccordion from './SubAccordion';
import AccordionHeader from './AccordionHeader';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function AccordionComponent(props) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    event.stopPropagation()
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionHeader title='Permission group 1' permission={props.permission['group1']} group='group1' setPermissions={props.setPermissions} />
        <AccordionDetails className='accordionDetailsCnt' style={{paddingRight:'0'}}>

          <SubAccordion title={'Permission group 11'} permission={props.permission['group11']} group='group11' setPermissions={props.setPermissions} />
          <SubAccordion title={'Permission group 12'} permission={props.permission['group12']} group='group12' setPermissions={props.setPermissions} />
          <SubAccordion title={'Permission group 13'} permission={props.permission['group13']} group='group13' setPermissions={props.setPermissions} />

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionHeader title='Permission group 2' permission={props.permission['group2']} group='group2' setPermissions={props.setPermissions} />
        <AccordionDetails className='accordionDetailsCnt'>
          
          <SubAccordion title={'Permission group 14'} permission={props.permission['group14']} group='group14' setPermissions={props.setPermissions} />

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
      <AccordionHeader title='Permission group 3' permission={props.permission['group3']} group='group3' setPermissions={props.setPermissions} />
        <AccordionDetails className='accordionDetailsCnt'>

          <SubAccordion title={'Permission group 15'} permission={props.permission['group15']} group='group15' setPermissions={props.setPermissions} />

        </AccordionDetails>
      </Accordion>
    </div>
  );
}