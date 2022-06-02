import React, { useReducer, useRef } from 'react'
import {
  Accordion,
  AccordionProps,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryProps,
  styled,
  css,
} from '@mui/material'
import { ArrowForwardIosSharp } from '@mui/icons-material'
type Props = {
  title: string
  description: Array<object>
}

const cssStyles = {
  accordion: css`
    border-radius: 0.375rem;
  `,
  arrow: css`
    @media (prefers-color-scheme: dark) {
      color: var(--secondary-light);
    }
    background-color: transparent;
    color: var(--secondary-dark);
    font-size: 0.9rem;
  `,
}

const MuiAccordion = styled((props: AccordionProps) => (
  <Accordion
    css={cssStyles.accordion}
    disableGutters
    elevation={0}
    square
    {...props}
  />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const MuiAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosSharp css={cssStyles.arrow} />}
    {...props}
  />
))(() => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: '0.75rem',
  },
}))

const MuiAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '0 1rem',
}))
export const StyledAccordion = ({ title, description }: Props) => {
  const [expanded, toggleExpand] = useReducer((state: boolean) => {
    return !state
  }, false)

  return (
    <>
      <MuiAccordion expanded={expanded} onChange={toggleExpand}>
        <MuiAccordionSummary>
          <div className="accordion-header">{title}</div>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <div className="accordion-details">
            {React.Children.toArray(
              description.map((element: any, idx: number) => {
                return (
                  <li
                    css={css`
                      list-style-type: none;
                      display: flex;
                      align-items: center;
                      margin-bottom: 0.25rem;
                      * {
                        margin: 0 0.75rem;
                      }
                    `}
                    key={idx}
                  >
                    <label htmlFor="valuetypes">
                      <input
                        type="checkbox"
                        value={element.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            console.log(element.value)
                          }
                        }}
                      />
                      {element.value}
                    </label>
                  </li>
                )
              }),
            )}
          </div>
        </MuiAccordionDetails>
      </MuiAccordion>
    </>
  )
}
