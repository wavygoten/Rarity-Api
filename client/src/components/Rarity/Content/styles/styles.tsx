import tw, { css } from 'twin.macro'

export const styles = {
  contentWrapper: css`
    ${tw`flex flex-col sm:flex-row justify-between px-2 py-16 whitespace-nowrap`}
  `,
  traitsContainer: css`
    ${tw`sticky top-2 z-10 flex flex-col shadow-lg rounded-md text-sm mx-2 sm:mr-4 sm:ml-8 mb-4 sm:mb-0 `}
    @media (prefers-color-scheme: dark) {
      background-color: var(--secondary-dark);
      color: var(--secondary-light);
    }
    background-color: var(--secondary-light);
    color: var(--secondary-dark);
    flex: 0 0 25%;
    max-height: 125px;
    min-width: 380px;
    top: 0.5rem;
  `,
  collectionIndexContainer: css`
    ${tw`flex flex-col p-5`}
  `,
  input: css`
    ${tw`p-2 duration-75 ease-linear flex-1 ml-3`}
    @media (prefers-color-scheme: dark) {
      background-color: var(--main-dark);
      color: var(--main-light);
    }
    background-color: var(--main-light);
    color: var(--main-dark);
    :focus,
    :active {
      border: var(--main-theme) 2px solid;
      outline: 0 none;
    }
    border-radius: 6px;
    border: transparent 2px solid;
  `,
  sort: css`
    ${tw`shadow-md`}@media only screen and (max-width: 480px) {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    @media (prefers-color-scheme: dark) {
      background-color: var(--secondary-dark);
      color: var(--secondary-light);
      padding: 0.33rem;
      border-radius: 6px;
    }
    background-color: var(--secondary-light);
    color: var(--secondary-dark);
    padding: 0.33rem;
    border-radius: 6px;
  `,
  cardsContainer: css`
    ${tw`flex flex-col flex-1 text-sm rounded-md mx-2 sm:ml-2 sm:mr-6`}
  `,
  paginationContainer: css`
    ${tw`flex items-center justify-between mb-2`}
  `,
  pagination: css`
    ${tw`flex justify-center items-center`} div {
      margin: 0 0.5rem;
    }
  `,
  paginationToggles: css`
    user-select: none;
    &:hover {
      cursor: pointer;
      color: var(--hover-theme);
      transition: 150ms ease;
    }
  `,
}
